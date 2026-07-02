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
    head_title: "مركز دايكو للتميز في البيانات والذكاء الاصطناعي | DAICO",
    head_desc: "مركز دايكو (DAICO) هو مركز التميز للبيانات والذكاء الاصطناعي بجامعة الملك سعود بشراكة سدايا، لسد الفجوة المهنية وإعداد الكفاءات الوطنية وتطوير الحلول الذكية.",
    brand_title: "دايكو",
    brand_badge: "إحدى مبادرات سدايا",
    nav_about: "عن دايكو",
    nav_programs: "البرامج والمسارات",
    nav_trainers: "الخبراء والموجهون",
    nav_faqs: "الأسئلة الشائعة",
    nav_contact: "اتصل بنا",
    btn_login: "تسجيل الدخول",
    btn_register: "انضم إلينا",
    hero_badge: "مركز التميز للبيانات والذكاء الاصطناعي",
    hero_title: "نقود التحول الوطني ونمكّن القطاعات الحيوية بالبيانات والذكاء الاصطناعي",
    hero_desc: "نعمل في مركز دايكو (DAICO) بكلية علوم الحاسب والمعلومات بجامعة الملك سعود، بشراكة استراتيجية مع سدايا، على تأهيل الكوادر الوطنية وسد الفجوة مع سوق العمل عبر برامج تدريبية متخصصة، ودعم هندسة البرمجيات الذكية وتطوير حالات استخدام وطنية تدعم التحول الرقمي.",
    btn_discover: "اكتشف حلولنا",
    btn_participate: "شارك في التحول",
    partners_title: "بمبادرة استراتيجية من",
    partner_ksu: "جامعة الملك سعود",
    partner_sdaia: "الهيئة السعودية للبيانات والذكاء الاصطناعي | سدايا",
    visit_site: "زيارة الموقع الرسمي",
    stat_students: "طالب ومبتكر متخرج",
    stat_courses: "برنامج تدريبي وورشة عمل",
    stat_trainers: "مدرب وخبير أكاديمي",
    stat_employment: "نسبة التوظيف والالتحاق بسوق العمل",
    about_subtitle: "من نحن",
    about_title: "مركز دايكو للتميز في البيانات والذكاء الاصطناعي",
    about_desc: "مبادرة وطنية مشتركة بين سدايا وجامعة الملك سعود لتأهيل الكوادر المتخصصة، ودعم تطوير برمجيات الذكاء الاصطناعي، وتطوير حالات استخدام مبتكرة ترفع الإنتاجية وتدعم التحول الرقمي.",
    about_card1_title: "تعليم مهني تفاعلي",
    about_card1_desc: "مناهج تدريبية مبنية وفقاً لأحدث الممارسات ومعايير سوق العمل الفعلية لضمان تحصيل مهارات حقيقية وعملية.",
    about_card2_title: "ابتكار ومنافسة",
    about_card2_desc: "تنظيم هاكاثونات ومسابقات برمجية تثير العصف الذهني وتدعم تكوين فرق قوية لصياغة حلول تخدم رؤية المملكة.",
    about_card3_title: "شهادات معتمدة وموثقة",
    about_card3_desc: "نصدر شهادات حضور وإتمام رقمية مزودة برموز استجابة سريعة (QR) مشفرة وموثقة تتيح للجهات التحقق الفوري.",
    programs_subtitle: "مسارات التدريب",
    programs_title: "برامج الابتكار المتاحة حالياً",
    programs_desc: "تصفح مساراتنا المعتمدة وسجل مقعدك مباشرة لبدء رحلتك التعليمية معنا.",
    filter_all: "الكل",
    filter_course: "الدورات التدريبية",
    filter_bootcamp: "المعسكرات التقنية",
    filter_hackathon: "الهاكاثونات",
    filter_workshop: "ورش العمل",
    trainers_subtitle: "المشرفون والخبراء",
    trainers_title: "طاقم المدربين الأكاديميين",
    trainers_desc: "مجموعة متميزة من المستشارين والخبراء الأكاديميين ذوي الخبرات الطويلة في القطاعين الأكاديمي والخاص.",
    trainer1_name: "م. خالد الحربي",
    trainer1_role: "Senior Software Architect",
    trainer1_desc: "خبرة تزيد عن 12 سنة في بناء وهندسة البرمجيات الكبرى للشركات السحابية.",
    trainer1_rating: "⭐ 4.9 (142 مراجعة طالَب)",
    trainer2_name: "د. سارة الشهري",
    trainer2_role: "أستاذة الذكاء الاصطناعي",
    trainer2_desc: "دكتوراه في تعلم الآلة ومستشارة الذكاء الاصطناعي لعدة قطاعات تنموية وبحثية.",
    trainer2_rating: "⭐ 4.8 (98 مراجعة طالَب)",
    trainer3_name: "م. عمر العتيبي",
    trainer3_role: "مستشار الأمن السيبراني",
    trainer3_desc: "مختص في اختبار الاختراق الأخلاقي وتأمين الشبكات السحابية للجهات البنكية.",
    trainer3_rating: "⭐ 4.9 (110 مراجعة طالَب)",
    success_subtitle: "قصص نجاح",
    success_title: "ماذا يقول خريجونا؟",
    success_q1: "\"التحقت بمعسكر الأمن السيبراني في مركز دايكو وكان التحدي كبيراً، ولكن الخبرة والمحتوى العملي ساعداني على اجتياز المقابلة والتوظيف كمهندس حماية شبكات فور تخرجي.\"",
    success_name1: "ريما الشمري",
    success_role1: "مهندسة أمن معلومات ببنك الرياض",
    success_q2: "\"برنامج مطور الويب المتكامل باستخدام Laravel & Next.js كان نقطة تحول في مسيرتي البرمجية. التطبيقات العملية والربط الحقيقي هما أهم ما يميز هذا الكورس.\"",
    success_name2: "م. عبد العزيز فهد",
    success_role2: "مطور واجهات تفاعلية بشركة صلة",
    partners_scroll_title: "شركاء الابتكار والنجاح",
    faq_subtitle: "الأسئلة المتكررة",
    faq_title: "لديك استفسار؟ لدينا إجابة",
    faq_q1: "كيف يمكنني التسجيل في البرامج المجانية؟",
    faq_a1: "يمكنك ببساطة إنشاء حساب مجاني في المنصة، والضغط على خيار تفاصيل أي برنامج مجاني، ثم الضغط على \"سجل الآن\" لحجز مقعدك فوراً طالما تتوفر مقاعد شاغرة.",
    faq_q2: "هل الشهادات معترف بها؟",
    faq_a2: "نعم، جميع الشهادات الصادرة تحمل رمز تحقق فريد (QR Code) مسجل في قواعد بيانات مركز دايكو، مما يمكن إدارات الموارد البشرية والشركات من التحقق من صحتها بمسحة واحدة.",
    faq_q3: "ما هي متطلبات حضور المعسكرات الحضورية؟",
    faq_a3: "المعسكرات الحضورية تقام بمقر الحاضنة بالرياض وتتطلب إحضار حاسب محمول شخصي بمواصفات تقنية مناسبة، واجتياز اختبار المهارات التأسيسي للمسار المحدد.",
    contact_subtitle: "تواصل معنا",
    contact_title: "يسعدنا سماع صوتك",
    contact_info: "معلومات الاتصال",
    contact_desc: "نحن هنا للإجابة على جميع استفساراتك حول البرامج والتسجيل وعروض رعاية المبتكرين.",
    contact_addr: "العنوان",
    contact_addr_val: "كلية علوم الحاسب والمعلومات، جامعة الملك سعود، الرياض، المملكة العربية السعودية",
    contact_email: "البريد الإلكتروني",
    contact_phone: "رقم الهاتف الموحد",
    form_name: "الاسم الكريم *",
    contact_name_ph: "الاسم الرباعي",
    form_email: "البريد الإلكتروني *",
    form_msg: "مضمون الرسالة *",
    contact_msg_ph: "اكتب استفسارك بالتفصيل...",
    btn_send: "إرسال الرسالة",
    footer_desc: "مركز التميز للبيانات والذكاء الاصطناعي بكلية علوم الحاسب والمعلومات بجامعة الملك سعود، بشراكة استراتيجية مع سدايا لسد الفجوة بين التعليم الأكاديمي وسوق العمل وتطوير الحلول البرمجية الذكية.",
    footer_links: "روابط سريعة",
    footer_about: "عن المركز",
    footer_programs: "تصفح المسارات",
    footer_team: "فريق الخبراء",
    footer_rules: "الشروط والأنظمة",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الخدمة والتدريب",
    footer_cert: "سياسة الاعتماد الفني",
    footer_copyright: "حقوق الطبع محفوظة © 2026 مركز دايكو للتميز في البيانات والذكاء الاصطناعي.",
    footer_saudi: "صنع بكل فخر بالمملكة العربية السعودية 🇸🇦",
    
    // Existing elements needed for other pages
    login: "تسجيل الدخول",
    join_us: "انضم إلينا",
    logout: "تسجيل الخروج",
    stat_students_label: "متدرب مُمكَّن",
    stat_courses_label: "برنامج تدريبي",
    stat_trainers_label: "خبير وموجه",
    stat_employment_label: "نسبة التوظيف",
    about_card_talent_title: "تمكين الكوادر الوطنية",
    about_card_talent_desc: "تأهيل وتدريب الكفاءات الوطنية الشابة وسد الفجوة بين المخرجات الأكاديمية واحتياجات سوق العمل الفعلي في مجالات البيانات والذكاء الاصطناعي.",
    about_card_innovation_title: "الابتكار وحالات الاستخدام",
    about_card_innovation_desc: "تطوير وبناء نماذج ذكية وحالات استخدام وطنية رائدة تخدم التحول الرقمي وتسهم في تحسين جودة الحياة في مختلف القطاعات.",
    about_card_software_title: "دعم هندسة البرمجيات",
    about_card_software_desc: "تقديم الاستشارات الفنية والمنهجيات الهندسية المتقدمة لتمكين التطبيقات والأنظمة البرمجية الذكية القابلة للتوسع بأعلى معايير الجودة.",
    programs_tab_all: "الكل",
    programs_tab_course: "الدورات التدريبية",
    programs_tab_bootcamp: "المعسكرات التقنية",
    programs_tab_hackathon: "الهاكاثونات",
    programs_tab_workshop: "ورش العمل",
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
    footer_connect: "تواصل معنا",
    welcome: "مرحباً بك!",
    role_admin: "رتبتك: مشرف",
    role_trainer: "رتبتك: مدرب/خبير",
    role_student: "رتبتك: متدرب",
    loading: "تحميل...",
    dashboard: "لوحة التحكم",
    admin_menu_overview: "نظرة عامة والتحليلات",
    admin_menu_programs: "إدارة البرامج والفعاليات",
    admin_menu_requests: "طلبات التسجيل والقبول",
    admin_menu_students: "إدارة شؤون الطلاب",
    admin_menu_trainers: "دليل المدربين والخبراء",
    admin_menu_certs: "الشهادات الرقمية الصادرة",
    admin_menu_notifs: "بث الإشعارات والرسائل",
    admin_menu_homepage: "إعدادات الصفحة الرئيسية",
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
    user_menu_browse: "استعراض البرامج والفعاليات",
    user_menu_my_programs: "برامجي التدريبية",
    user_menu_certificates: "شهاداتي الرقمية",
    user_menu_profile: "الملف الشخصي والحساب",
    user_section_browse_title: "استعراض البرامج والفعاليات",
    user_section_browse_desc: "سجل في الدورات والمعسكرات التفاعلية والهاكاثونات لتأهيل مهاراتك التقنية.",
    user_search_placeholder: "ابحث باسم الدورة أو المحتوى...",
    user_label_notifications_header: "الإشعارات التنبيهية",
    trainer_menu_schedule: "جدول المحاضرات والمهام",
    trainer_menu_students: "تقييم أداء الطلاب",
    trainer_menu_profile: "بياناتي المهنية والخبرات",
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
    head_title: "DAICO Center of Excellence for Data and AI | DAICO",
    head_desc: "DAICO Center is the Center of Excellence for Data and AI at King Saud University in partnership with SDAIA, to bridge the professional gap and prepare national talents and develop smart solutions.",
    brand_title: "DAICO",
    brand_badge: "A SDAIA Initiative",
    nav_about: "About DAICO",
    nav_programs: "Programs & Tracks",
    nav_trainers: "Experts & Mentors",
    nav_faqs: "FAQs",
    nav_contact: "Contact Us",
    btn_login: "Login",
    btn_register: "Join Us",
    hero_badge: "Data & AI Center of Excellence",
    hero_title: "Leading National Transformation & Empowering Vital Sectors with Data & AI",
    hero_desc: "We operate at DAICO within the College of Computer and Information Sciences at King Saud University, in strategic partnership with SDAIA, to qualify national talents and bridge the gap with the labor market through specialized training programs.",
    btn_discover: "Discover Our Solutions",
    btn_participate: "Participate in Transformation",
    partners_title: "Strategic Initiative By",
    partner_ksu: "King Saud University",
    partner_sdaia: "Saudi Data and AI Authority | SDAIA",
    visit_site: "Visit Official Website",
    stat_students: "Graduated Trainees",
    stat_courses: "Training Programs",
    stat_trainers: "Trainers & Experts",
    stat_employment: "Employment Rate",
    about_subtitle: "About Us",
    about_title: "DAICO Center of Excellence for Data and AI",
    about_desc: "A joint national initiative between SDAIA and King Saud University to qualify specialized talents, support the development of AI software, and innovate use cases that boost productivity and support digital transformation.",
    about_card1_title: "Interactive Vocational Training",
    about_card1_desc: "Training curricula built on the latest practices and actual market standards to ensure real practical skills.",
    about_card2_title: "Innovation & Competition",
    about_card2_desc: "Organizing hackathons and programming competitions that stimulate brainstorming and support forming strong teams to build solutions serving the Kingdom's vision.",
    about_card3_title: "Certified & Documented Certificates",
    about_card3_desc: "We issue digital attendance and completion certificates equipped with encrypted QR codes for instant verification.",
    programs_subtitle: "Training Tracks",
    programs_title: "Currently Available Innovation Programs",
    programs_desc: "Browse our certified tracks and register your seat directly to start your learning journey with us.",
    filter_all: "All",
    filter_course: "Training Courses",
    filter_bootcamp: "Tech Bootcamps",
    filter_hackathon: "Hackathons",
    filter_workshop: "Workshops",
    trainers_subtitle: "Supervisors & Experts",
    trainers_title: "Academic Trainers Staff",
    trainers_desc: "A distinguished group of consultants and academic experts with long experience in academic and private sectors.",
    trainer1_name: "Eng. Khalid Alharbi",
    trainer1_role: "Senior Software Architect",
    trainer1_desc: "Over 12 years of experience in building and engineering enterprise software for cloud companies.",
    trainer1_rating: "⭐ 4.9 (142 Student Reviews)",
    trainer2_name: "Dr. Sarah Alshehri",
    trainer2_role: "AI Professor",
    trainer2_desc: "PhD in Machine Learning and AI consultant for several developmental and research sectors.",
    trainer2_rating: "⭐ 4.8 (98 Student Reviews)",
    trainer3_name: "Eng. Omar Alotaibi",
    trainer3_role: "Cybersecurity Consultant",
    trainer3_desc: "Specialist in ethical hacking and cloud network security for banking sectors.",
    trainer3_rating: "⭐ 4.9 (110 Student Reviews)",
    success_subtitle: "Success Stories",
    success_title: "What Do Our Graduates Say?",
    success_q1: "\"I joined DAICO's Cybersecurity Bootcamp and it was challenging, but the experience and practical content helped me pass the interview and get hired as a network security engineer immediately after graduating.\"",
    success_name1: "Reema Alshammari",
    success_role1: "Information Security Engineer at Riyad Bank",
    success_q2: "\"The Full Stack Web Developer program using Laravel & Next.js was a turning point in my programming career. Practical applications and real-world integration are the most important features of this course.\"",
    success_name2: "Eng. Abdulaziz Fahad",
    success_role2: "Frontend Developer at Sela",
    partners_scroll_title: "Innovation & Success Partners",
    faq_subtitle: "Frequently Asked Questions",
    faq_title: "Have an Inquiry? We Have an Answer",
    faq_q1: "How can I register for free programs?",
    faq_a1: "You can simply create a free account on the platform, click on the details of any free program, then click \"Register Now\" to book your seat immediately as long as seats are available.",
    faq_q2: "Are the certificates recognized?",
    faq_a2: "Yes, all issued certificates carry a unique QR Code registered in DAICO databases, allowing HR departments to verify their authenticity with one scan.",
    faq_q3: "What are the requirements to attend in-person bootcamps?",
    faq_a3: "In-person bootcamps are held at the incubator headquarters in Riyadh and require bringing a personal laptop with suitable technical specifications and passing the foundational skills test for the specific track.",
    contact_subtitle: "Contact Us",
    contact_title: "We're Glad to Hear from You",
    contact_info: "Contact Information",
    contact_desc: "We are here to answer all your inquiries regarding programs, registration, and innovator sponsorship offers.",
    contact_addr: "Address",
    contact_addr_val: "College of Computer and Information Sciences, King Saud University, Riyadh, Saudi Arabia",
    contact_email: "Email",
    contact_phone: "Unified Phone Number",
    form_name: "Full Name *",
    contact_name_ph: "Full Name",
    form_email: "Email *",
    form_msg: "Message Content *",
    contact_msg_ph: "Write your inquiry in detail...",
    btn_send: "Send Message",
    footer_desc: "Data & AI Center of Excellence at CCIS, KSU, in strategic partnership with SDAIA to bridge the gap between academia and labor market.",
    footer_links: "Quick Links",
    footer_about: "About Center",
    footer_programs: "Browse Tracks",
    footer_team: "Experts Team",
    footer_rules: "Rules & Terms",
    footer_privacy: "Privacy Policy",
    footer_terms: "Service & Training Terms",
    footer_cert: "Technical Accreditation Policy",
    footer_copyright: "Copyright © 2026 DAICO Center of Excellence for Data and AI.",
    footer_saudi: "Proudly made in Saudi Arabia 🇸🇦",
    
    // Existing elements needed for other pages
    login: "Login",
    join_us: "Join Us",
    logout: "Logout",
    stat_students_label: "Empowered Trainees",
    stat_courses_label: "Training Programs",
    stat_trainers_label: "Experts & Mentors",
    stat_employment_label: "Employment Rate",
    about_card_talent_title: "Empowering National Talent",
    about_card_talent_desc: "Qualifying and training young national talents and bridging the gap between academic outcomes and actual market needs in Data and AI.",
    about_card_innovation_title: "Innovation & Use Cases",
    about_card_innovation_desc: "Developing and building smart models and leading national use cases that serve digital transformation and improve quality of life across sectors.",
    about_card_software_title: "Software Engineering Support",
    about_card_software_desc: "Providing technical consultations and advanced engineering methodologies to enable scalable smart software applications and systems with the highest quality standards.",
    programs_tab_all: "All",
    programs_tab_course: "Training Courses",
    programs_tab_bootcamp: "Tech Bootcamps",
    programs_tab_hackathon: "Hackathons",
    programs_tab_workshop: "Workshops",
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
    footer_connect: "Connect With Us",
    welcome: "Welcome!",
    role_admin: "Role: Administrator",
    role_trainer: "Role: Trainer/Expert",
    role_student: "Role: Trainee",
    loading: "Loading...",
    dashboard: "Dashboard",
    admin_menu_overview: "Overview & Analytics",
    admin_menu_programs: "Manage Programs",
    admin_menu_requests: "Registrations & Admissions",
    admin_menu_students: "Student Management",
    admin_menu_trainers: "Trainers Directory",
    admin_menu_certs: "Issued Digital Certs",
    admin_menu_notifs: "Broadcast & Messages",
    admin_menu_homepage: "Homepage Settings",
    admin_section_analytics_title: "Analytics & Statistics Dashboard",
    admin_section_analytics_desc: "Program performance indicators, enrolled students, and financial inputs for the technical platform.",
    admin_stat_registered: "Total Registered Students",
    admin_stat_active: "Active Students This Month",
    admin_stat_revenue: "Financial Inputs & Fees",
    admin_stat_programs: "Active Programs & Events",
    admin_btn_export_reg: "Export Registration Data (CSV)",
    admin_btn_export_stats: "Export Statistical Report (CSV)",
    admin_recent_registrations: "Latest Registration Requests",
    admin_active_distributions: "Distribution of Active Students & Training Programs",
    user_menu_browse: "Browse Programs & Events",
    user_menu_my_programs: "My Training Programs",
    user_menu_certificates: "My Digital Certificates",
    user_menu_profile: "Profile & Account",
    user_section_browse_title: "Browse Programs & Events",
    user_section_browse_desc: "Register for interactive courses, bootcamps, and hackathons to qualify your technical skills.",
    user_search_placeholder: "Search by course or content name...",
    user_label_notifications_header: "Notifications",
    trainer_menu_schedule: "Schedule & Tasks",
    trainer_menu_students: "Student Performance Evaluation",
    trainer_menu_profile: "Professional Data & Experience",
    auth_brand: "DAICO",
    auth_subtitle_desc: "Data & AI Center of Excellence",
    auth_login_title: "Platform Login",
    auth_login_desc: "Welcome back, please enter your details to continue.",
    auth_tab_trainee: "Trainee Login",
    auth_tab_admin: "Admin Login",
    auth_label_email: "Email Address",
    auth_label_password: "Password",
    auth_btn_login: "Login",
    auth_forgot_password: "Forgot Password?",
    auth_dont_have_account: "Don't have an account?",
    auth_create_account: "Create a new account",
    auth_register_title: "Create a New Platform Account",
    auth_register_desc: "Join us today and start your educational journey in Data & AI.",
    auth_label_fullname: "Full Name (At least 2 names)",
    auth_label_confirm_password: "Confirm Password",
    auth_btn_register: "Register New Account",
    auth_already_have_account: "Already have an account?",
    auth_forgot_title: "Recover Password",
    auth_forgot_desc: "Enter your email and we'll send a recovery link.",
    auth_btn_send_reset: "Send Recovery Link",
    auth_verify_title: "Verify Account",
    auth_verify_desc: "Please enter the verification code (OTP) sent to your email."
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
  
  // Update content dynamically (like meta description)
  const metaDesc = document.querySelector('meta[data-i18n-content="head_desc"]');
  if (metaDesc && dict['head_desc']) {
      metaDesc.setAttribute('content', dict['head_desc']);
  }
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
    
    // Switch without refresh
    document.documentElement.setAttribute('dir', nextLang === 'en' ? 'ltr' : 'rtl');
    document.documentElement.setAttribute('lang', nextLang);
    langBtn.setAttribute('aria-label', nextLang === 'en' ? 'العربية' : 'English');
    langBtn.textContent = nextLang === 'en' ? 'العربية' : 'English';
    
    translatePage(nextLang);
  });
}

/**
 * Auto-tags elements with data-i18n based on the Arabic dictionary matching
 */
function autoTagElements() {
  const arDict = I18N_TRANSLATIONS.ar;
  const elements = document.querySelectorAll('*:not(script):not(style)');
  
  const reverseDict = {};
  for (const [key, value] of Object.entries(arDict)) {
    reverseDict[value.trim()] = key;
  }

  elements.forEach(el => {
    // Match direct text
    if (el.children.length === 0 && el.textContent.trim()) {
      const text = el.textContent.trim();
      if (reverseDict[text] && !el.hasAttribute('data-i18n')) {
        el.setAttribute('data-i18n', reverseDict[text]);
      }
    } else if (el.childNodes.length > 0) {
       // Match mixed content
       Array.from(el.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
             const text = node.nodeValue.trim();
             if (reverseDict[text] && !el.hasAttribute('data-i18n')) {
                el.setAttribute('data-i18n', reverseDict[text]);
             }
          }
       });
    }
    
    // Match placeholders
    if (el.placeholder && reverseDict[el.placeholder.trim()] && !el.hasAttribute('data-i18n-placeholder')) {
      el.setAttribute('data-i18n-placeholder', reverseDict[el.placeholder.trim()]);
    }
  });
}

// Execute on DOM load
document.addEventListener('DOMContentLoaded', () => {
  autoTagElements();
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
