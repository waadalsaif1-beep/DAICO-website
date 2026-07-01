/**
 * DAICO Homepage Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  loadFeaturedPrograms('all');
  initFilterTabs();
  initStats();
  initTestimonials();
  initFAQs();
  initContactForm();
});

// Theme Management (Light / Dark Mode)
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

// Mobile Menu Handler
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
      menu.style.display = 'flex';
      menu.style.flexDirection = 'column';
      menu.style.position = 'absolute';
      menu.style.top = '60px';
      menu.style.right = '0';
      menu.style.left = '0';
      menu.style.backgroundColor = 'var(--bg-secondary)';
      menu.style.padding = 'var(--space-lg)';
      menu.style.borderBottom = '1px solid var(--border-color)';
    } else {
      menu.style.display = '';
    }
  });
}

// Featured Programs Card Renderer
function loadFeaturedPrograms(typeFilter = 'all') {
  const container = document.getElementById('programs-container');
  if (!container) return;

  if (!window.DAICO_DB) return;
  let events = window.DAICO_DB.select('events', { status: 'published' });

  if (typeFilter !== 'all') {
    events = events.filter(e => e.type === typeFilter);
  }

  // Limit to max 6 featured programs on home
  events = events.slice(0, 6);

  if (events.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: var(--space-xl)">لا توجد برامج تدريبية منشورة حالياً.</div>`;
    return;
  }

  container.innerHTML = events.map(event => {
    const trainer = window.DAICO_DB.selectOne('trainers', { id: event.trainer_id }) || { name: 'دايكو للتدريب', title: 'خبير تدريب' };
    const category = window.DAICO_DB.selectOne('categories', { id: event.category_id }) || { name_ar: 'عام' };
    
    // Type Translate
    const typesMap = { course: 'دورة', bootcamp: 'معسكر', workshop: 'ورشة عمل', hackathon: 'هاكاثون' };
    const typeLabel = typesMap[event.type] || event.type;
    
    const priceLabel = event.price > 0 ? `${event.price} ريال` : 'مجانًا';
    const priceClass = event.price > 0 ? 'badge-warning' : 'badge-success';

    return `
      <div class="card program-card">
        <img class="program-image" src="${event.cover_image}" alt="${event.title}">
        <span class="program-badge-tag">${typeLabel}</span>
        
        <div class="program-card-body">
          <div class="program-meta">
            <span>${category.name_ar}</span>
            <span class="badge ${priceClass}">${priceLabel}</span>
          </div>
          
          <h3 style="font-size: 1.15rem; margin: var(--space-sm) 0">${event.title}</h3>
          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: var(--space-md)">
            ${event.description.substring(0, 95)}...
          </p>

          <div class="program-meta" style="margin-bottom: var(--space-md)">
            <span>📅 ${event.start_date}</span>
            <span>📍 ${event.location_type === 'online' ? 'عن بعد' : 'حضوري'}</span>
          </div>
          
          <div class="program-trainer">
            <img class="trainer-avatar" src="${trainer.photo}" alt="${trainer.name}">
            <div class="trainer-details">
              <span class="trainer-name">${trainer.name}</span>
              <span class="trainer-title">${trainer.title}</span>
            </div>
          </div>
          
          <a href="auth/login.html" class="btn btn-primary btn-sm" style="margin-top: var(--space-md)">تفاصيل البرنامج وتسجيل</a>
        </div>
      </div>
    `;
  }).join('');
}

// Filter Tabs Click Events
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.getAttribute('data-type');
      loadFeaturedPrograms(type);
    });
  });
}

// Populate stats numbers
function initStats() {
  const stats = window.DAICO_DB.selectOne('homepage', { section_name: 'homepage_data' });
  if (!stats) return;

  const data = stats.content_data.stats;
  const nodes = {
    'stat-students': data.students,
    'stat-courses': data.courses,
    'stat-trainers': data.trainers,
    'stat-employment': data.employment_rate
  };

  for (let id in nodes) {
    const el = document.getElementById(id);
    if (el) el.innerText = nodes[id];
  }
}

// Testimonials Slider Logic
function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  if (slides.length === 0) return;

  let currentIdx = 0;
  
  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
  }

  // Next slide timer
  setInterval(() => {
    currentIdx = (currentIdx + 1) % slides.length;
    showSlide(currentIdx);
  }, 6000);
}

// FAQ Accordion click
function initFAQs() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Contact Form handler
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertContainer = document.getElementById('contact-alert-container');
  if (!form || !alertContainer) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const msg = document.getElementById('contact-message').value;

    if (!name || !email || !msg) {
      showAlert(alertContainer, 'danger', 'يرجى تعبئة كافة الحقول المطلوبة.');
      return;
    }

    // Success response
    showAlert(alertContainer, 'success', 'نشكرك على تواصلك معنا! تم إرسال رسالتك وسيتصل بك أحد ممثلي دايكو قريباً.');
    form.reset();
  });
}

function showAlert(container, type, message) {
  container.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Clear alert after 6s
  setTimeout(() => {
    container.innerHTML = '';
  }, 6000);
}
