/**
 * DAICO Internationalization (i18n) Controller
 * Manages translation dictionaries, page direction flipping, and toggle UI.
 */

// Immediate execution block to set lang attributes on documentElement (minimizes layout flashing)
(function () {
  const savedLang = localStorage.getItem('daico_lang') || 'ar';
  document.documentElement.setAttribute('dir', savedLang === 'en' ? 'ltr' : 'rtl');
  document.documentElement.setAttribute('lang', savedLang);
})();

const I18N_TRANSLATIONS = {
  ar: {
    // Header & Navbar
    brand_title: "دايكو",
    brand_sub: "إحدى مبادرات سدايا",
    nav_about: "عن دايكو",
    nav_programs: "البرامج والمسارات",
    nav_trainers: "الخبراء والموجهون",
    nav_faqs: "الأسئلة الشائعة",
    nav_contact: "اتصل بنا",
    login: "تسجيل الدخول",
    join_us: "انضم إلينا",
    logout: "تسجيل الخروج",
    
    // Hero
    hero_badge: "مركز التميز للبيانات والذكاء الاصطناعي",
    hero_title: "نقود التحول الوطني ونمكّن القطاعات الحيوية بالبيانات والذكاء الاصطناعي",
    hero_desc: "نعمل في مركز دايكو (DAICO) بكلية علوم الحاسب والمعلومات بجامعة الملك سعود، بشراكة استراتيجية مع سدايا، على تأهيل الكوادر الوطنية وسد الفجوة مع سوق العمل عبر برامج تدريبية متخصصة، ودعم هندسة البرمجيات الذكية وتطوير حالات استخدام وطنية تدعم التحول الرقمي.",
    hero_cta_explore: "اكتشف حلولنا",
    hero_cta_join: "شارك في التحول",
    hero_partners_title: "بمبادرة استراتيجية من",

    // Stats
    stat_students_label: "متدرب مُمكَّن",
    stat_courses_label: "برنامج تدريبي",
    stat_trainers_label: "خبير وموجه",
    stat_employment_label: "نسبة التوظيف",

    // About Section
    about_subtitle: "عن دايكو",
    about_title: "منظومة وطنية متكاملة للريادة والتمكين",
    about_card_talent_title: "تمكين الكوادر الوطنية",
    about_card_talent_desc: "تأهيل وتدريب الكفاءات الوطنية الشابة وسد الفجوة بين المخرجات الأكاديمية واحتياجات سوق العمل الفعلي في مجالات البيانات والذكاء الاصطناعي.",
    about_card_innovation_title: "الابتكار وحالات الاستخدام",
    about_card_innovation_desc: "تطوير وبناء نماذج ذكية وحالات استخدام وطنية رائدة تخدم التحول الرقمي وتسهم في تحسين جودة الحياة في مختلف القطاعات.",
    about_card_software_title: "دعم هندسة البرمجيات",
    about_card_software_desc: "تقديم الاستشارات الفنية والمنهجيات الهندسية المتقدمة لتمكين التطبيقات والأنظمة البرمجية الذكية القابلة للتوسع بأعلى معايير الجودة.",

    // Programs Section
    programs_subtitle: "المسارات والبرامج",
    programs_title: "برامج تدريبية ومسارات تقنية متكاملة لتأهيلك للمستقبل",
    programs_tab_all: "الكل",
    programs_tab_course: "الدورات التدريبية",
    programs_tab_bootcamp: "المعسكرات التقنية",
    programs_tab_hackathon: "الهاكاثونات",
    programs_tab_workshop: "ورش العمل",

    // Trainers
    trainers_subtitle: "الخبراء والموجهون",
    trainers_title: "نخبة من الأكاديميين والمستشارين المعتمدين لتمكين رحلتك",

    // Contact
    contact_subtitle: "اتصل بنا",
    contact_title: "يسعدنا الإجابة على استفساراتك ومساعدتك في الانضمام إلينا",
    contact_label_name: "الاسم الكامل",
    contact_label_email: "البريد الإلكتروني",
    contact_label_type: "نوع الاستفسار",
    contact_type_general: "عام",
    contact_type_support: "دعم فني",
    contact_type_partner: "شراكات ومبادرات",
    contact_label_message: "الرسالة",
    contact_placeholder_name: "أدخل اسمك الكامل",
    contact_placeholder_email: "name@domain.com",
    contact_placeholder_message: "أكتب رسالتك هنا...",
    contact_btn_send: "إرسال الرسالة",

    // FAQs
    faqs_subtitle: "الأسئلة الشائعة",
    faqs_title: "إجابات سريعة للأسئلة الأكثر تكراراً حول المنصة والبرامج",

    // Footer
    footer_about: "إحدى مبادرات الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا) بكلية علوم الحاسب والمعلومات بجامعة الملك سعود.",
    footer_links: "روابط سريعة",
    footer_connect: "تواصل معنا",
    footer_copyright: "جميع الحقوق محفوظة © 2026 مركز دايكو للتميز.",

    // Dashboard common
    welcome: "مرحباً بك!",
    role_admin: "رتبتك: مشرف",
    role_trainer: "رتبتك: مدرب/خبير",
    role_student: "رتبتك: متدرب",
    loading: "تحميل...",
    dashboard: "لوحة التحكم",

    // Admin Sidebar
    admin_menu_overview: "نظرة عامة والتحليلات",
    admin_menu_programs: "إدارة البرامج والفعاليات",
    admin_menu_requests: "طلبات التسجيل والقبول",
    admin_menu_students: "إدارة شؤون الطلاب",
    admin_menu_trainers: "دليل المدربين والخبراء",
    admin_menu_certs: "الشهادات الرقمية الصادرة",
    admin_menu_notifs: "بث الإشعارات والرسائل",
    admin_menu_homepage: "إعدادات الصفحة الرئيسية",

    // Admin Panels text
    admin_section_analytics_title: "لوحة التحليلات والإحصائيات",
    admin_section_analytics_desc: "مؤشرات أداء البرامج، أعداد المسجلين، والمدخلات المالية للمنصة التقنية.",
    admin_stat_registered: "إجمالي الطلاب المسجلين",
    admin_stat_active: "الطلاب الفاعلون هذا الشهر",
    admin_stat_revenue: "المدخلات والرسوم المالية",
    admin_stat_programs: "البرامج والفعاليات النشطة",
    admin_btn_export_reg: "تصدير بيانات التسجيل (CSV)",
    admin_btn_export_stats: "تصدير التقرير الإحصائي (CSV)",
    admin_recent_registrations: "أحدث طلبات التسجيل المقدمة",
    admin_active_distributions: "توزيع الطلاب الفاعلين والبرامج التدريبية المتاحة",

    // User Dashboard
    user_menu_browse: "استعراض البرامج والفعاليات",
    user_menu_my_programs: "برامجي التدريبية",
    user_menu_certificates: "شهاداتي الرقمية",
    user_menu_profile: "الملف الشخصي والحساب",
    user_section_browse_title: "استعراض البرامج والفعاليات",
    user_section_browse_desc: "سجل في الدورات والمعسكرات التفاعلية والهاكاثونات لتأهيل مهاراتك التقنية.",
    user_search_placeholder: "ابحث باسم الدورة أو المحتوى...",
    user_label_notifications_header: "الإشعارات التنبيهية",

    // Trainer Dashboard
    trainer_menu_schedule: "جدول المحاضرات والمهام",
    trainer_menu_students: "تقييم أداء الطلاب",
    trainer_menu_profile: "بياناتي المهنية والخبرات",

    // Auth Pages
    auth_brand: "دايكو DAICO",
    auth_subtitle_desc: "مركز التميز للبيانات والذكاء الاصطناعي",
    auth_login_title: "تسجيل الدخول للمنصة",
    auth_login_desc: "أهلاً بك مجدداً، الرجاء إدخال بياناتك للمتابعة.",
    auth_tab_trainee: "تسجيل دخول متدرب",
    auth_tab_admin: "تسجيل دخول مسؤول",
    auth_label_email: "البريد الإلكتروني",
    auth_label_password: "كلمة المرور",
    auth_btn_login: "تسجيل الدخول",
    auth_forgot_password: "نسيت كلمة المرور؟",
    auth_dont_have_account: "ليس لديك حساب؟",
    auth_create_account: "سجل حساباً جديداً",
    auth_register_title: "إنشاء حساب جديد بالمنصة",
    auth_register_desc: "انضم إلينا اليوم وابدأ رحلتك التعليمية في مجالات البيانات والذكاء الاصطناعي.",
    auth_label_fullname: "الاسم الكامل (ثنائي على الأقل)",
    auth_label_confirm_password: "تأكيد كلمة المرور",
    auth_btn_register: "تسجيل حساب جديد",
    auth_already_have_account: "لديك حساب بالفعل؟",
    auth_forgot_title: "استعادة كلمة المرور",
    auth_forgot_desc: "أدخل بريدك الإلكتروني وسنقوم بإرسال رابط الاستعادة.",
    auth_btn_send_reset: "إرسال رابط الاستعادة",
    auth_verify_title: "تأكيد الحساب",
    auth_verify_desc: "يرجى إدخال رمز التحقق (OTP) المرسل لبريدك الإلكتروني."
  },
  en: {
    // Header & Navbar
    brand_title: "DAICO",
    brand_sub: "A SDAIA Initiative",
    nav_about: "About DAICO",
    nav_programs: "Programs & Tracks",
    nav_trainers: "Experts & Mentors",
    nav_faqs: "FAQs",
    nav_contact: "Contact Us",
    login: "Login",
    join_us: "Join Us",
    logout: "Logout",

    // Hero
    hero_badge: "Data & AI Center of Excellence",
    hero_title: "Leading National Transformation and Empowering Vital Sectors with Data & AI",
    hero_desc: "We work at DAICO Center, College of Computer and Information Sciences at King Saud University, in strategic partnership with SDAIA, to qualify national talents, bridge the job market gap through specialized training programs, support smart software engineering, and develop national use cases that support digital transformation.",
    hero_cta_explore: "Explore Our Solutions",
    hero_cta_join: "Join the Transformation",
    hero_partners_title: "A Strategic Initiative By",

    // Stats
    stat_students_label: "Empowered Trainees",
    stat_courses_label: "Training Programs",
    stat_trainers_label: "Experts & Mentors",
    stat_employment_label: "Employment Rate",

    // About Section
    about_subtitle: "ABOUT DAICO",
    about_title: "An Integrated National Ecosystem for Leadership & Empowerment",
    about_card_talent_title: "Empowering National Talent",
    about_card_talent_desc: "Qualifying and training young national talents and bridging the gap between academic outcomes and actual market needs in Data and AI.",
    about_card_innovation_title: "Innovation & Use Cases",
    about_card_innovation_desc: "Developing and building smart models and leading national use cases that serve digital transformation and improve quality of life across sectors.",
    about_card_software_title: "Software Engineering Support",
    about_card_software_desc: "Providing technical consultations and advanced engineering methodologies to enable scalable smart software applications and systems with the highest quality standards.",

    // Programs Section
    programs_subtitle: "TRACKS & PROGRAMS",
    programs_title: "Integrated Training Programs & Tech Tracks to Prepare You for the Future",
    programs_tab_all: "All",
    programs_tab_course: "Training Courses",
    programs_tab_bootcamp: "Tech Bootcamps",
    programs_tab_hackathon: "Hackathons",
    programs_tab_workshop: "Workshops",

    // Trainers
    trainers_subtitle: "EXPERTS & MENTORS",
    trainers_title: "Elite Academics & Certified Consultants to Empower Your Journey",

    // Contact
    contact_subtitle: "CONTACT US",
    contact_title: "We are happy to answer your inquiries and help you join us",
    contact_label_name: "Full Name",
    contact_label_email: "Email Address",
    contact_label_type: "Inquiry Type",
    contact_type_general: "General",
    contact_type_support: "Technical Support",
    contact_type_partner: "Partnerships & Initiatives",
    contact_label_message: "Message",
    contact_placeholder_name: "Enter your full name",
    contact_placeholder_email: "name@domain.com",
    contact_placeholder_message: "Write your message here...",
    contact_btn_send: "Send Message",

    // FAQs
    faqs_subtitle: "FAQ",
    faqs_title: "Quick answers to the most frequently asked questions about the platform and programs",

    // Footer
    footer_about: "An initiative of the Saudi Data and AI Authority (SDAIA) at the College of Computer and Information Sciences, King Saud University.",
    footer_links: "Quick Links",
    footer_connect: "Connect With Us",
    footer_copyright: "All rights reserved © 2026 DAICO Center of Excellence.",

    // Dashboard common
    welcome: "Welcome!",
    role_admin: "Role: Administrator",
    role_trainer: "Role: Trainer/Expert",
    role_student: "Role: Trainee",
    loading: "Loading...",
    dashboard: "Dashboard",

    // Admin Sidebar
    admin_menu_overview: "Overview & Analytics",
    admin_menu_programs: "Manage Programs",
    admin_menu_requests: "Registrations & Admissions",
    admin_menu_students: "Student Management",
    admin_menu_trainers: "Trainers Directory",
    admin_menu_certs: "Issued Digital Certs",
    admin_menu_notifs: "Broadcast & Messages",
    admin_menu_homepage: "Homepage Settings",

    // Admin Panels text
    admin_section_analytics_title: "Analytics & Statistics Panel",
    admin_section_analytics_desc: "Program performance indicators, registration counts, and financial inputs.",
    admin_stat_registered: "Total Registered Students",
    admin_stat_active: "Active Students This Month",
    admin_stat_revenue: "Financial Input & Fees",
    admin_stat_programs: "Active Programs & Events",
    admin_btn_export_reg: "Export Registrations (CSV)",
    admin_btn_export_stats: "Export Statistics Report (CSV)",
    admin_recent_registrations: "Recent Registration Requests",
    admin_active_distributions: "Active Student Distributions & Training Programs",

    // User Dashboard
    user_menu_browse: "Browse Programs & Events",
    user_menu_my_programs: "My Training Programs",
    user_menu_certificates: "My Digital Certificates",
    user_menu_profile: "Profile & Account",
    user_section_browse_title: "Browse Programs & Events",
    user_section_browse_desc: "Register in interactive courses, bootcamps, and hackathons to build your tech skills.",
    user_search_placeholder: "Search by course title or content...",
    user_label_notifications_header: "Alert Notifications",

    // Trainer Dashboard
    trainer_menu_schedule: "Lectures & Tasks Schedule",
    trainer_menu_students: "Evaluate Student Performance",
    trainer_menu_profile: "My Professional Profile",

    // Auth Pages
    auth_brand: "DAICO",
    auth_subtitle_desc: "Data & AI Center of Excellence",
    auth_login_title: "Platform Login",
    auth_login_desc: "Welcome back, please enter your credentials to proceed.",
    auth_tab_trainee: "Trainee Login",
    auth_tab_admin: "Admin/Staff Login",
    auth_label_email: "Email Address",
    auth_label_password: "Password",
    auth_btn_login: "Sign In",
    auth_forgot_password: "Forgot Password?",
    auth_dont_have_account: "Don't have an account?",
    auth_create_account: "Create a new account",
    auth_register_title: "Create New Account",
    auth_register_desc: "Join us today and start your educational journey in Data & AI.",
    auth_label_fullname: "Full Name (At least two names)",
    auth_label_confirm_password: "Confirm Password",
    auth_btn_register: "Create Account",
    auth_already_have_account: "Already have an account?",
    auth_forgot_title: "Recover Password",
    auth_forgot_desc: "Enter your email to receive a password reset link.",
    auth_btn_send_reset: "Send Reset Link",
    auth_verify_title: "Verify Account",
    auth_verify_desc: "Please enter the OTP sent to your email address."
  }
};

/**
 * Perform DOM element translation replacements based on data-i18n tags.
 */
function translatePage(lang) {
  const dict = I18N_TRANSLATIONS[lang] || I18N_TRANSLATIONS.ar;
  
  // Update data-i18n elements
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      // Preserve HTML structure if element contains SVG or elements inside it
      const svg = el.querySelector('svg');
      if (svg) {
        // Keep the svg and replace the text content of the text node child
        const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
          textNode.nodeValue = " " + dict[key];
        } else {
          // If no text node, append or rebuild
          const span = el.querySelector('span');
          if (span) {
            span.textContent = dict[key];
          } else {
            el.innerHTML = svg.outerHTML + ` <span>${dict[key]}</span>`;
          }
        }
      } else {
        // Simple text replacement
        el.textContent = dict[key];
      }
    }
  });

  // Update data-i18n-placeholder elements
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}

/**
 * Dynamically injects the language switcher toggle button next to the theme switcher button.
 */
function injectLanguageSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentLang = localStorage.getItem('daico_lang') || 'ar';
  const isEn = currentLang === 'en';

  // Check if already injected
  if (document.getElementById('language-toggle')) return;

  const langBtn = document.createElement('button');
  langBtn.id = 'language-toggle';
  langBtn.className = 'lang-toggle';
  langBtn.style.margin = '0 var(--space-sm)';
  langBtn.setAttribute('aria-label', isEn ? 'العربية' : 'English');
  langBtn.textContent = isEn ? 'العربية' : 'English';

  // Insert next to the theme toggle
  themeToggle.parentNode.insertBefore(langBtn, themeToggle.nextSibling || themeToggle);

  langBtn.addEventListener('click', () => {
    const nextLang = localStorage.getItem('daico_lang') === 'en' ? 'ar' : 'en';
    localStorage.setItem('daico_lang', nextLang);
    window.location.reload();
  });
}

// Execute on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = localStorage.getItem('daico_lang') || 'ar';
  translatePage(currentLang);
  injectLanguageSwitcher();
});

// Export utility for external/dynamic access
window.DAICO_I18N = {
  getCurrentLanguage() {
    return localStorage.getItem('daico_lang') || 'ar';
  },
  t(key) {
    const lang = this.getCurrentLanguage();
    return (I18N_TRANSLATIONS[lang] && I18N_TRANSLATIONS[lang][key]) || key;
  },
  translatePage
};
