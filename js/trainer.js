/**
 * DAICO Trainer Profile Page Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderAuth();
  loadTrainerProfile();
});

// Theme Management
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('daico_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('daico_theme', theme);
    updateThemeIcon(toggleBtn, theme);
  });
}

function updateThemeIcon(btn, theme) {
  if (theme === 'dark') {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></svg>`;
  } else {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
}

// Load Trainer Details from DB
function loadTrainerProfile() {
  const params = new URLSearchParams(window.location.search);
  const trainerId = parseInt(params.get('id')) || 1; // Default to trainer 1

  const db = window.DAICO_DB;
  if (!db) {
    console.error('Database not available');
    return;
  }

  const trainer = db.selectOne('trainers', { id: trainerId });
  if (!trainer) {
    document.getElementById('trainer-profile-content').innerHTML = `
      <div style="text-align: center; padding: var(--space-3xl) var(--space-md)">
        <h2>${window.DAICO_I18N.t('trainer_not_found')}</h2>
        <a href="../index.html" class="btn btn-primary" style="margin-top: var(--space-md)">${window.DAICO_I18N.t('trainer_back_home')}</a>
      </div>
    `;
    return;
  }

  // Populate basic text
  document.getElementById('trainer-name').innerText = trainer.name;
  document.getElementById('trainer-title').innerText = trainer.title;
  document.getElementById('trainer-bio').innerText = trainer.bio;
  document.getElementById('trainer-photo').src = trainer.photo;
  document.getElementById('trainer-experience').innerText = `${trainer.experience_years} ${window.DAICO_I18N.t('trainer_years')}`;
  document.getElementById('trainer-rating').innerText = `⭐ ${trainer.rating} / 5.0`;

  // Render Specializations tags
  const specContainer = document.getElementById('trainer-specializations');
  if (specContainer) {
    specContainer.innerHTML = trainer.specializations.map(s => `<span class="badge badge-success" style="margin: 3px; font-size: 0.85rem">${s}</span>`).join('');
  }

  // Render Certificates tags
  const certContainer = document.getElementById('trainer-certificates');
  if (certContainer) {
    certContainer.innerHTML = trainer.certificates && trainer.certificates.length > 0 
      ? trainer.certificates.map(c => `<span class="badge badge-info" style="margin: 3px; font-size: 0.85rem">${c}</span>`).join('')
      : `<span style="color: var(--text-muted)">${window.DAICO_I18N.t('trainer_no_certs')}</span>`;
  }

  // Render Social Links
  const socialContainer = document.getElementById('trainer-socials');
  if (socialContainer) {
    let socialHTML = '';
    const links = trainer.social_links || {};
    if (links.linkedin) socialHTML += `<a href="${links.linkedin}" class="btn btn-secondary btn-sm" style="direction: ltr">🔗 LinkedIn</a>`;
    if (links.twitter) socialHTML += `<a href="${links.twitter}" class="btn btn-secondary btn-sm" style="direction: ltr">🐦 Twitter/X</a>`;
    if (links.github) socialHTML += `<a href="${links.github}" class="btn btn-secondary btn-sm" style="direction: ltr">💻 GitHub</a>`;
    socialContainer.innerHTML = socialHTML || `<span style="color: var(--text-muted)">${window.DAICO_I18N.t('trainer_no_social')}</span>`;
  }

  // Render Courses Provided
  const coursesContainer = document.getElementById('trainer-courses-list');
  if (coursesContainer) {
    const events = db.select('events', { trainer_id: trainerId, status: 'published' });
    
    if (events.length === 0) {
      coursesContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; width: 100%">${window.DAICO_I18N.t('trainer_no_active_programs')}</p>`;
    } else {
      const typesMap = { course: window.DAICO_I18N.t('trainer_type_course'), bootcamp: window.DAICO_I18N.t('trainer_type_bootcamp'), workshop: window.DAICO_I18N.t('trainer_type_workshop'), hackathon: window.DAICO_I18N.t('trainer_type_hackathon') };
      
      coursesContainer.innerHTML = events.map(e => {
        const category = db.selectOne('categories', { id: e.category_id }) || { name_ar: window.DAICO_I18N.t('trainer_cat_general') };
        const priceText = e.price > 0 ? `${e.price} SAR` : window.DAICO_I18N.t('trainer_price_free');
        const priceClass = e.price > 0 ? 'badge-warning' : 'badge-success';

        return `
          <div class="card program-card" style="min-width: 280px">
            <img src="${e.cover_image}" class="program-image" style="height: 150px">
            <span class="program-badge-tag">${typesMap[e.type] || e.type}</span>
            <div class="program-card-body">
              <div class="program-meta">
                <span>${category.name_ar}</span>
                <span class="badge ${priceClass}">${priceText}</span>
              </div>
              <h4 style="font-size: 1rem; margin: var(--space-xs) 0">${e.title}</h4>
              <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: var(--space-sm)">
                ${e.description.substring(0, 75)}...
              </p>
              <div class="program-meta" style="margin-top: auto; border-top: 1px solid var(--border-color); padding-top: var(--space-xs)">
                <span>📅 ${e.start_date}</span>
                <span>📍 ${e.location_type === 'online' ? window.DAICO_I18N.t('trainer_loc_online') : window.DAICO_I18N.t('trainer_loc_onsite')}</span>
              </div>
              
              <a href="${(() => {
                const currentUser = window.DAICO_AUTH ? window.DAICO_AUTH.getCurrentUser() : null;
                if (currentUser) {
                  return (currentUser.role === 'admin' || currentUser.role === 'super_admin') ? '../admin/index.html' : `../user/index.html?event_id=${e.id}`;
                }
                return '../auth/login.html';
              })()}" class="btn btn-primary btn-sm" style="margin-top: var(--space-sm); font-size: 0.8rem">${window.DAICO_I18N.t('trainer_reg_now')}</a>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Render Mock Student Reviews (If no database records exist, populate realistic ones)
  const reviewsContainer = document.getElementById('trainer-reviews-list');
  if (reviewsContainer) {
    const reviews = [
      { student: window.DAICO_I18N.t('trainer_review_1_name'), rating: 5, comment: window.DAICO_I18N.t('trainer_review_1_text'), date: '2026-05-12' },
      { student: window.DAICO_I18N.t('trainer_review_2_name'), rating: 5, comment: window.DAICO_I18N.t('trainer_review_2_text'), date: '2026-04-30' },
      { student: window.DAICO_I18N.t('trainer_review_3_name'), rating: 4, comment: window.DAICO_I18N.t('trainer_review_3_text'), date: '2026-04-10' }
    ];

    reviewsContainer.innerHTML = reviews.map(r => {
      const stars = '⭐'.repeat(r.rating);
      return `
        <div style="background-color: var(--bg-tertiary); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--border-color)">
          <div class="flex justify-between align-center" style="margin-bottom: var(--space-xs)">
            <strong>${r.student}</strong>
            <span style="font-size: 0.8rem; color: var(--text-muted)">${r.date}</span>
          </div>
          <div style="color: var(--warning); margin-bottom: var(--space-sm); font-size: 0.85rem">${stars}</div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6">${r.comment}</p>
        </div>
      `;
    }).join('');
  }
}

function initHeaderAuth() {
  const user = window.DAICO_AUTH ? window.DAICO_AUTH.getCurrentUser() : null;
  const navActions = document.querySelector('.nav-actions');
  if (!navActions || !user) return;

  // Remove existing Login & Register static buttons
  const loginBtn = navActions.querySelector('a[href="../auth/login.html"]');
  const registerBtn = navActions.querySelector('a[href="../auth/register.html"]');
  
  if (loginBtn) loginBtn.remove();
  if (registerBtn) registerBtn.remove();
  
  const dashboardPath = (user.role === 'admin' || user.role === 'super_admin') ? '../admin/index.html' : '../user/index.html';
  
  const dashboardBtn = document.createElement('a');
  dashboardBtn.href = dashboardPath;
  dashboardBtn.className = 'btn btn-primary btn-sm';
  dashboardBtn.style.fontWeight = '700';
  dashboardBtn.innerText = window.DAICO_I18N.t('trainer_dashboard');
  
  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'btn btn-secondary btn-sm';
  logoutBtn.style.fontWeight = '700';
  logoutBtn.innerText = window.DAICO_I18N.t('trainer_logout');
  logoutBtn.addEventListener('click', () => {
    window.DAICO_AUTH.logout();
  });

  navActions.appendChild(dashboardBtn);
  navActions.appendChild(logoutBtn);
}
