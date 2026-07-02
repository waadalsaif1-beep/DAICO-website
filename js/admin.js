/**
 * DAICO Admin Dashboard Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Protect Route
  if (!window.DAICO_AUTH.protectRoute(['admin', 'super_admin'])) return;
  
  // 2. Initialize Core Panels
  initAdminDashboard();
});

let currentEditingEventId = null;
let currentEditingTrainerId = null;

function initAdminDashboard() {
  setupSidebarNavigation();
  setupThemeToggle();
  renderAdminHeaderInfo();
  loadPanelData('analytics'); // Default panel
  setupFormSubmissions();
  setupExportButtons();
}

// Render Admin profile metadata
function renderAdminHeaderInfo() {
  const admin = window.DAICO_AUTH.getCurrentUser();
  const avatar = document.getElementById('admin-avatar');
  const nameEl = document.getElementById('admin-name');
  const roleEl = document.getElementById('admin-role');
  const sidebarAvatar = document.getElementById('sidebar-user-avatar');
  const sidebarName = document.getElementById('sidebar-user-name');
  const sidebarRole = document.getElementById('sidebar-user-role');

  const roleNames = { super_admin: window.DAICO_I18N.t('admin_super_admin'), admin: window.DAICO_I18N.t('admin_system_admin') };
  const roleName = roleNames[admin.role] || window.DAICO_I18N.t('admin_supervisor');

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.name)}&background=random&color=fff`;

  if (avatar) avatar.src = admin.photo || defaultAvatar;
  if (sidebarAvatar) sidebarAvatar.src = admin.photo || defaultAvatar;
  if (nameEl) nameEl.innerText = admin.name;
  if (roleEl) roleEl.innerText = roleName;
  if (sidebarName) sidebarName.innerText = admin.name;
  if (sidebarRole) sidebarRole.innerText = roleName;

  // Handle Logout click
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => window.DAICO_AUTH.logout());
  }
}

// Sidebar Navigation controller
function setupSidebarNavigation() {
  const links = document.querySelectorAll('.sidebar-link[data-panel]');
  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const panel = link.getAttribute('data-panel');
      loadPanelData(panel);
    });
  });
}

// Theme switch
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

// Main Panel Director
function loadPanelData(panel) {
  // Hide all panels
  document.querySelectorAll('.admin-panel').forEach(p => p.style.display = 'none');
  
  // Show target panel
  const target = document.getElementById(`panel-${panel}`);
  if (target) target.style.display = 'flex';

  // Load specific views
  switch (panel) {
    case 'analytics':
      renderAnalyticsDashboard();
      break;
    case 'events':
      renderEventsManagementTable();
      break;
    case 'users':
      renderUsersManagementTable();
      break;
    case 'trainers':
      renderTrainersManagementTable();
      break;
    case 'registrations':
      renderRegistrationsManagementTable();
      break;
    case 'notifications':
      renderNotificationsPanel();
      break;
    case 'certificates':
      renderCertificatesTable();
      break;
    case 'homepage':
      renderHomepageEditor();
      break;
  }
}

// 1. Analytics calculations
function renderAnalyticsDashboard() {
  const db = window.DAICO_DB;
  const users = db.readTable('users');
  const trainers = db.readTable('trainers');
  const events = db.readTable('events');
  const regs = db.readTable('registrations');

  // Stats boxes
  document.getElementById('stat-total-users').innerText = users.length;
  document.getElementById('stat-total-trainers').innerText = trainers.length;
  document.getElementById('stat-total-events').innerText = events.length;
  document.getElementById('stat-total-regs').innerText = regs.length;

  // Render recent activity logs
  const activityList = document.getElementById('recent-activity-list');
  if (activityList) {
    if (regs.length === 0) {
      activityList.innerHTML = `<tr><td colspan="4" class="text-center" style="color: var(--text-muted)">${window.DAICO_I18N.t('admin_no_recent_regs')}</td></tr>`;
      return;
    }
    
    // Sort descending registrations
    const recentRegs = [...regs].reverse().slice(0, 5);
    activityList.innerHTML = recentRegs.map(r => {
      const u = db.selectOne('users', { id: r.user_id }) || { name: window.DAICO_I18N.t('admin_unknown_student') };
      const e = db.selectOne('events', { id: r.program_id }) || { title: window.DAICO_I18N.t('admin_unknown_program') };
      
      const badgeClass = r.status === 'approved' ? 'badge-success' : (r.status === 'pending' ? 'badge-warning' : 'badge-danger');
      const statusMap = { pending: window.DAICO_I18N.t('admin_status_pending'), approved: window.DAICO_I18N.t('admin_status_approved'), cancelled: window.DAICO_I18N.t('admin_status_cancelled'), completed: window.DAICO_I18N.t('admin_status_completed') };

      return `
        <tr>
          <td>${u.name}</td>
          <td>${e.title}</td>
          <td>${r.registered_at}</td>
          <td><span class="badge ${badgeClass}">${statusMap[r.status] || r.status}</span></td>
        </tr>
      `;
    }).join('');
  }
}

// 2. Events CRUD
function renderEventsManagementTable() {
  const db = window.DAICO_DB;
  const events = db.readTable('events');
  const tableBody = document.getElementById('events-table-body');
  if (!tableBody) return;

  const typesMap = { course: window.DAICO_I18N.t('admin_type_course'), bootcamp: window.DAICO_I18N.t('admin_type_bootcamp'), workshop: window.DAICO_I18N.t('admin_type_workshop'), hackathon: window.DAICO_I18N.t('admin_type_hackathon') };

  tableBody.innerHTML = events.map(e => {
    const trainer = db.selectOne('trainers', { id: e.trainer_id }) || { name: window.DAICO_I18N.t('admin_trainer_unspecified') };
    const priceText = e.price > 0 ? `${e.price} SAR` : window.DAICO_I18N.t('admin_price_free');
    const statusClass = e.status === 'published' ? 'badge-success' : 'badge-warning';
    const statusText = e.status === 'published' ? window.DAICO_I18N.t('admin_status_published') : window.DAICO_I18N.t('admin_status_draft');

    return `
      <tr>
        <td>#${e.id}</td>
        <td><strong>${e.title}</strong></td>
        <td>${typesMap[e.type] || e.type}</td>
        <td>${trainer.name}</td>
        <td>${priceText}</td>
        <td>${e.seats_remaining} / ${e.seats_total}</td>
        <td><span class="badge ${statusClass}">${statusText}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="editEvent(${e.id})">${window.DAICO_I18N.t('admin_btn_edit')}</button>
          <button class="btn btn-danger btn-sm" onclick="deleteEvent(${e.id})">${window.DAICO_I18N.t('admin_btn_delete')}</button>
        </td>
      </tr>
    `;
  }).join('');
}

// 3. User Accounts Dashboard Table
function renderUsersManagementTable() {
  const db = window.DAICO_DB;
  const users = db.readTable('users');
  const tableBody = document.getElementById('users-table-body');
  if (!tableBody) return;

  const rolesMap = { 1: window.DAICO_I18N.t('admin_super_admin'), 2: window.DAICO_I18N.t('admin_system_admin'), 3: window.DAICO_I18N.t('admin_role_student') };

  tableBody.innerHTML = users.map(u => {
    const verifiedBadge = u.verified ? 'badge-success' : 'badge-warning';
    const verifiedText = u.verified ? window.DAICO_I18N.t('admin_user_verified') : window.DAICO_I18N.t('admin_user_unverified');
    
    return `
      <tr>
        <td>#${u.id}</td>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td>${rolesMap[u.role_id] || window.DAICO_I18N.t('admin_role_user')}</td>
        <td><span class="badge ${verifiedBadge}">${verifiedText}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="promoteUser(${u.id})">${window.DAICO_I18N.t('admin_btn_promote')}</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${u.id})">${window.DAICO_I18N.t('admin_btn_delete')}</button>
        </td>
      </tr>
    `;
  }).join('');
}

// 4. Trainers List Management
function renderTrainersManagementTable() {
  const db = window.DAICO_DB;
  const trainers = db.readTable('trainers');
  const tableBody = document.getElementById('trainers-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = trainers.map(t => {
    return `
      <tr>
        <td>#${t.id}</td>
        <td>
          <div class="flex align-center gap-sm">
            <img src="${t.photo}" class="trainer-avatar" style="width: 32px; height: 32px">
            <strong>${t.name}</strong>
          </div>
        </td>
        <td>${t.title}</td>
        <td>${t.experience_years} ${window.DAICO_I18N.t('admin_years')}</td>
        <td>⭐ ${t.rating}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="editTrainer(${t.id})">${window.DAICO_I18N.t('admin_btn_edit')}</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTrainer(${t.id})">${window.DAICO_I18N.t('admin_btn_delete')}</button>
        </td>
      </tr>
    `;
  }).join('');
}

// 5. Registrations Manager (Approve / Reject)
function renderRegistrationsManagementTable() {
  const db = window.DAICO_DB;
  const regs = db.readTable('registrations');
  const tableBody = document.getElementById('regs-table-body');
  if (!tableBody) return;

  const statusMap = { pending: window.DAICO_I18N.t('admin_status_pending'), approved: window.DAICO_I18N.t('admin_status_approved'), cancelled: window.DAICO_I18N.t('admin_status_cancelled'), completed: window.DAICO_I18N.t('admin_status_completed') };

  tableBody.innerHTML = regs.map(r => {
    const u = db.selectOne('users', { id: r.user_id }) || { name: window.DAICO_I18N.t('admin_unknown_student') };
    const e = db.selectOne('events', { id: r.program_id }) || { title: window.DAICO_I18N.t('admin_program_deleted') };
    
    const badgeClass = r.status === 'approved' ? 'badge-success' : (r.status === 'pending' ? 'badge-warning' : (r.status === 'completed' ? 'badge-info' : 'badge-danger'));

    let actionButtons = '';
    if (r.status === 'pending') {
      actionButtons = `
        <button class="btn btn-primary btn-sm" onclick="updateRegStatus(${r.id}, 'approved')">${window.DAICO_I18N.t('admin_btn_approve')}</button>
        <button class="btn btn-danger btn-sm" onclick="updateRegStatus(${r.id}, 'cancelled')">${window.DAICO_I18N.t('admin_btn_reject')}</button>
      `;
    } else if (r.status === 'approved') {
      actionButtons = `
        <button class="btn btn-secondary btn-sm" style="background-color: var(--success-bg); color: var(--success)" onclick="updateRegStatus(${r.id}, 'completed')">${window.DAICO_I18N.t('admin_btn_complete_cert')}</button>
      `;
    } else {
      actionButtons = `<span style="color: var(--text-muted); font-size: 0.85rem">${window.DAICO_I18N.t('admin_no_actions')}</span>`;
    }

    return `
      <tr>
        <td>#${r.id}</td>
        <td>${u.name}</td>
        <td>${e.title}</td>
        <td>${r.registered_at}</td>
        <td><span class="badge ${badgeClass}">${statusMap[r.status] || r.status}</span></td>
        <td>
          <div class="flex gap-sm">
            ${actionButtons}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// 6. Notifications Sender Panel
function renderNotificationsPanel() {
  // Populate users selection inside dropdown
  const db = window.DAICO_DB;
  const users = db.readTable('users').filter(u => u.role_id === 3);
  const select = document.getElementById('notif-target-user');
  if (!select) return;

  select.innerHTML = `<option value="all">${window.DAICO_I18N.t('admin_all_students')}</option>` + 
    users.map(u => `<option value="${u.id}">${u.name} (${u.email})</option>`).join('');
}

// 7. Certificates Table
function renderCertificatesTable() {
  const db = window.DAICO_DB;
  const certs = db.readTable('certificates');
  const tableBody = document.getElementById('certs-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = certs.map(c => {
    const u = db.selectOne('users', { id: c.user_id }) || { name: window.DAICO_I18N.t('admin_student_deleted') };
    const e = db.selectOne('events', { id: c.event_id }) || { title: window.DAICO_I18N.t('admin_program_deleted') };

    return `
      <tr>
        <td>#${c.id}</td>
        <td>${c.certificate_code}</td>
        <td>${u.name}</td>
        <td>${e.title}</td>
        <td>${c.issued_at}</td>
        <td><span class="badge badge-success">${window.DAICO_I18N.t('admin_cert_active')}</span></td>
      </tr>
    `;
  }).join('');
}

// 8. Homepage Editor Panels
function renderHomepageEditor() {
  const db = window.DAICO_DB;
  const homeData = db.selectOne('homepage', { section_name: 'homepage_data' });
  if (!homeData) return;

  const data = homeData.content_data;
  document.getElementById('home-hero-title').value = data.hero.title;
  document.getElementById('home-hero-desc').value = data.hero.desc;
  document.getElementById('home-stat-students').value = data.stats.students;
  document.getElementById('home-stat-courses').value = data.stats.courses;
}

// Form Handlers
function setupFormSubmissions() {
  // Add Event Form
  const eventForm = document.getElementById('event-form');
  if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const db = window.DAICO_DB;

      const title = document.getElementById('event-title').value;
      const type = document.getElementById('event-type').value;
      const category_id = parseInt(document.getElementById('event-category').value);
      const trainer_id = parseInt(document.getElementById('event-trainer').value);
      const start_date = document.getElementById('event-start-date').value;
      const end_date = document.getElementById('event-end-date').value;
      const price = parseFloat(document.getElementById('event-price').value || 0);
      const seats = parseInt(document.getElementById('event-seats').value || 20);
      const location_type = document.getElementById('event-location').value;
      const desc = document.getElementById('event-desc').value;

      const eventData = {
        title, type, category_id, trainer_id, start_date, end_date, price, 
        seats_total: seats, seats_remaining: seats, location_type, location_name: location_type === 'online' ? window.DAICO_I18N.t('admin_loc_online') : window.DAICO_I18N.t('admin_loc_onsite'),
        description: desc, cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
        status: 'published', objectives: [window.DAICO_I18N.t('admin_prog_skill_1')], requirements: [window.DAICO_I18N.t('admin_prog_req_1')], skills: [window.DAICO_I18N.t('admin_prog_skill_2')], schedule: [{ week: window.DAICO_I18N.t('admin_prog_week_1'), topic: window.DAICO_I18N.t('admin_prog_topic_1') }]
      };

      if (currentEditingEventId) {
        db.update('events', currentEditingEventId, eventData);
        alert(window.DAICO_I18N.t('admin_alert_prog_updated'));
      } else {
        db.insert('events', eventData);
        alert(window.DAICO_I18N.t('admin_alert_prog_added'));
      }

      currentEditingEventId = null;
      eventForm.reset();
      document.getElementById('event-form-title').innerText = window.DAICO_I18N.t('admin_form_new_prog');
      loadPanelData('events');
    });
  }

  // Send Custom Notification
  const notifForm = document.getElementById('notif-form');
  if (notifForm) {
    notifForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const db = window.DAICO_DB;
      const target = document.getElementById('notif-target-user').value;
      const title = document.getElementById('notif-title').value;
      const message = document.getElementById('notif-message').value;

      if (!title || !message) return;

      const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

      if (target === 'all') {
        const users = db.readTable('users').filter(u => u.role_id === 3);
        users.forEach(u => {
          db.insert('notifications', { user_id: u.id, title, message, is_read: false, created_at: dateStr });
        });
      } else {
        db.insert('notifications', { user_id: parseInt(target), title, message, is_read: false, created_at: dateStr });
      }

      alert(window.DAICO_I18N.t('admin_alert_notif_sent'));
      notifForm.reset();
    });
  }

  // Update Homepage content Form
  const homepageForm = document.getElementById('homepage-content-form');
  if (homepageForm) {
    homepageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const db = window.DAICO_DB;
      const heroTitle = document.getElementById('home-hero-title').value;
      const heroDesc = document.getElementById('home-hero-desc').value;
      const statStudents = document.getElementById('home-stat-students').value;
      const statCourses = document.getElementById('home-stat-courses').value;

      const updated = {
        section_name: 'homepage_data',
        content_data: {
          hero: { badge: window.DAICO_I18N.t('admin_hero_badge'), title: heroTitle, desc: heroDesc },
          stats: { students: statStudents, courses: statCourses, trainers: '25+', employment_rate: '94%' }
        }
      };

      db.writeTable('homepage', [updated]);
      alert(window.DAICO_I18N.t('admin_alert_home_updated'));
    });
  }

  // Add/Edit Trainer Form
  const trainerForm = document.getElementById('trainer-form');
  if (trainerForm) {
    trainerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const db = window.DAICO_DB;

      const name = document.getElementById('trainer-name-input').value;
      const title = document.getElementById('trainer-title-input').value;
      const experience_years = parseInt(document.getElementById('trainer-exp-input').value);
      const rating = parseFloat(document.getElementById('trainer-rating-input').value || 5.0);
      const bio = document.getElementById('trainer-bio-input').value;

      const trainerData = {
        name,
        title,
        experience_years,
        rating,
        bio,
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
        specializations: [window.DAICO_I18N.t('admin_spec_general')],
        certificates: [],
        social_links: { linkedin: '#', twitter: '#' }
      };

      if (currentEditingTrainerId) {
        // preserve photo and specs if exists
        const oldTrainer = db.selectOne('trainers', { id: currentEditingTrainerId });
        if (oldTrainer) {
          trainerData.photo = oldTrainer.photo;
          trainerData.specializations = oldTrainer.specializations;
          trainerData.certificates = oldTrainer.certificates;
          trainerData.social_links = oldTrainer.social_links;
        }
        db.update('trainers', currentEditingTrainerId, trainerData);
        alert(window.DAICO_I18N.t('admin_alert_trainer_updated'));
      } else {
        db.insert('trainers', trainerData);
        alert(window.DAICO_I18N.t('admin_alert_trainer_added'));
      }

      currentEditingTrainerId = null;
      trainerForm.reset();
      document.getElementById('trainer-form-title').innerText = window.DAICO_I18N.t('admin_form_new_trainer');
      loadPanelData('trainers');
    });
  }
}

// Expose CRUD actions globally so onclick handles work
window.updateRegStatus = function(regId, newStatus) {
  const db = window.DAICO_DB;
  db.update('registrations', regId, { status: newStatus });
  
  const reg = db.selectOne('registrations', { id: regId });

  // If approved/completed, trigger relevant notifications/certificates
  const dateStr = new Date().toISOString().split('T')[0];
  const timeStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

  if (newStatus === 'approved') {
    db.insert('notifications', {
      user_id: reg.user_id,
      title: window.DAICO_I18N.t('admin_notif_accept_title'),
      message: window.DAICO_I18N.t('admin_notif_accept_msg'),
      is_read: false,
      created_at: timeStr
    });
  } else if (newStatus === 'completed') {
    // Generate certificate
    const code = `CERT-DAICO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    db.insert('certificates', {
      user_id: reg.user_id,
      registration_id: reg.id,
      event_id: reg.program_id,
      certificate_code: code,
      issued_at: dateStr,
      qr_hash: `verify_daico_${code}`
    });

    db.insert('notifications', {
      user_id: reg.user_id,
      title: window.DAICO_I18N.t('admin_notif_cert_title'),
      message: window.DAICO_I18N.t('admin_notif_cert_msg'),
      is_read: false,
      created_at: timeStr
    });
  } else if (newStatus === 'cancelled') {
    db.insert('notifications', {
      user_id: reg.user_id,
      title: window.DAICO_I18N.t('admin_notif_cancel_title'),
      message: window.DAICO_I18N.t('admin_notif_cancel_msg'),
      is_read: false,
      created_at: timeStr
    });
  }

  loadPanelData('registrations');
};

window.promoteUser = function(userId) {
  const db = window.DAICO_DB;
  db.update('users', userId, { role_id: 2 });
  alert(window.DAICO_I18N.t('admin_alert_promoted'));
  loadPanelData('users');
};

window.deleteUser = function(id) {
  const db = window.DAICO_DB;
  if (confirm(window.DAICO_I18N.t('admin_confirm_delete'))) {
    db.delete('users', id);
    alert(window.DAICO_I18N.t('admin_alert_deleted'));
    loadPanelData('users');
  }
};

window.deleteEvent = function(id) {
  const db = window.DAICO_DB;
  if (confirm(window.DAICO_I18N.t('admin_confirm_delete'))) {
    db.delete('events', id);
    alert(window.DAICO_I18N.t('admin_alert_deleted'));
    loadPanelData('events');
  }
};

window.editEvent = function(eventId) {
  const db = window.DAICO_DB;
  const e = db.selectOne('events', { id: eventId });
  if (!e) return;

  currentEditingEventId = eventId;
  document.getElementById('event-form-title').innerText = window.DAICO_I18N.t('admin_edit_program_title') + eventId;

  document.getElementById('event-title').value = e.title;
  document.getElementById('event-type').value = e.type;
  document.getElementById('event-category').value = e.category_id;
  document.getElementById('event-trainer').value = e.trainer_id;
  document.getElementById('event-start-date').value = e.start_date;
  document.getElementById('event-end-date').value = e.end_date;
  document.getElementById('event-price').value = e.price;
  document.getElementById('event-seats').value = e.seats_total;
  document.getElementById('event-location').value = e.location_type;
  document.getElementById('event-desc').value = e.description;

  // Scroll to form
  document.getElementById('event-form').scrollIntoView({ behavior: 'smooth' });
};

// Report Exporter
function setupExportButtons() {
  const pdfBtn = document.getElementById('export-pdf');
  const xlsBtn = document.getElementById('export-excel');
  
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      const db = window.DAICO_DB;
      const stats = db.selectOne('homepage', { section_name: 'homepage_data' })?.content_data?.stats || {};
      const csv = window.DAICO_I18N.t('admin_csv_stats_header') + (stats.students||0) + window.DAICO_I18N.t('admin_csv_stats_courses') + (stats.courses||0) + window.DAICO_I18N.t('admin_csv_stats_trainers') + (stats.trainers||0);
      triggerCSVDownload('DAICO_Statistics_Report.csv', csv);
    });
  }
  if (xlsBtn) {
    xlsBtn.addEventListener('click', () => {
      const db = window.DAICO_DB;
      const regs = db.readTable('registrations');
      let csv = window.DAICO_I18N.t('admin_csv_reg_header');
      csv += regs.map(r => `${r.id},${r.registered_at},${r.status},${r.user_id},${r.program_id}`).join('\n');
      triggerCSVDownload('DAICO_Registrations_Data.csv', csv);
    });
  }
}

function triggerCSVDownload(filename, csvContent) {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

window.editTrainer = function(trainerId) {
  const db = window.DAICO_DB;
  const t = db.selectOne('trainers', { id: trainerId });
  if (!t) return;

  currentEditingTrainerId = trainerId;
  document.getElementById('trainer-form-title').innerText = window.DAICO_I18N.t('admin_edit_trainer_title') + trainerId;

  document.getElementById('trainer-name-input').value = t.name;
  document.getElementById('trainer-title-input').value = t.title;
  document.getElementById('trainer-exp-input').value = t.experience_years;
  document.getElementById('trainer-rating-input').value = t.rating;
  document.getElementById('trainer-bio-input').value = t.bio;

  // Scroll to form
  document.getElementById('trainer-form').scrollIntoView({ behavior: 'smooth' });
};

window.deleteTrainer = function(id) {
  const db = window.DAICO_DB;
  if (confirm(window.DAICO_I18N.t('admin_confirm_delete'))) {
    db.delete('trainers', id);
    alert(window.DAICO_I18N.t('admin_alert_deleted'));
    loadPanelData('trainers');
  }
};
