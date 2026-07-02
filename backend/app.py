import os
import re
import random
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Mock database
users_db = []
otps_db = {}  # email -> { 'code': str, 'expires_at': float }

def validate_password(password, name="", email=""):
    min_length = 8
    errors = []

    if not password or len(password) < min_length:
        errors.append("يجب ألا تقل كلمة المرور عن 8 خانات")
    if not re.search(r"[A-Z]", password):
        errors.append("يجب أن تحتوي على حرف كبير واحد على الأقل (Uppercase)")
    if not re.search(r"[a-z]", password):
        errors.append("يجب أن تحتوي على حرف صغير واحد على الأقل (Lowercase)")
    if not re.search(r"\d", password):
        errors.append("يجب أن تحتوي على رقم واحد على الأقل (Digit)")
    if not re.search(r"[@#\$%&\*\-\+\!\?\^\~\(\)\[\]\{\}\<\>\,\.\:\;\=\_\/\\|]", password):
        errors.append("يجب أن تحتوي على رمز خاص واحد على الأقل (مثل: @, #, $, %, &)")

    # Common simple passwords checklist
    common_passwords = [
        "123456", "12345678", "123456789", "password", "qwerty", "admin123", "student123", "daico123",
        "welcome123", "11111111", "12341234", "password123", "pass123"
    ]
    if password.lower() in common_passwords:
        errors.append("منع استخدام كلمات مرور شائعة وسهلة التخمين")

    # Sequential / repeating patterns
    if re.search(r"(\w)\1\1\1", password):
        errors.append("تجنب استخدام أحرف أو أرقام متكررة متتالية")

    # Name and email similarity
    if email:
        email_prefix = email.split("@")[0].lower()
        if len(email_prefix) >= 3 and email_prefix in password.lower():
            errors.append("منع استخدام جزء من البريد الإلكتروني في كلمة المرور")

    if name:
        name_parts = re.split(r"\s+", name.lower())
        for part in name_parts:
            if len(part) >= 3 and part in password.lower():
                errors.append("منع استخدام الاسم الشخصي أو جزء منه في كلمة المرور")
                break

    return {
        "is_valid": len(errors) == 0,
        "errors": errors
    }

def send_smtp_email(to_email, name, otp):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = os.getenv("SMTP_PORT")
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_from = os.getenv("SMTP_FROM", '"منصة دايكو" <info@daico.edu.sa>')

    # Fallback to logs if SMTP is not configured
    if not smtp_host or not smtp_user or not smtp_pass:
        print("\n--- ✉️ [MOCK EMAIL SENT] ---")
        print(f"To:      {to_email}")
        print("Subject: رمز تفعيل حسابك | منصة دايكو (DAICO)")
        print(f"Body:    رمز التحقق الخاص بك هو: {otp} (صالح لـ 5 دقائق)")
        print("----------------------------\n")
        return True

    # Compose message
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "رمز تفعيل حسابك | منصة دايكو (DAICO)"
    msg["From"] = smtp_from
    msg["To"] = to_email

    text = f"مرحباً {name or 'المستخدم'}،\n\nرمز التحقق الخاص بك لتفعيل حسابك على منصة دايكو هو: {otp}\n\nهذا الرمز صالح لـ 5 دقائق فقط.\n\nشكرًا لك."
    html = f"""
    <div style="direction: rtl; text-align: right; font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 500px; margin: auto;">
      <h2 style="color: #0e8074; margin-bottom: 20px;">تفعيل البريد الإلكتروني - منصة دايكو</h2>
      <p>مرحباً <strong>{name or 'المستخدم'}</strong>،</p>
      <p>شكرًا لتسجيلك في منصة دايكو للتعليم والابتكار. لتفعيل حسابك، يرجى إدخال الرمز التالي:</p>
      <div style="background-color: #e5f4f2; padding: 15px; border-radius: 8px; font-size: 24px; font-weight: bold; text-align: center; color: #0e8074; margin: 25px 0;">
        {otp}
      </div>
      <p style="color: #ef4444; font-size: 13px;">⚠️ هذا الرمز مؤقت وصالح لمدة <strong>5 دقائق فقط</strong>.</p>
    </div>
    """

    msg.attach(MIMEText(text, "plain", "utf-8"))
    msg.attach(MIMEText(html, "html", "utf-8"))

    # Connect and send
    is_secure = os.getenv("SMTP_SECURE", "false").lower() == "true"
    if is_secure:
        server = smtplib.SMTP_SSL(smtp_host, int(smtp_port or 465))
    else:
        server = smtplib.SMTP(smtp_host, int(smtp_port or 587))
        server.starttls()

    # Enable SMTP debug output to print connection trace
    server.set_debuglevel(1)

    server.login(smtp_user, smtp_pass)
    server.sendmail(smtp_from, to_email, msg.as_string())
    server.quit()
    return True

@app.route("/api/send-otp", methods=["POST"])
def send_otp_endpoint():
    data = request.get_json() or {}
    email = data.get("email")
    otp = data.get("otp")
    name = data.get("name", "المستخدم")

    if not email or not otp:
        return jsonify({"success": False, "message": "البريد الإلكتروني والرمز مطلوبان"}), 400

    try:
        send_smtp_email(email, name, otp)
        return jsonify({"success": True, "message": "تم إرسال رمز التحقق بنجاح."})
    except Exception as e:
        print("SMTP Error details:", str(e))
        return jsonify({"success": False, "message": f"فشل إرسال البريد الإلكتروني. تفاصيل الخطأ: {str(e)}"}), 500

@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"success": False, "message": "جميع الحقول مطلوبة"}), 400

    # Validate password
    validation = validate_password(password, name, email)
    if not validation["is_valid"]:
        return jsonify({"success": False, "message": ", ".join(validation["errors"])}), 400

    # Check existing
    email_clean = email.strip().lower()
    for u in users_db:
        if u["email"] == email_clean:
            return jsonify({"success": False, "message": "البريد الإلكتروني مسجل بالفعل"}), 400

    # Generate OTP (5 mins expiry)
    otp = str(random.randint(1000, 9999))
    expires_at = time.time() + 5 * 60  # 5 minutes

    # Insert user (In production, hash password)
    new_user = {
        "id": len(users_db) + 1,
        "name": name,
        "email": email_clean,
        "password_hash": password,  # Use bcrypt/scrypt in prod
        "verified": False
    }
    users_db.append(new_user)
    otps_db[email_clean] = {"code": otp, "expires_at": expires_at}

    # Send email
    try:
        send_smtp_email(email_clean, name, otp)
    except Exception as e:
        print("SMTP Background send failed:", str(e))

    return jsonify({
        "success": True,
        "message": "تم تسجيل الحساب بنجاح. يرجى تفعيل حسابك عبر رمز OTP المرسل لبريدك.",
        "user": {"id": new_user["id"], "name": new_user["name"], "email": new_user["email"]}
    }), 201

@app.route("/api/auth/verify-otp", methods=["POST"])
def verify_otp():
    data = request.get_json() or {}
    email = data.get("email")
    otp = data.get("otp")

    if not email or not otp:
        return jsonify({"success": False, "message": "البريد الإلكتروني ورمز OTP مطلوبان"}), 400

    email_clean = email.strip().lower()
    record = otps_db.get(email_clean)

    if not record:
        return jsonify({"success": False, "message": "لم يتم طلب رمز تفعيل لهذا البريد الإلكتروني"}), 400

    # Check expiry
    if time.time() > record["expires_at"]:
        del otps_db[email_clean]
        return jsonify({"success": False, "message": "انتهت صلاحية رمز التحقق (صلاحية الرمز 5 دقائق فقط). يرجى طلب رمز جديد."}), 400

    if record["code"] != otp:
        return jsonify({"success": False, "message": "رمز التحقق غير صحيح"}), 400

    # Verify user
    for u in users_db:
        if u["email"] == email_clean:
            u["verified"] = True
            break

    del otps_db[email_clean]

    return jsonify({
        "success": True,
        "message": "تم تفعيل الحساب بنجاح!",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockToken..."
    })

@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "جميع الحقول مطلوبة"}), 400

    email_clean = email.strip().lower()
    user = None
    for u in users_db:
        if u["email"] == email_clean:
            user = u
            break

    if not user:
        return jsonify({"success": False, "message": "البريد الإلكتروني غير مسجل لدينا"}), 404

    if user["password_hash"] != password:
        return jsonify({"success": False, "message": "كلمة المرور غير صحيحة"}), 401

    if not user["verified"]:
        return jsonify({"success": False, "message": "حسابك غير مفعل، يرجى تفعيل البريد الإلكتروني أولاً"}), 403

    return jsonify({
        "success": True,
        "message": "تم تسجيل الدخول بنجاح",
        "user": {"id": user["id"], "name": user["name"], "email": user["email"]},
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockToken..."
    })

if __name__ == "__main__":
    port = int(os.getenv("PORT", 3000))
    # Python default is port 3000 here to match the frontend fetch, but can be configured
    app.run(host="0.0.0.0", port=port, debug=True)
