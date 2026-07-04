/**
 * DAICO Authentication Manager
 */

const SESSION_KEY = 'daico_session';

const AUTH = {
  getCurrentUser() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  login(email, password) {
    if (!window.DAICO_DB) {
      console.error('Database not initialized');
      return { success: false, message: 'قاعدة البيانات غير متصلة' };
    }

    const user = window.DAICO_DB.selectOne('users', { email: email.toLowerCase() });
    
    if (!user) {
      return { success: false, message: 'البريد الإلكتروني غير مسجل لدينا' };
    }

    if (user.password_hash !== password) {
      return { success: false, message: 'كلمة المرور غير صحيحة' };
    }

    if (!user.verified) {
      return { success: false, message: 'حسابك غير مفعل، يرجى تفعيل البريد الإلكتروني أولاً', unverified: true, email: user.email };
    }

    // Determine Role text
    const role = window.DAICO_DB.selectOne('roles', { id: user.role_id });
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: role ? role.name : 'user'
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  },

  validatePassword(password, name, email) {
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

    // Common passwords list
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

    // Name or Email similarity checks
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
      errors: errors
    };
  },

  register(name, email, password, roleId = 3) {
    if (!window.DAICO_DB) return { success: false, message: 'خطأ في قاعدة البيانات' };

    const existingUser = window.DAICO_DB.selectOne('users', { email: email.toLowerCase() });
    if (existingUser) {
      return { success: false, message: 'البريد الإلكتروني مستخدم بالفعل' };
    }

    // Run password validation
    const validationResult = this.validatePassword(password, name, email);
    if (!validationResult.isValid) {
      return { success: false, message: validationResult.errors.join('<br>') };
    }

    // Generate secure random 4-digit code using CSPRNG
    const cryptoArray = new Uint32Array(1);
    window.crypto.getRandomValues(cryptoArray);
    const verificationCode = (1000 + (cryptoArray[0] % 9000)).toString();
    const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes

    const newUser = window.DAICO_DB.insert('users', {
      name: name,
      email: email.toLowerCase(),
      password_hash: password,
      role_id: roleId,
      verified: false,
      verification_code: verificationCode,
      verification_expires_at: expirationTime,
      created_at: new Date().toISOString().split('T')[0]
    });

    // Send email via configured backend service
    fetch('http://localhost:3000/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.toLowerCase(), name: name, otp: verificationCode })
    }).catch(err => {
      console.warn('Backend service offline. OTP verification code is: ', verificationCode);
    });

    return { success: true, email: newUser.email, message: 'تم إرسال رمز التفعيل إلى بريدك الإلكتروني.' };
  },

  verifyEmail(email, pin) {
    if (!pin || pin.length !== 4) {
      return { success: false, message: 'يرجى إدخال رمز تفعيل صحيح مكون من 4 أرقام' };
    }

    const user = window.DAICO_DB.selectOne('users', { email: email.toLowerCase() });
    if (!user) {
      return { success: false, message: 'المستخدم غير موجود' };
    }
    
    if (user.verified) {
      return { success: false, message: 'هذا الحساب مفعل مسبقاً' };
    }

    if (!user.verification_code) {
      return { success: false, message: 'لم يتم العثور على طلب تفعيل. يرجى طلب رمز جديد.' };
    }

    if (Date.now() > user.verification_expires_at) {
      return { success: false, message: 'انتهت صلاحية رمز التفعيل (صلاحية الرمز 5 دقائق فقط). يرجى طلب رمز جديد.' };
    }

    if (user.verification_code !== pin) {
      return { success: false, message: 'رمز التفعيل غير صحيح' };
    }

    window.DAICO_DB.update('users', user.id, { 
      verified: true,
      verification_code: null,
      verification_expires_at: null
    });
    
    // Automatically log user in
    const role = window.DAICO_DB.selectOne('roles', { id: user.role_id });
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: role ? role.name : 'user'
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  },

  resendVerificationCode(email) {
    const user = window.DAICO_DB.selectOne('users', { email: email.toLowerCase() });
    if (!user) {
      return { success: false, message: 'المستخدم غير موجود' };
    }
    if (user.verified) {
      return { success: false, message: 'هذا الحساب مفعل مسبقاً' };
    }

    // Generate secure random 4-digit code using CSPRNG
    const cryptoArray = new Uint32Array(1);
    window.crypto.getRandomValues(cryptoArray);
    const newCode = (1000 + (cryptoArray[0] % 9000)).toString();
    const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes

    window.DAICO_DB.update('users', user.id, {
      verification_code: newCode,
      verification_expires_at: expirationTime
    });

    // Send email via configured backend service
    fetch('http://localhost:3000/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.toLowerCase(), name: user.name, otp: newCode })
    }).catch(err => {
      console.warn('Backend service offline. OTP verification code is: ', newCode);
    });

    return { success: true, message: 'تم إرسال رمز تفعيل جديد إلى بريدك الإلكتروني.' };
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
    const currentPath = window.location.pathname;
    if (currentPath.includes('/admin/') || currentPath.includes('/user/') || currentPath.includes('/trainer/')) {
      window.location.href = '../auth/login.html';
    } else {
      window.location.href = 'auth/login.html';
    }
  },

  // Auth Middleware
  protectRoute(requiredRoles = []) {
    const user = this.getCurrentUser();
    
    if (!user) {
      // Find relative path depth to redirect to auth/login
      const currentPath = window.location.pathname;
      if (currentPath.includes('/admin/') || currentPath.includes('/user/')) {
        window.location.href = '../auth/login.html';
      } else {
        window.location.href = 'auth/login.html';
      }
      return false;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      // Role unauthorized
      if (user.role === 'admin' || user.role === 'super_admin') {
        window.location.href = '../admin/index.html';
      } else {
        window.location.href = '../user/index.html';
      }
      return false;
    }

    return true;
  },

  redirectIfLoggedIn() {
    const user = this.getCurrentUser();
    if (user) {
      if (user.role === 'admin' || user.role === 'super_admin') {
        window.location.href = '../admin/index.html';
      } else {
        window.location.href = '../user/index.html';
      }
    }
  }
};

window.DAICO_AUTH = AUTH;
