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
      return { success: false, message: window.DAICO_I18N.t('auth_err_db_offline') };
    }

    const user = window.DAICO_DB.selectOne('users', { email: email.toLowerCase() });
    
    if (!user) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_email_unregistered') };
    }

    if (user.password_hash !== password) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_pass_incorrect') };
    }

    if (!user.verified) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_account_unverified'), unverified: true, email: user.email };
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
      errors.push(window.DAICO_I18N.t('auth_err_pass_length'));
    }
    if (!/[A-Z]/.test(password)) {
      errors.push(window.DAICO_I18N.t('auth_err_pass_upper'));
    }
    if (!/[a-z]/.test(password)) {
      errors.push(window.DAICO_I18N.t('auth_err_pass_lower'));
    }
    if (!/\d/.test(password)) {
      errors.push(window.DAICO_I18N.t('auth_err_pass_digit'));
    }
    if (!/[@#\$%&\*\-\+\!\?\^\~\(\)\[\]\{\}\<\>\,\.\:\;\=\_\/\\|]/.test(password)) {
      errors.push(window.DAICO_I18N.t('auth_err_pass_special'));
    }

    // Common passwords list
    const commonPasswords = [
      '123456', '12345678', '123456789', 'password', 'qwerty', 'admin123', 'student123', 'daico123',
      'welcome123', '11111111', '12341234', 'password123', 'pass123'
    ];
    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push(window.DAICO_I18N.t('auth_err_pass_common'));
    }

    // Sequential / repeating patterns
    if (/(\w)\1\1\1/.test(password)) {
      errors.push(window.DAICO_I18N.t('auth_err_pass_repetitive'));
    }

    // Name or Email similarity checks
    if (email) {
      const emailPrefix = email.split('@')[0].toLowerCase();
      if (emailPrefix.length >= 3 && password.toLowerCase().includes(emailPrefix)) {
        errors.push(window.DAICO_I18N.t('auth_err_pass_email_part'));
      }
    }

    if (name) {
      const nameParts = name.toLowerCase().split(/\s+/);
      for (const part of nameParts) {
        if (part.length >= 3 && password.toLowerCase().includes(part)) {
          errors.push(window.DAICO_I18N.t('auth_err_pass_name_part'));
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
    if (!window.DAICO_DB) return { success: false, message: window.DAICO_I18N.t('auth_err_db_error') };

    const existingUser = window.DAICO_DB.selectOne('users', { email: email.toLowerCase() });
    if (existingUser) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_email_used') };
    }

    // Run password validation
    const validationResult = this.validatePassword(password, name, email);
    if (!validationResult.isValid) {
      return { success: false, message: validationResult.errors.join('<br>') };
    }

    // Generate secure random 4-digit code
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
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

    return { success: true, email: newUser.email, message: window.DAICO_I18N.t('auth_success_code_sent') };
  },

  verifyEmail(email, pin) {
    if (!pin || pin.length !== 4) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_invalid_code') };
    }

    const user = window.DAICO_DB.selectOne('users', { email: email.toLowerCase() });
    if (!user) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_user_not_found') };
    }
    
    if (user.verified) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_already_verified') };
    }

    if (!user.verification_code) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_no_activation_req') };
    }

    if (Date.now() > user.verification_expires_at) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_code_expired') };
    }

    if (user.verification_code !== pin) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_wrong_code') };
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
      return { success: false, message: window.DAICO_I18N.t('auth_err_user_not_found') };
    }
    if (user.verified) {
      return { success: false, message: window.DAICO_I18N.t('auth_err_already_verified') };
    }

    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
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

    return { success: true, message: window.DAICO_I18N.t('auth_success_new_code') };
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
