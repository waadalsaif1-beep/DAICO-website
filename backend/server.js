const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so the static frontend prototype can communicate with the backend
app.use(cors());
app.use(express.json());

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Content-Security-Policy', "default-src 'self'; frame-ancestors 'none';");
  next();
});

// In-Memory Storage for mock production database (Users & OTPs)
const usersDb = [];
const otpsDb = new Map(); // email -> { code, expiresAt, attempts, lastSentAt }
const sendOtpCooldown = new Map(); // email -> lastSentTimestamp (for /api/send-otp rate limit)

/**
 * Secure Password Hashing & Verification using built-in scrypt
 */
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  try {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) return false;
    const testHash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(testHash, 'hex'));
  } catch (err) {
    return false;
  }
}

/**
 * Robust Password Strength Validation Policy
 */
function validatePassword(password, name = '', email = '') {
  const minLength = 8;
  const errors = [];

  if (!password || password.length < minLength) {
    errors.push('يجب ألا تقل كلمة المرور عن 8 خانات');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('يجب أن تحتوي على حرف كبير واحد على الأقل (Uppercase)');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('يجب أن تحتوي على حرف صغير واحد على الأقل (Lowercase)');
  }
  if (!/\d/.test(password)) {
    errors.push('يجب أن تحتوي على رقم واحد على الأقل (Digit)');
  }
  if (!/[@#\$%&\*\-\+\!\?\^\~\(\)\[\]\{\}\<\>\,\.\:\;\=\_\/\\|]/.test(password)) {
    errors.push('يجب أن تحتوي على رمز خاص واحد على الأقل (مثل: @, #, $, %, &)');
  }

  // Common simple passwords checklist
  const commonPasswords = [
    '123456', '12345678', '123456789', 'password', 'qwerty', 'admin123', 'student123', 'daico123',
    'welcome123', '11111111', '12341234', 'password123', 'pass123'
  ];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('منع استخدام كلمات مرور شائعة وسهلة التخمين');
  }

  // Sequential / repeating patterns
  if (/(\w)\1\1\1/.test(password)) {
    errors.push('تجنب استخدام أحرف أو أرقام متكررة متتالية');
  }

  // Similarity with email and name
  if (email) {
    const emailPrefix = email.split('@')[0].toLowerCase();
    if (emailPrefix.length >= 3 && password.toLowerCase().includes(emailPrefix)) {
      errors.push('منع استخدام جزء من البريد الإلكتروني في كلمة المرور');
    }
  }

  if (name) {
    const nameParts = name.toLowerCase().split(/\s+/);
    for (const part of nameParts) {
      if (part.length >= 3 && password.toLowerCase().includes(part)) {
        errors.push('منع استخدام الاسم الشخصي أو جزء منه في كلمة المرور');
        break;
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Configure Nodemailer SMTP Transporter
 * Integrates easily with SMTP, SendGrid, Mailgun, AWS SES, Gmail, etc.
 */
function getEmailTransporter() {
  // If credentials aren't defined, logs warning and falls back to mock console output
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️ Environment SMTP variables not fully configured. Falling back to Log Transporter.');
    return {
      verify: async () => {
        console.log('ℹ️ Mock verify: configuration variables check completed successfully.');
        return true;
      },
      sendMail: async (mailOptions) => {
        console.log('\n--- ✉️ [MOCK EMAIL SENT] ---');
        console.log(`To:      ${mailOptions.to}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log(`Body:\n${mailOptions.text}`);
        console.log('----------------------------\n');
        return { messageId: 'mock-id-12345' };
      }
    };
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    debug: true,      // Show SMTP communication logs
    logger: true      // Print log messages in console
  });
}

/**
 * Express API Endpoint: Send OTP (Used by frontend hybrid mode)
 */
app.post('/api/send-otp', async (req, res) => {
  const { email, name, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'البريد الإلكتروني والرمز مطلوبان' });
  }

  // Rate Limiting: 60 seconds cooldown per email
  const emailClean = email.toLowerCase().trim();
  const now = Date.now();
  if (sendOtpCooldown.has(emailClean)) {
    const lastSent = sendOtpCooldown.get(emailClean);
    const diff = (now - lastSent) / 1000;
    if (diff < 60) {
      return res.status(429).json({
        success: false,
        message: `يرجى الانتظار ${Math.ceil(60 - diff)} ثانية قبل طلب رمز تحقق جديد.`
      });
    }
  }
  sendOtpCooldown.set(emailClean, now);

  try {
    const transporter = getEmailTransporter();
    
    // Validate connection configuration asynchronously
    console.log('Verifying SMTP configuration connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully!');
    
    const mailOptions = {
      from: process.env.SMTP_FROM || '"منصة دايكو" <info@daico.edu.sa>',
      to: email,
      subject: 'رمز تفعيل حسابك | منصة دايكو (DAICO)',
      text: `مرحباً ${name || 'المستخدم'}،\n\nرمز التحقق الخاص بك لتفعيل حسابك على منصة دايكو هو: ${otp}\n\nهذا الرمز صالح لمدة 5 دقائق فقط. يرجى عدم مشاركة هذا الرمز مع أي شخص.\n\nشكرًا لك،\nفريق عمل منصة دايكو.`,
      html: `
        <div style="direction: rtl; text-align: right; font-family: 'Cairo', sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 500px; margin: auto;">
          <h2 style="color: #0e8074; margin-bottom: 20px;">تفعيل البريد الإلكتروني - منصة دايكو</h2>
          <p>مرحباً <strong>${name || 'المستخدم'}</strong>،</p>
          <p>شكرًا لتسجيلك في منصة دايكو للتعليم والابتكار. لتفعيل حسابك، يرجى إدخال الرمز التالي:</p>
          <div style="background-color: #e5f4f2; padding: 15px; border-radius: 8px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 4px; color: #0e8074; margin: 25px 0;">
            ${otp}
          </div>
          <p style="color: #ef4444; font-size: 13px;">⚠️ هذا الرمز مؤقت وصالح لمدة <strong>5 دقائق فقط</strong>.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="font-size: 12px; color: #718096; line-height: 1.5;">إذا لم تقم بطلب هذا الرمز، يرجى تجاهل هذا البريد الإلكتروني.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`OTP Email successfully sent to ${email}. Message ID: ${info.messageId}`);
    return res.status(200).json({ success: true, message: 'تم إرسال رمز التحقق بنجاح.' });

  } catch (error) {
    console.error('Error sending OTP Email:', error);
    return res.status(500).json({ 
      success: false, 
      message: `فشل في إرسال البريد الإلكتروني. تفاصيل الخطأ: ${error.message || error}`
    });
  }
});

/**
 * Express API Endpoint: User Registration (Production Backend Demonstration)
 */
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'جميع الحقول مطلوبة' });
  }

  // Validate password strength
  const passValidation = validatePassword(password, name, email);
  if (!passValidation.isValid) {
    return res.status(400).json({ success: false, message: passValidation.errors.join(', ') });
  }

  const emailClean = email.toLowerCase().trim();

  // Check if user already exists
  const existingUser = usersDb.find(u => u.email === emailClean);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'البريد الإلكتروني مسجل بالفعل' });
  }

  // Rate Limiting: 60 seconds cooldown per email for register OTP resend
  const now = Date.now();
  const existingOtp = otpsDb.get(emailClean);
  if (existingOtp && existingOtp.lastSentAt && (now - existingOtp.lastSentAt) < 60000) {
    const diff = (now - existingOtp.lastSentAt) / 1000;
    return res.status(429).json({
      success: false,
      message: `يرجى الانتظار ${Math.ceil(60 - diff)} ثانية قبل طلب رمز تحقق جديد.`
    });
  }

  // Generate secure 4-digit OTP code & 5-minute expiry
  const otp = crypto.randomInt(1000, 10000).toString();
  const expiresAt = now + 5 * 60 * 1000; // 5 minutes

  // Save new user in mock DB (securely hashed password using scrypt)
  const newUser = {
    id: usersDb.length + 1,
    name,
    email: emailClean,
    passwordHash: hashPassword(password),
    verified: false,
    createdAt: new Date().toISOString()
  };
  usersDb.push(newUser);

  // Store OTP with attempts tracker and lastSentAt
  otpsDb.set(emailClean, { code: otp, expiresAt, attempts: 0, lastSentAt: now });

  // Send real email via SMTP service
  try {
    const transporter = getEmailTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"منصة دايكو" <info@daico.edu.sa>',
      to: email.toLowerCase(),
      subject: 'رمز تفعيل حسابك | منصة دايكو',
      text: `رمز التحقق الخاص بك لتفعيل حسابك هو: ${otp} (صالح لمدة 5 دقائق)`
    });
  } catch (error) {
    console.error('SMTP sending failed during registration: ', error.message);
  }

  return res.status(201).json({
    success: true,
    message: 'تم تسجيل الحساب بنجاح. يرجى تفعيل حسابك عبر رمز OTP المرسل لبريدك.',
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
});

/**
 * Express API Endpoint: OTP Verification (Production Backend Demonstration)
 */
app.post('/api/auth/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'البريد الإلكتروني ورمز OTP مطلوبان' });
  }

  const emailClean = email.toLowerCase().trim();
  const record = otpsDb.get(emailClean);
  if (!record) {
    return res.status(400).json({ success: false, message: 'لم يتم طلب رمز تفعيل لهذا البريد الإلكتروني' });
  }

  // Track attempts to prevent brute force
  if (!record.attempts) record.attempts = 0;
  record.attempts++;

  // Check expiry (5 minutes limit)
  if (Date.now() > record.expiresAt) {
    otpsDb.delete(emailClean);
    return res.status(400).json({ success: false, message: 'انتهت صلاحية رمز التحقق (صلاحية الرمز 5 دقائق فقط). يرجى طلب رمز جديد.' });
  }

  // Validate OTP code
  if (record.code !== otp) {
    if (record.attempts >= 5) {
      otpsDb.delete(emailClean);
      return res.status(400).json({ success: false, message: 'تم تجاوز الحد الأقصى للمحاولات الخاطئة (5 محاولات). تم إبطال الرمز، يرجى طلب رمز جديد.' });
    }
    otpsDb.set(emailClean, record); // update attempts count
    return res.status(400).json({ success: false, message: `رمز التحقق غير صحيح. المحاولات المتبقية: ${5 - record.attempts}` });
  }

  // Update user verified status
  const user = usersDb.find(u => u.email === emailClean);
  if (user) {
    user.verified = true;
  }

  // Clear OTP code from storage
  otpsDb.delete(emailClean);

  return res.status(200).json({
    success: true,
    message: 'تم تفعيل الحساب بنجاح!',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockToken...' // In production, generate JWT token
  });
});

/**
 * Express API Endpoint: Login (Production Backend Demonstration)
 */
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'جميع الحقول مطلوبة' });
  }

  const user = usersDb.find(u => u.email === email.toLowerCase());
  if (!user) {
    return res.status(404).json({ success: false, message: 'البريد الإلكتروني غير مسجل لدينا' });
  }

  // Validate password using secure comparison
  if (!verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ success: false, message: 'كلمة المرور غير صحيحة' });
  }

  if (!user.verified) {
    return res.status(403).json({ success: false, message: 'حسابك غير مفعل، يرجى تفعيل البريد الإلكتروني أولاً' });
  }

  return res.status(200).json({
    success: true,
    message: 'تم تسجيل الدخول بنجاح',
    user: { id: user.id, name: user.name, email: user.email },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockToken...'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 DAICO Backend Server is running on http://localhost:${PORT}`);
});
