/**
 * DAICO User Dashboard Controller
 */

let selectedEventForDetails = null;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Protect Route
  if (!window.DAICO_AUTH.protectRoute(['user'])) return;

  // 2. Initialize Dashboard
  initUserDashboard();
  checkUrlCertificateVerification();
});

function initUserDashboard() {
  renderUserHeaderInfo();
  setupThemeToggle();
  setupNavigationTabs();
  loadNotifications();
  loadBrowseEvents();
  loadMyRegistrations();
  setupSearchAndFilters();
  setupDetailModalActions();
}

// Check if page opened with verification URL (e.g. ?verify=CERT-DAICO-2026-778)
function checkUrlCertificateVerification() {
  const params = new URLSearchParams(window.location.search);
  const verifyCode = params.get('verify');
  
  if (verifyCode) {
    const db = window.DAICO_DB;
    const cert = db.selectOne('certificates', { certificate_code: verifyCode });
    
    if (cert) {
      const user = db.selectOne('users', { id: cert.user_id }) || { name: 'طالب غير محدد' };
      const event = db.selectOne('events', { id: cert.event_id }) || { title: 'برنامج غير محدد' };
      
      // Render popup validation
      showVerificationPopup(verifyCode, user.name, event.title, cert.issued_at);
    } else {
      alert('رمز التحقق من الشهادة المدخل غير صحيح أو ملغي.');
    }
  }
}

function showVerificationPopup(code, studentName, programTitle, date) {
  // Create quick modal dynamically
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.style.zIndex = '9999';
  
  overlay.innerHTML = `
    <div class="modal-content" style="text-align: center; display: flex; flex-direction: column; gap: var(--space-md)">
      <div style="color: var(--success); font-size: 3rem">✔</div>
      <h3 style="font-size: 1.5rem; color: var(--success)">تم التحقق من الشهادة بنجاح</h3>
      <p style="font-size: 0.95rem; border-top: 1px solid var(--border-color); padding-top: var(--space-md)">
        تؤكد منصة <strong>دايكو للتعليم والابتكار</strong> أن هذه الشهادة رسمية وصادرة ومعتمدة.
      </p>
      <div style="text-align: right; background-color: var(--bg-tertiary); padding: var(--space-md); border-radius: var(--radius-md); font-size: 0.9rem">
        <p><strong>اسم الطالب:</strong> ${studentName}</p>
        <p><strong>اسم البرنامج:</strong> ${programTitle}</p>
        <p><strong>رقم الشهادة:</strong> ${code}</p>
        <p><strong>تاريخ الإصدار:</strong> ${date}</p>
      </div>
      <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">إغلاق النافذة</button>
    </div>
  `;
  document.body.appendChild(overlay);
}

// User header metadata
function renderUserHeaderInfo() {
  const user = window.DAICO_AUTH.getCurrentUser();
  const avatar = document.getElementById('user-avatar');
  const nameEl = document.getElementById('user-name');
  const emailEl = document.getElementById('user-email');
  const sidebarName = document.getElementById('sidebar-user-name');
  const sidebarRole = document.getElementById('sidebar-user-role');

  if (avatar) avatar.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60';
  if (nameEl) nameEl.innerText = user.name;
  if (emailEl) emailEl.innerText = user.email;
  if (sidebarName) sidebarName.innerText = user.name;
  if (sidebarRole) sidebarRole.innerText = 'طالب / مستخدم';

  // Logout Click
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => window.DAICO_AUTH.logout());
  }
}

// Light/Dark Theme selector
function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  const currentTheme = localStorage.getItem('daico_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('daico_theme', theme);
  });
}

// Switch between panels (Browse events vs My Registrations)
function setupNavigationTabs() {
  const links = document.querySelectorAll('.sidebar-link[data-panel]');
  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const panel = link.getAttribute('data-panel');

      document.querySelectorAll('.user-panel').forEach(p => p.style.display = 'none');
      const target = document.getElementById(`panel-${panel}`);
      if (target) target.style.display = 'flex';
    });
  });

  // Inner events view tabs (Courses, Bootcamps, etc.)
  const sectionBtns = document.querySelectorAll('.user-nav-btn');
  sectionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sectionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadBrowseEvents();
    });
  });
}

// Notifications toggle popover
function loadNotifications() {
  const db = window.DAICO_DB;
  const user = window.DAICO_AUTH.getCurrentUser();
  const notifs = db.select('notifications', { user_id: user.id });
  const bell = document.getElementById('notif-bell-btn');
  const dropdown = document.getElementById('notif-dropdown');
  const count = document.getElementById('notif-count');
  const list = document.getElementById('notif-list');

  const unreadCount = notifs.filter(n => !n.is_read).length;
  
  if (count) {
    if (unreadCount > 0) {
      count.style.display = 'flex';
      count.innerText = unreadCount;
    } else {
      count.style.display = 'none';
    }
  }

  if (bell && dropdown) {
    bell.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
      
      // Mark all read on open
      if (dropdown.classList.contains('active') && unreadCount > 0) {
        notifs.forEach(n => {
          if (!n.is_read) db.update('notifications', n.id, { is_read: true });
        });
        setTimeout(loadNotifications, 1000);
      }
    });

    document.addEventListener('click', () => dropdown.classList.remove('active'));
    dropdown.addEventListener('click', (e) => e.stopPropagation());
  }

  if (list) {
    if (notifs.length === 0) {
      list.innerHTML = `<div style="padding: var(--space-md); text-align: center; color: var(--text-muted)">لا توجد إشعارات حالية</div>`;
      return;
    }

    list.innerHTML = [...notifs].reverse().map(n => {
      const itemClass = n.is_read ? '' : 'unread';
      return `
        <div class="notification-dropdown-item ${itemClass}">
          <span class="notification-item-title">${n.title}</span>
          <span class="notification-item-text">${n.message}</span>
          <span class="notification-item-date">${n.created_at}</span>
        </div>
      `;
    }).join('');
  }
}

// Load dynamic program catalog cards
function loadBrowseEvents() {
  const db = window.DAICO_DB;
  const container = document.getElementById('user-events-container');
  if (!container) return;

  const activeTab = document.querySelector('.user-nav-btn.active');
  const eventType = activeTab ? activeTab.getAttribute('data-type') : 'course';

  // Apply filters
  const searchVal = document.getElementById('search-input')?.value.toLowerCase() || '';
  const categoryFilter = document.getElementById('filter-category')?.value || '';
  const locationFilter = document.getElementById('filter-location')?.value || '';
  const priceFilter = document.getElementById('filter-price')?.value || '';

  let events = db.select('events', { type: eventType, status: 'published' });

  // Filter logic
  events = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchVal) || e.description.toLowerCase().includes(searchVal);
    const matchesCategory = categoryFilter === '' || e.category_id === parseInt(categoryFilter);
    const matchesLocation = locationFilter === '' || e.location_type === locationFilter;
    let matchesPrice = true;
    if (priceFilter === 'free') matchesPrice = e.price === 0;
    if (priceFilter === 'paid') matchesPrice = e.price > 0;

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  if (events.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: var(--space-2xl)">لا توجد برامج تطابق خيارات البحث الفردية.</div>`;
    return;
  }

  container.innerHTML = events.map(e => {
    const trainer = db.selectOne('trainers', { id: e.trainer_id }) || { name: 'مدرب دايكو' };
    const priceText = e.price > 0 ? `${e.price} ريال` : 'مجانًا';
    const priceClass = e.price > 0 ? 'badge-warning' : 'badge-success';

    return `
      <div class="card program-card">
        <img src="${e.cover_image}" class="program-image">
        <div class="program-card-body">
          <div class="program-meta">
            <span class="badge ${priceClass}">${priceText}</span>
            <span>📍 ${e.location_type === 'online' ? 'عن بعد' : 'حضوري'}</span>
          </div>
          <h3 style="font-size: 1.15rem; margin: var(--space-sm) 0">${e.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: var(--space-md)">
            ${e.description.substring(0, 85)}...
          </p>
          <div class="program-meta" style="margin-top: auto; border-top: 1px solid var(--border-color); padding-top: var(--space-sm)">
            <span>👤 ${trainer.name}</span>
            <button class="btn btn-primary btn-sm" onclick="viewEventDetails(${e.id})">التفاصيل والتسجيل</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Bind search and filter events
function setupSearchAndFilters() {
  const searchInput = document.getElementById('search-input');
  const cat = document.getElementById('filter-category');
  const loc = document.getElementById('filter-location');
  const prc = document.getElementById('filter-price');

  // Load Categories Select dropdown elements
  const db = window.DAICO_DB;
  if (cat) {
    const categories = db.readTable('categories');
    cat.innerHTML = `<option value="">كل التصنيفات</option>` + 
      categories.map(c => `<option value="${c.id}">${c.name_ar}</option>`).join('');
  }

  [searchInput, cat, loc, prc].forEach(el => {
    if (el) el.addEventListener('input', loadBrowseEvents);
  });
}

// View dynamic Event Details modal
window.viewEventDetails = function(eventId) {
  const db = window.DAICO_DB;
  const user = window.DAICO_AUTH.getCurrentUser();
  const e = db.selectOne('events', { id: eventId });
  if (!e) return;

  selectedEventForDetails = e;
  const trainer = db.selectOne('trainers', { id: e.trainer_id }) || { name: 'غير محدد' };

  // Check user registration state
  const registration = db.selectOne('registrations', { user_id: user.id, program_id: eventId });
  
  let regBtnHTML = '';
  if (registration) {
    const regStatusNames = { pending: 'قيد الانتظار', approved: 'مسجل نشط', cancelled: 'ملغي', completed: 'مكتمل' };
    const badgeMap = { pending: 'badge-warning', approved: 'badge-success', completed: 'badge-info', cancelled: 'badge-danger' };
    regBtnHTML = `<div style="text-align: center"><span class="badge ${badgeMap[registration.status]}" style="font-size: 1rem; padding: var(--space-sm) var(--space-md)">حالة التسجيل: ${regStatusNames[registration.status]}</span></div>`;
  } else if (e.seats_remaining <= 0) {
    regBtnHTML = `<button class="btn btn-secondary w-full" disabled>عذراً، المقاعد ممتلئة</button>`;
  } else {
    regBtnHTML = `<button class="btn btn-primary w-full" onclick="registerForEvent(${e.id})">سجل الآن (المقاعد محدودة)</button>`;
  }

  // Populate Modal Fields
  document.getElementById('modal-event-title').innerText = e.title;
  document.getElementById('modal-event-desc').innerText = e.description;
  document.getElementById('modal-cover').src = e.cover_image;
  
  document.getElementById('modal-duration').innerText = e.duration;
  document.getElementById('modal-location').innerText = e.location_type === 'online' ? 'أونلاين (عن بعد)' : e.location_name;
  document.getElementById('modal-seats').innerText = `${e.seats_remaining} مقعد متبقي (من ${e.seats_total})`;
  document.getElementById('modal-price').innerText = e.price > 0 ? `${e.price} ريال سعودي` : 'برنامج مجاني';

  // Trainer Section
  document.getElementById('modal-trainer-photo').src = trainer.photo;
  document.getElementById('modal-trainer-name').innerText = trainer.name;
  document.getElementById('modal-trainer-title').innerText = trainer.title;
  document.getElementById('modal-trainer-bio').innerText = trainer.bio;
  document.getElementById('modal-trainer-exp').innerText = `${trainer.experience_years} سنوات خبرة`;

  // Dynamic Lists (Objectives, Requirements, FAQs, Schedule)
  document.getElementById('modal-objectives').innerHTML = e.objectives.map(o => `<li>${o}</li>`).join('');
  document.getElementById('modal-requirements').innerHTML = e.requirements.map(r => `<li>${r}</li>`).join('');
  document.getElementById('modal-skills').innerHTML = e.skills.map(s => `<span class="badge badge-info" style="margin: 2px">${s}</span>`).join('');
  
  document.getElementById('modal-schedule').innerHTML = e.schedule.map(s => `
    <div style="padding: var(--space-xs) 0; border-bottom: 1px dashed var(--border-color)">
      <strong>${s.week}:</strong> ${s.topic}
    </div>
  `).join('');

  document.getElementById('modal-faqs').innerHTML = e.faqs ? e.faqs.map(f => `
    <div style="margin-bottom: var(--space-sm)">
      <strong style="color: var(--primary)">س: ${f.question}</strong>
      <p style="font-size: 0.85rem; margin-top: 2px">ج: ${f.answer}</p>
    </div>
  `).join('') : '<p>لا تتوفر أسئلة شائعة لهذا البرنامج حالياً.</p>';

  document.getElementById('modal-registration-action').innerHTML = regBtnHTML;

  // Open Modal overlay
  document.getElementById('detail-modal').classList.add('active');
};

function setupDetailModalActions() {
  const closeBtn = document.getElementById('close-modal-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.getElementById('detail-modal').classList.remove('active');
    });
  }
}

// Enroll student database handler
window.registerForEvent = function(eventId) {
  const db = window.DAICO_DB;
  const user = window.DAICO_AUTH.getCurrentUser();
  const e = db.selectOne('events', { id: eventId });

  if (e.seats_remaining <= 0) {
    alert('عذراً، لا تتوفر مقاعد شاغرة للبرنامج.');
    return;
  }

  // Insert registration
  const dateStr = new Date().toISOString().split('T')[0];
  const timeStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

  db.insert('registrations', {
    user_id: user.id,
    program_type: e.type,
    program_id: e.id,
    status: 'approved', // Auto approved in mock
    registered_at: dateStr
  });

  // Decrease seats
  db.update('events', eventId, { seats_remaining: e.seats_remaining - 1 });

  // Add Notification
  db.insert('notifications', {
    user_id: user.id,
    title: 'نجاح التسجيل بالبرنامج 🚀',
    message: `تهانينا! تم تسجيلك بنجاح في "${e.title}". يمكنك البدء باستعراض تفاصيل الدورة والجدول التدريبي.`,
    is_read: false,
    created_at: timeStr
  });

  alert('تم التسجيل بنجاح في البرنامج التدريبي!');
  document.getElementById('detail-modal').classList.remove('active');
  
  // Reload
  initUserDashboard();
};

// Render user registrations log table
function loadMyRegistrations() {
  const db = window.DAICO_DB;
  const user = window.DAICO_AUTH.getCurrentUser();
  const regs = db.select('registrations', { user_id: user.id });
  const tableBody = document.getElementById('my-regs-table-body');
  if (!tableBody) return;

  const statusMap = { pending: 'قيد المراجعة', approved: 'نشط / مقبول', completed: 'مكتمل', cancelled: 'ملغي' };

  if (regs.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center" style="color: var(--text-muted); padding: var(--space-lg)">لا توجد لديك تسجيلات نشطة حالياً.</td></tr>`;
    return;
  }

  tableBody.innerHTML = regs.map(r => {
    const e = db.selectOne('events', { id: r.program_id }) || { title: 'برنامج غير متوفر' };
    const cert = db.selectOne('certificates', { registration_id: r.id });
    
    const badgeMap = { pending: 'badge-warning', approved: 'badge-success', completed: 'badge-info', cancelled: 'badge-danger' };
    
    let certAction = '';
    if (r.status === 'completed' && cert) {
      certAction = `<button class="btn btn-secondary btn-sm" onclick="showCertificateCanvas(${cert.id})">عرض الشهادة والـ QR</button>`;
    } else {
      certAction = `<span style="color: var(--text-muted); font-size: 0.85rem">البرنامج غير مكتمل بعد</span>`;
    }

    return `
      <tr>
        <td>#${r.id}</td>
        <td><strong>${e.title}</strong></td>
        <td>${r.registered_at}</td>
        <td><span class="badge ${badgeMap[r.status]}">${statusMap[r.status] || r.status}</span></td>
        <td>${certAction}</td>
      </tr>
    `;
  }).join('');
}

// Generate digital canvas certificate
window.showCertificateCanvas = function(certId) {
  const db = window.DAICO_DB;
  const cert = db.selectOne('certificates', { id: certId });
  const student = db.selectOne('users', { id: cert.user_id });
  const course = db.selectOne('events', { id: cert.event_id });

  const canvas = document.getElementById('cert-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Set dimensions
  canvas.width = 800;
  canvas.height = 560;

  // 1. Draw border / background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border lines
  ctx.strokeStyle = '#1e3a8a'; // Deep primary blue
  ctx.lineWidth = 15;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  ctx.strokeStyle = '#f59e0b'; // Gold border line
  ctx.lineWidth = 3;
  ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70);

  // 2. Draw certificate texts (RTL rendering helper)
  ctx.textBaseline = 'middle';
  
  // DAICO Logo Header
  ctx.fillStyle = '#1e3a8a';
  ctx.font = 'bold 36px Tajawal';
  ctx.textAlign = 'center';
  ctx.fillText('منصة دايكو للتعليم والابتكار', 400, 80);

  ctx.fillStyle = '#86868b';
  ctx.font = '16px Tajawal';
  ctx.fillText('DAICO PLATFORM FOR EDUCATION & INNOVATION', 400, 115);

  // Core title
  ctx.fillStyle = '#d97706'; // Gold
  ctx.font = 'bold 42px Tajawal';
  ctx.fillText('شهادة إتمام برنامج تدريبي', 400, 180);

  ctx.fillStyle = '#1d1d1f';
  ctx.font = '20px Tajawal';
  ctx.fillText('تشهد المنصة بأن الطالب / الطالبة:', 400, 240);

  // Student Name
  ctx.fillStyle = '#1e3a8a';
  ctx.font = 'bold 32px Tajawal';
  ctx.fillText(student.name, 400, 290);

  // Course Details text
  ctx.fillStyle = '#1d1d1f';
  ctx.font = '18px Tajawal';
  ctx.fillText(`قد أتم بنجاح متطلبات المعسكر / الدورة التدريبية المتقدمة بعنوان:`, 400, 340);
  
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 24px Tajawal';
  ctx.fillText(`"${course.title}"`, 400, 385);

  ctx.fillStyle = '#6b7280';
  ctx.font = '16px Tajawal';
  ctx.fillText(`بتاريخ إصدار: ${cert.issued_at} م | رقم الشهادة المعتمد: ${cert.certificate_code}`, 400, 435);

  // 3. Draw signature & dynamic QR Code
  // Left side signature
  ctx.textAlign = 'right';
  ctx.fillStyle = '#1d1d1f';
  ctx.font = 'bold 16px Tajawal';
  ctx.fillText('توقيع عميد الأكاديمية:', 680, 480);
  ctx.font = 'italic 18px Tajawal';
  ctx.fillText('خالد الحربي', 660, 510);

  // Right side QR Code drawing block
  ctx.textAlign = 'left';
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(80, 440, 90, 90); // Solid square representing barcode
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px Courier';
  ctx.fillText('[QR CODE]', 95, 480);
  ctx.fillText('VERIFIED', 98, 495);

  // Certificate Verification Link description
  ctx.fillStyle = '#6b7280';
  ctx.font = '12px Tajawal';
  ctx.fillText('امسح الرمز للتحقق الفوري', 70, 540);

  // Show Certificate Modal Overlay
  document.getElementById('cert-modal').classList.add('active');

  // Bind download certificate button
  const dwnBtn = document.getElementById('download-cert-btn');
  if (dwnBtn) {
    // Re-bind to prevent cumulative listeners
    const newBtn = dwnBtn.cloneNode(true);
    dwnBtn.parentNode.replaceChild(newBtn, dwnBtn);
    
    newBtn.addEventListener('click', () => {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `DAICO_Cert_${cert.certificate_code}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  // Bind close cert modal button
  const closeCert = document.getElementById('close-cert-btn');
  if (closeCert) {
    closeCert.addEventListener('click', () => {
      document.getElementById('cert-modal').classList.remove('active');
    });
  }
};
