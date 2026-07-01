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

  register(name, email, password) {
    if (!window.DAICO_DB) return { success: false, message: 'خطأ في قاعدة البيانات' };

    const existingUser = window.DAICO_DB.selectOne('users', { email: email.toLowerCase() });
    if (existingUser) {
      return { success: false, message: 'البريد الإلكتروني مستخدم بالفعل' };
    }

    // Insert user as default User Role (id = 3)
    // We mark verified as false by default to test verification pin screens
    const newUser = window.DAICO_DB.insert('users', {
      name: name,
      email: email.toLowerCase(),
      password_hash: password,
      role_id: 3,
      verified: false,
      created_at: new Date().toISOString().split('T')[0]
    });

    return { success: true, email: newUser.email, message: 'تم التسجيل بنجاح، يرجى تفعيل بريدك الإلكتروني.' };
  },

  verifyEmail(email, pin) {
    // Standard PIN code simulator: any 4-digit code works, but we can mock 1234
    if (pin.length !== 4) {
      return { success: false, message: 'يرجى إدخال رمز تفعيل صحيح مكون من 4 أرقام' };
    }

    const user = window.DAICO_DB.selectOne('users', { email: email.toLowerCase() });
    if (!user) {
      return { success: false, message: 'المستخدم غير موجود' };
    }

    window.DAICO_DB.update('users', user.id, { verified: true });
    
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

  logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = '/auth/login.html';
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
