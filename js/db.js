/**
 * DAICO LocalStorage Relational Database Engine & Seeder
 */

const DB_KEY_PREFIX = 'daico_db_';

const SEED_ROLES = [
  { id: 1, name: 'super_admin' },
  { id: 2, name: 'admin' },
  { id: 3, name: 'user' }
];

const SEED_USERS = [
  { id: 1, name: 'المدير العام الخارق', email: 'superadmin@daico.edu.sa', password_hash: 'admin123', role_id: 1, verified: true, created_at: '2026-01-01' },
  { id: 2, name: 'سارة العتيبي (مسؤولة)', email: 'admin@daico.edu.sa', password_hash: 'admin123', role_id: 2, verified: true, created_at: '2026-01-10' },
  { id: 3, name: 'عبد الرحمن القحطاني (طالب)', email: 'student@daico.edu.sa', password_hash: 'student123', role_id: 3, verified: true, created_at: '2026-02-01' }
];

const SEED_CATEGORIES = [
  { id: 1, name_ar: 'الذكاء الاصطناعي وعلوم البيانات', slug: 'ai-data-science' },
  { id: 2, name_ar: 'تطوير البرمجيات والويب', slug: 'software-web-dev' },
  { id: 3, name_ar: 'الأمن السيبراني والشبكات', slug: 'cybersecurity' },
  { id: 4, name_ar: 'تصميم تجربة المستخدم والتصميم الإبداعي', slug: 'ui-ux-design' }
];

const SEED_TRAINERS = [
  {
    id: 1,
    name: 'م. خالد الحربي',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    title: 'خبير تطوير برمجيات أول وسفير الحوسبة السحابية',
    bio: 'خبير في بناء وتطوير المنظومات البرمجية الكبيرة لأكثر من 10 سنوات. قدم العديد من المعسكرات البرمجية المتقدمة وشارك في تحكيم العديد من الهاكاثونات الوطنية.',
    experience_years: 12,
    specializations: ['تطوير الويب المتكامل', 'Node.js', 'React/Next.js', 'Laravel'],
    certificates: ['AWS Solution Architect', 'Oracle Java Professional'],
    social_links: { linkedin: '#', twitter: '#', github: '#' },
    rating: 4.9,
    reviews_count: 142
  },
  {
    id: 2,
    name: 'د. سارة الشهري',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    title: 'أستاذة مشاركة في الذكاء الاصطناعي وعلم البيانات',
    bio: 'دكتوراة في تعلم الآلة والذكاء الاصطناعي. مستشارة تقنية لعدة جهات حكومية وخاصة ومحاضرة دولية في استشراف المستقبل التقني وعلم البيانات.',
    experience_years: 8,
    specializations: ['الذكاء الاصطناعي', 'تعلم الآلة Deep Learning', 'تحليل البيانات الضخمة', 'Python'],
    certificates: ['Stanford Certified AI Professional', 'Google Cloud Data Engineer'],
    social_links: { linkedin: '#', twitter: '#' },
    rating: 4.8,
    reviews_count: 98
  },
  {
    id: 3,
    name: 'م. عمر العتيبي',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
    title: 'مستشار الأمن السيبراني واختراق الأنظمة الأخلاقي',
    bio: 'مختص في اختبار الاختراق وحماية البنى التحتية للمعلومات. عمل كمستشار أمني للعديد من البنوك والشركات التقنية الكبرى.',
    experience_years: 9,
    specializations: ['الأمن السيبراني', 'اختبار الاختراق Ethic Hacking', 'أمن الحوسبة السحابية'],
    certificates: ['CEH (Certified Ethical Hacker)', 'CISSP'],
    social_links: { linkedin: '#', github: '#' },
    rating: 4.9,
    reviews_count: 110
  }
];

const SEED_EVENTS = [
  // Courses (كورسات)
  {
    id: 1,
    type: 'course',
    title: 'مطور الويب المتكامل باستخدام Laravel & Next.js',
    description: 'دورة مكثفة مصممة للانتقال بك من الصفر إلى مطور محترف قادر على بناء تطبيقات ويب متطورة وسريعة وقابلة للتوسع باستخدام Laravel كخلفية برمجية و Next.js للواجهات الأمامية.',
    category_id: 2,
    trainer_id: 1,
    cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
    start_date: '2026-07-15',
    end_date: '2026-08-30',
    duration: '60 ساعة تدريبية',
    location_type: 'online',
    location_name: 'عبر بث مباشر زووم (تفاعلي)',
    seats_total: 50,
    seats_remaining: 15,
    price: 499.00,
    status: 'published',
    objectives: ['فهم معمق لمعمارية API وتطوير RESTful APIs في Laravel.', 'بناء واجهات مستخدم متجاوبة وتفاعلية بـ React & TailwindCSS.', 'تطبيق ممارسات الحماية وإدارة الجلسات باستخدام JWT و Sanctum.'],
    requirements: ['معرفة متوسطة بأساسيات HTML, CSS, JavaScript.', 'فهم أساسيات قواعد البيانات.'],
    skills: ['تطوير الويب المتكامل', 'PHP Laravel API', 'React / Next.js', 'إدارة قواعد البيانات PostgreSQL'],
    schedule: [
      { week: 'الأسبوع الأول', topic: 'تأسيس بنية قاعدة البيانات وبدء استخدام Laravel' },
      { week: 'الأسبوع الثاني', topic: 'تصميم وبناء الـ RESTful APIs وإدارة الصلاحيات' },
      { week: 'الأسبوع الثالث', topic: 'مقدمة بـ Next.js وربط الـ Frontend بالـ Backend' },
      { week: 'الأسبوع الرابع', topic: 'نشر وتأمين التطبيق على خوادم سحابية' }
    ],
    faqs: [
      { question: 'هل المحاضرات مسجلة؟', answer: 'نعم، يتم توفير تسجيل كامل لكل محاضرة في اليوم التالي للبث مباشرة.' },
      { question: 'هل أحصل على شهادة بنهاية الكورس؟', answer: 'نعم، ستحصل على شهادة حضور رقمية معتمدة برمز التحقق QR عند إتمام 80% من التطبيقات العملية.' }
    ]
  },
  {
    id: 2,
    type: 'course',
    title: 'أساسيات وتطبيقات الذكاء الاصطناعي التوليدي',
    description: 'تعلم كيفية استغلال النماذج اللغوية الضخمة (LLMs) وأدوات الذكاء الاصطناعي التوليدي لبناء تطبيقات برمجية مبتكرة وأتمتة المهام اليومية في بيئات الأعمال المختلفة.',
    category_id: 1,
    trainer_id: 2,
    cover_image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600',
    start_date: '2026-07-20',
    end_date: '2026-08-10',
    duration: '30 ساعة تدريبية',
    location_type: 'online',
    location_name: 'منصة التدريب الافتراضية لـ DAICO',
    seats_total: 100,
    seats_remaining: 42,
    price: 0.00, // Free
    status: 'published',
    objectives: ['فهم آلية عمل النماذج اللغوية الكبيرة GPT-4 وما شابهها.', 'إتقان هندسة الأوامر (Prompt Engineering) للحصول على أفضل النتائج.', 'ربط وتكامل واجهات برمجة تطبيقات OpenAI مع برامجك الخاصة.'],
    requirements: ['معرفة أساسية بلغة بايثون أو أي لغة برمجية أخرى.'],
    skills: ['هندسة الأوامر Prompt Engineering', 'OpenAI APIs Integration', 'بناء تطبيقات LLM'],
    schedule: [
      { week: 'الأسبوع الأول', topic: 'مقدمة في الذكاء الاصطناعي التوليدي وتاريخ النماذج' },
      { week: 'الأسبوع الثاني', topic: 'كتابة الأوامر المتقدمة وهندسة السياق' },
      { week: 'الأسبوع الثالث', topic: 'برمجة وبناء تطبيقات باستخدام LangChain وبايثون' }
    ],
    faqs: [
      { question: 'هل الكورس مجاني بالكامل؟', answer: 'نعم، هذا البرنامج مدعوم بالكامل ومجاني للمواطنين والمقيمين.' }
    ]
  },

  // Bootcamps (معسكرات)
  {
    id: 3,
    type: 'bootcamp',
    title: 'معسكر الأمن السيبراني واختبار الاختراق المتقدم',
    description: 'معسكر مهني مكثف يهدف إلى تخريج خبراء في اختبار الاختراق الدفاعي والهجومي وحماية الأنظمة، من خلال تدريبات عملية تحاكي الهجمات الواقعية وتطبيقات عملية على خوادم تجريبية.',
    category_id: 3,
    trainer_id: 3,
    cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
    start_date: '2026-08-01',
    end_date: '2026-09-15',
    duration: '6 أسابيع (120 ساعة)',
    location_type: 'offline',
    location_name: 'مقر حاضنة DAICO للابتكار - الرياض',
    seats_total: 25,
    seats_remaining: 4,
    price: 1500.00,
    status: 'published',
    objectives: ['فهم منهجيات اختبار الاختراق والأمن الدفاعي.', 'تحديد الثغرات الأمنية في تطبيقات الويب والشبكات وكيفية ترقيعها.', 'الاستعداد لاجتياز الشهادات المهنية مثل CEH و OSCP.'],
    requirements: ['فهم أساسي للشبكات وأنظمة التشغيل Linux.', 'اجتياز المقابلة الشخصية والتقييم القبلي.'],
    skills: ['اختبار الاختراق Web Pentesting', 'حماية البنية التحتية Network Security', 'نظام تشغيل Linux المتقدم'],
    schedule: [
      { week: 'الأسبوع 1-2', topic: 'أساسيات Linux وأمن الشبكات وجمع المعلومات الاستخبارية' },
      { week: 'الأسبوع 3-4', topic: 'اختراق تطبيقات الويب واستغلال الثغرات الشهيرة OWASP Top 10' },
      { week: 'الأسبوع 5-6', topic: 'كتابة التقارير الأمنية وتأمين وبناء دفاعات الأنظمة' }
    ],
    faqs: [
      { question: 'هل توجد شروط للتسجيل؟', answer: 'نعم، يجب أن تجتاز اختبار القبول الأولي وتملك دراية جيدة بأساسيات الحاسب والشبكات.' }
    ]
  },

  // Hackathons (هاكاثونات)
  {
    id: 4,
    type: 'hackathon',
    title: 'هاكاثون دايكو للحلول الذكية والابتكار 2026',
    description: 'تحدي تقني يمتد لـ 3 أيام يجتمع فيه المبرمجون والمصممون والمبتكرون لابتكار حلول تقنية ذكية في مجالات الاستدامة وتسهيل الأعمال والخدمات اللوجستية باستخدام تقنيات الذكاء الاصطناعي وإنترنت الأشياء.',
    category_id: 1,
    trainer_id: 2,
    cover_image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
    start_date: '2026-08-20',
    end_date: '2026-08-23',
    duration: '3 أيام متواصلة',
    location_type: 'offline',
    location_name: 'مركز معارض دايكو للتقنية - الرياض',
    seats_total: 200,
    seats_remaining: 68,
    price: 0.00,
    status: 'published',
    objectives: ['تطوير نماذج عمل تقنية أولية قابلة للتمويل خلال 72 ساعة.', 'تعزيز التعاون والعمل الجماعي والتبادل المعرفي بين الكوادر التقنية.', 'الفوز بجوائز نقدية تصل قيمتها إلى 100,000 ريال سعودي.'],
    requirements: ['التسجيل كفرد أو كفريق (من 3 إلى 5 أعضاء).', 'شغف بالتقنية والابتكار وتقديم فكرة فريدة.'],
    skills: ['بناء النماذج الأولية Prototyping', 'العرض أمام المستثمرين Pitching', 'تصميم الأفكار الإبداعية'],
    schedule: [
      { week: 'اليوم الأول', topic: 'الافتتاح، استعراض التحديات وتشكيل الفرق النهائية وبدء التطوير' },
      { week: 'اليوم الثاني', topic: 'جلسات إرشاد وتوجيه تقني مكثف واستمرار العمل البرمجي' },
      { week: 'اليوم الثالث', topic: 'تسليم المشاريع، العرض أمام لجنة التحكيم وحفل توزيع الجوائز' }
    ],
    faqs: [
      { question: 'هل الإقامة والأكل مؤمنة؟', answer: 'نعم، نوفر بيئة عمل مريحة جداً تشمل الوجبات الخفيفة والقهوة وأماكن للاستراحة طوال فترة الهاكاثون.' }
    ]
  },

  // Workshops (ورش عمل)
  {
    id: 5,
    type: 'workshop',
    title: 'ورشة عمل تفاعلية لتصميم واجهات وتجربة المستخدم Figma',
    description: 'ورشة عمل تطبيقية عملية تركز على استخدام أداة Figma العالمية لتصميم واجهات مستخدم جذابة ومتجاوبة وفهم أساسيات تجربة المستخدم وكيفية عمل النماذج التفاعلية للعملاء.',
    category_id: 4,
    trainer_id: 1,
    cover_image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
    start_date: '2026-07-10',
    end_date: '2026-07-11',
    duration: '8 ساعات (يومين)',
    location_type: 'online',
    location_name: 'بث مباشر تفاعلي عبر Figma & Zoom',
    seats_total: 40,
    seats_remaining: 12,
    price: 99.00,
    status: 'published',
    objectives: ['إتقان العمل بـ Figma وأدوات التصميم المتجاوب Auto Layout.', 'بناء مكتبة مكونات (Design System) مصغرة قابلة للتكرار.', 'عمل نموذج أولي تفاعلي للواجهات واختباره.'],
    requirements: ['جهاز كمبيوتر محمول وحساب مجاني على منصة Figma.'],
    skills: ['تصميم واجهات المستخدم UI', 'تصميم وتخطيط تجربة المستخدم UX', 'بناء النماذج Figma Prototyping'],
    schedule: [
      { week: 'اليوم الأول', topic: 'مفاهيم تجربة المستخدم وتأسيس واجهات تطبيق الهاتف والـ Wireframes' },
      { week: 'اليوم الثاني', topic: 'التصميم المرئي، الألوان والخطوط، وبناء التفاعل الحركي Prototype' }
    ],
    faqs: [
      { question: 'هل يتم تسجيل اللقاءات؟', answer: 'نعم، نوفر لك إمكانية مراجعة الفيديوهات المسجلة لـ 3 أشهر بعد الورشة.' }
    ]
  }
];

const SEED_REGISTRATIONS = [
  { id: 1, user_id: 3, program_type: 'course', program_id: 1, status: 'completed', registered_at: '2026-03-01' },
  { id: 2, user_id: 3, program_type: 'course', program_id: 2, status: 'approved', registered_at: '2026-06-15' }
];

const SEED_CERTIFICATES = [
  {
    id: 1,
    user_id: 3,
    registration_id: 1,
    event_id: 1,
    certificate_code: 'CERT-DAICO-2026-778',
    issued_at: '2026-04-15',
    qr_hash: 'daico_verify_cert_2026_778'
  }
];

const SEED_NOTIFICATIONS = [
  { id: 1, user_id: 3, title: 'تهانينا! تم قبول تسجيلك', message: 'تمت الموافقة على انضمامك لدورة "مطور الويب المتكامل باستخدام Laravel & Next.js". نراكم قريباً!', is_read: false, created_at: '2026-06-16 10:00' },
  { id: 2, user_id: 3, title: 'شهادة رقمية بانتظارك', message: 'تم إصدار شهادة إتمام دورة "مطور الويب المتكامل باستخدام Laravel & Next.js" بنجاح. يمكنك تحميلها الآن.', is_read: true, created_at: '2026-04-15 14:30' }
];

const SEED_SETTINGS = [
  { key: 'site_name_ar', value: 'منصة دايكو للتعليم والابتكار' },
  { key: 'contact_email', value: 'info@daico.edu.sa' },
  { key: 'contact_phone', value: '+966 11 400 9000' }
];

const SEED_HOMEPAGE = {
  section_name: 'homepage_data',
  content_data: {
    hero: {
      badge: 'المنصة الأولى للابتكار الرقمي بالمملكة',
      title: 'اصنع مستقبل التقنية معنا في منصة دايكو',
      desc: 'نوفر لك أفضل المعسكرات، الورش والبرامج التدريبية المتقدمة في هندسة البرمجيات، الأمن السيبراني والذكاء الاصطناعي بقيادة نخبة من الخبراء التقنيين.'
    },
    stats: {
      students: '12,500+',
      courses: '140+',
      trainers: '25+',
      employment_rate: '94%'
    }
  }
};

// Database Engine Object
const DB = {
  init() {
    if (!localStorage.getItem(DB_KEY_PREFIX + 'initialized')) {
      this.reset();
    }
  },

  reset() {
    this.writeTable('roles', SEED_ROLES);
    this.writeTable('users', SEED_USERS);
    this.writeTable('categories', SEED_CATEGORIES);
    this.writeTable('trainers', SEED_TRAINERS);
    this.writeTable('events', SEED_EVENTS);
    this.writeTable('registrations', SEED_REGISTRATIONS);
    this.writeTable('certificates', SEED_CERTIFICATES);
    this.writeTable('notifications', SEED_NOTIFICATIONS);
    this.writeTable('settings', SEED_SETTINGS);
    this.writeTable('homepage', SEED_HOMEPAGE);
    
    localStorage.setItem(DB_KEY_PREFIX + 'initialized', 'true');
  },

  readTable(tableName) {
    const data = localStorage.getItem(DB_KEY_PREFIX + tableName);
    return data ? JSON.parse(data) : [];
  },

  writeTable(tableName, data) {
    localStorage.setItem(DB_KEY_PREFIX + tableName, JSON.stringify(data));
  },

  select(tableName, filters = {}) {
    const table = this.readTable(tableName);
    return table.filter(item => {
      for (let key in filters) {
        if (item[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
  },

  selectOne(tableName, filters = {}) {
    const results = this.select(tableName, filters);
    return results.length > 0 ? results[0] : null;
  },

  insert(tableName, record) {
    const table = this.readTable(tableName);
    
    // Auto increment logic
    let nextId = 1;
    if (table.length > 0) {
      const ids = table.map(t => t.id).filter(id => typeof id === 'number');
      if (ids.length > 0) {
        nextId = Math.max(...ids) + 1;
      }
    }
    
    const newRecord = { id: nextId, ...record };
    table.push(newRecord);
    this.writeTable(tableName, table);
    return newRecord;
  },

  update(tableName, id, updatedData) {
    const table = this.readTable(tableName);
    const index = table.findIndex(item => item.id === id);
    if (index !== -1) {
      table[index] = { ...table[index], ...updatedData };
      this.writeTable(tableName, table);
      return table[index];
    }
    return null;
  },

  delete(tableName, id) {
    const table = this.readTable(tableName);
    const filtered = table.filter(item => item.id !== id);
    if (table.length !== filtered.length) {
      this.writeTable(tableName, filtered);
      return true;
    }
    return false;
  }
};

// Initialize DB immediately on load
DB.init();

window.DAICO_DB = DB;
