/**
 * DAICO LocalStorage Relational Database Engine & Seeder
 */

const DB_KEY_PREFIX = 'daico_db_';

const getSeedRoles = () => [
  { id: 1, name: 'super_admin' },
  { id: 2, name: 'admin' },
  { id: 3, name: 'user' }
];

const getSeedUsers = () => [
  { id: 1, name: window.DAICO_I18N.t('db_user_1_name'), email: 'superadmin@daico.edu.sa', password_hash: 'admin123', role_id: 1, verified: true, created_at: '2026-01-01' },
  { id: 2, name: window.DAICO_I18N.t('db_user_2_name'), email: 'admin@daico.edu.sa', password_hash: 'admin123', role_id: 2, verified: true, created_at: '2026-01-10' },
  { id: 3, name: window.DAICO_I18N.t('db_user_3_name'), email: 'student@daico.edu.sa', password_hash: 'student123', role_id: 3, verified: true, created_at: '2026-02-01' }
];

const getSeedCategories = () => [
  { id: 1, name_ar: window.DAICO_I18N.t('db_cat_1'), slug: 'ai-data-science' },
  { id: 2, name_ar: window.DAICO_I18N.t('db_cat_2'), slug: 'software-web-dev' },
  { id: 3, name_ar: window.DAICO_I18N.t('db_cat_3'), slug: 'cybersecurity' },
  { id: 4, name_ar: window.DAICO_I18N.t('db_cat_4'), slug: 'ui-ux-design' }
];

const getSeedTrainers = () => [
  {
    id: 1,
    name: window.DAICO_I18N.t('db_trainer_1_name'),
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    title: window.DAICO_I18N.t('db_trainer_1_title'),
    bio: window.DAICO_I18N.t('db_trainer_1_bio'),
    experience_years: 12,
    specializations: [window.DAICO_I18N.t('db_trainer_1_spec_1'), 'Node.js', 'React/Next.js', 'Laravel'],
    certificates: ['AWS Solution Architect', 'Oracle Java Professional'],
    social_links: { linkedin: '#', twitter: '#', github: '#' },
    rating: 4.9,
    reviews_count: 142
  },
  {
    id: 2,
    name: window.DAICO_I18N.t('db_trainer_2_name'),
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    title: window.DAICO_I18N.t('db_trainer_2_title'),
    bio: window.DAICO_I18N.t('db_trainer_2_bio'),
    experience_years: 8,
    specializations: [window.DAICO_I18N.t('db_trainer_2_spec_1'), window.DAICO_I18N.t('db_trainer_2_spec_2'), window.DAICO_I18N.t('db_trainer_2_spec_3'), 'Python'],
    certificates: ['Stanford Certified AI Professional', 'Google Cloud Data Engineer'],
    social_links: { linkedin: '#', twitter: '#' },
    rating: 4.8,
    reviews_count: 98
  },
  {
    id: 3,
    name: window.DAICO_I18N.t('db_trainer_3_name'),
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
    title: window.DAICO_I18N.t('db_trainer_3_title'),
    bio: window.DAICO_I18N.t('db_trainer_3_bio'),
    experience_years: 9,
    specializations: [window.DAICO_I18N.t('db_trainer_3_spec_1'), window.DAICO_I18N.t('db_trainer_3_spec_2'), window.DAICO_I18N.t('db_trainer_3_spec_3')],
    certificates: ['CEH (Certified Ethical Hacker)', 'CISSP'],
    social_links: { linkedin: '#', github: '#' },
    rating: 4.9,
    reviews_count: 110
  }
];

const getSeedEvents = () => [
  // Courses (كورسات)
  {
    id: 1,
    type: 'course',
    title: window.DAICO_I18N.t('db_event_1_title'),
    description: window.DAICO_I18N.t('db_event_1_desc'),
    category_id: 2,
    trainer_id: 1,
    cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
    start_date: '2026-07-15',
    end_date: '2026-08-30',
    duration: window.DAICO_I18N.t('db_event_1_duration'),
    location_type: 'online',
    location_name: window.DAICO_I18N.t('db_event_1_loc'),
    seats_total: 50,
    seats_remaining: 15,
    price: 499.00,
    status: 'published',
    objectives: [window.DAICO_I18N.t('db_event_1_obj_1'), window.DAICO_I18N.t('db_event_1_obj_2'), window.DAICO_I18N.t('db_event_1_obj_3')],
    requirements: [window.DAICO_I18N.t('db_event_1_req_1'), window.DAICO_I18N.t('db_event_1_req_2')],
    skills: [window.DAICO_I18N.t('db_event_1_skill_1'), 'PHP Laravel API', 'React / Next.js', window.DAICO_I18N.t('db_event_1_skill_2')],
    schedule: [
      { week: window.DAICO_I18N.t('db_event_1_w1'), topic: window.DAICO_I18N.t('db_event_1_t1') },
      { week: window.DAICO_I18N.t('db_event_1_w2'), topic: window.DAICO_I18N.t('db_event_1_t2') },
      { week: window.DAICO_I18N.t('db_event_1_w3'), topic: window.DAICO_I18N.t('db_event_1_t3') },
      { week: window.DAICO_I18N.t('db_event_1_w4'), topic: window.DAICO_I18N.t('db_event_1_t4') }
    ],
    faqs: [
      { question: window.DAICO_I18N.t('db_event_1_q1'), answer: window.DAICO_I18N.t('db_event_1_a1') },
      { question: window.DAICO_I18N.t('db_event_1_q2'), answer: window.DAICO_I18N.t('db_event_1_a2') }
    ]
  },
  {
    id: 2,
    type: 'course',
    title: window.DAICO_I18N.t('db_event_2_title'),
    description: window.DAICO_I18N.t('db_event_2_desc'),
    category_id: 1,
    trainer_id: 2,
    cover_image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600',
    start_date: '2026-07-20',
    end_date: '2026-08-10',
    duration: window.DAICO_I18N.t('db_event_2_duration'),
    location_type: 'online',
    location_name: window.DAICO_I18N.t('db_event_2_loc'),
    seats_total: 100,
    seats_remaining: 42,
    price: 0.00, // Free
    status: 'published',
    objectives: [window.DAICO_I18N.t('db_event_2_obj_1'), window.DAICO_I18N.t('db_event_2_obj_2'), window.DAICO_I18N.t('db_event_2_obj_3')],
    requirements: [window.DAICO_I18N.t('db_event_2_req_1')],
    skills: [window.DAICO_I18N.t('db_event_2_skill_1'), 'OpenAI APIs Integration', window.DAICO_I18N.t('db_event_2_skill_2')],
    schedule: [
      { week: window.DAICO_I18N.t('db_event_1_w1'), topic: window.DAICO_I18N.t('db_event_2_t1') },
      { week: window.DAICO_I18N.t('db_event_1_w2'), topic: window.DAICO_I18N.t('db_event_2_t2') },
      { week: window.DAICO_I18N.t('db_event_1_w3'), topic: window.DAICO_I18N.t('db_event_2_t3') }
    ],
    faqs: [
      { question: window.DAICO_I18N.t('db_event_2_q1'), answer: window.DAICO_I18N.t('db_event_2_a1') }
    ]
  },

  // Bootcamps (معسكرات)
  {
    id: 3,
    type: 'bootcamp',
    title: window.DAICO_I18N.t('db_event_3_title'),
    description: window.DAICO_I18N.t('db_event_3_desc'),
    category_id: 3,
    trainer_id: 3,
    cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
    start_date: '2026-08-01',
    end_date: '2026-09-15',
    duration: window.DAICO_I18N.t('db_event_3_duration'),
    location_type: 'offline',
    location_name: window.DAICO_I18N.t('db_event_3_loc'),
    seats_total: 25,
    seats_remaining: 4,
    price: 1500.00,
    status: 'published',
    objectives: [window.DAICO_I18N.t('db_event_3_obj_1'), window.DAICO_I18N.t('db_event_3_obj_2'), window.DAICO_I18N.t('db_event_3_obj_3')],
    requirements: [window.DAICO_I18N.t('db_event_3_req_1'), window.DAICO_I18N.t('db_event_3_req_2')],
    skills: [window.DAICO_I18N.t('db_event_3_skill_1'), window.DAICO_I18N.t('db_event_3_skill_2'), window.DAICO_I18N.t('db_event_3_skill_3')],
    schedule: [
      { week: window.DAICO_I18N.t('db_event_3_w1'), topic: window.DAICO_I18N.t('db_event_3_t1') },
      { week: window.DAICO_I18N.t('db_event_3_w2'), topic: window.DAICO_I18N.t('db_event_3_t2') },
      { week: window.DAICO_I18N.t('db_event_3_w3'), topic: window.DAICO_I18N.t('db_event_3_t3') }
    ],
    faqs: [
      { question: window.DAICO_I18N.t('db_event_3_q1'), answer: window.DAICO_I18N.t('db_event_3_a1') }
    ]
  },

  // Hackathons (هاكاثونات)
  {
    id: 4,
    type: 'hackathon',
    title: window.DAICO_I18N.t('db_event_4_title'),
    description: window.DAICO_I18N.t('db_event_4_desc'),
    category_id: 1,
    trainer_id: 2,
    cover_image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
    start_date: '2026-08-20',
    end_date: '2026-08-23',
    duration: window.DAICO_I18N.t('db_event_4_duration'),
    location_type: 'offline',
    location_name: window.DAICO_I18N.t('db_event_4_loc'),
    seats_total: 200,
    seats_remaining: 68,
    price: 0.00,
    status: 'published',
    objectives: [window.DAICO_I18N.t('db_event_4_obj_1'), window.DAICO_I18N.t('db_event_4_obj_2'), window.DAICO_I18N.t('db_event_4_obj_3')],
    requirements: [window.DAICO_I18N.t('db_event_4_req_1'), window.DAICO_I18N.t('db_event_4_req_2')],
    skills: [window.DAICO_I18N.t('db_event_4_skill_1'), window.DAICO_I18N.t('db_event_4_skill_2'), window.DAICO_I18N.t('db_event_4_skill_3')],
    schedule: [
      { week: window.DAICO_I18N.t('db_event_4_w1'), topic: window.DAICO_I18N.t('db_event_4_t1') },
      { week: window.DAICO_I18N.t('db_event_4_w2'), topic: window.DAICO_I18N.t('db_event_4_t2') },
      { week: window.DAICO_I18N.t('db_event_4_w3'), topic: window.DAICO_I18N.t('db_event_4_t3') }
    ],
    faqs: [
      { question: window.DAICO_I18N.t('db_event_4_q1'), answer: window.DAICO_I18N.t('db_event_4_a1') }
    ]
  },

  // Workshops (ورش عمل)
  {
    id: 5,
    type: 'workshop',
    title: window.DAICO_I18N.t('db_event_5_title'),
    description: window.DAICO_I18N.t('db_event_5_desc'),
    category_id: 4,
    trainer_id: 1,
    cover_image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
    start_date: '2026-07-10',
    end_date: '2026-07-11',
    duration: window.DAICO_I18N.t('db_event_5_duration'),
    location_type: 'online',
    location_name: window.DAICO_I18N.t('db_event_5_loc'),
    seats_total: 40,
    seats_remaining: 12,
    price: 99.00,
    status: 'published',
    objectives: [window.DAICO_I18N.t('db_event_5_obj_1'), window.DAICO_I18N.t('db_event_5_obj_2'), window.DAICO_I18N.t('db_event_5_obj_3')],
    requirements: [window.DAICO_I18N.t('db_event_5_req_1')],
    skills: [window.DAICO_I18N.t('db_event_5_skill_1'), window.DAICO_I18N.t('db_event_5_skill_2'), window.DAICO_I18N.t('db_event_5_skill_3')],
    schedule: [
      { week: window.DAICO_I18N.t('db_event_5_w1'), topic: window.DAICO_I18N.t('db_event_5_t1') },
      { week: window.DAICO_I18N.t('db_event_5_w2'), topic: window.DAICO_I18N.t('db_event_5_t2') }
    ],
    faqs: [
      { question: window.DAICO_I18N.t('db_event_5_q1'), answer: window.DAICO_I18N.t('db_event_5_a1') }
    ]
  }
];

const getSeedRegistrations = () => [
  { id: 1, user_id: 3, program_type: 'course', program_id: 1, status: 'completed', registered_at: '2026-03-01' },
  { id: 2, user_id: 3, program_type: 'course', program_id: 2, status: 'approved', registered_at: '2026-06-15' }
];

const getSeedCertificates = () => [
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

const getSeedNotifications = () => [
  { id: 1, user_id: 3, title: window.DAICO_I18N.t('db_notif_1_title'), message: window.DAICO_I18N.t('db_notif_1_msg'), is_read: false, created_at: '2026-06-16 10:00' },
  { id: 2, user_id: 3, title: window.DAICO_I18N.t('db_notif_2_title'), message: window.DAICO_I18N.t('db_notif_2_msg'), is_read: true, created_at: '2026-04-15 14:30' }
];

const getSeedSettings = () => [
  { key: 'site_name_ar', value: window.DAICO_I18N.t('db_site_name') },
  { key: 'contact_email', value: 'info@daico.edu.sa' },
  { key: 'contact_phone', value: '+966 11 400 9000' }
];

const getSeedHomepage = () => [
  {
    section_name: 'homepage_data',
    content_data: {
      hero: {
        badge: window.DAICO_I18N.t('db_home_badge'),
        title: window.DAICO_I18N.t('db_home_title'),
        desc: window.DAICO_I18N.t('db_home_desc')
      },
      stats: {
        students: '12,500+',
        courses: '140+',
        trainers: '25+',
        employment_rate: '94%'
      }
    }
  }
];

// Database Engine Object
const DB = {
  init() {
    const homepageData = localStorage.getItem(DB_KEY_PREFIX + 'homepage');
    const needsReset = homepageData && !homepageData.startsWith('[');
    
    if (!localStorage.getItem(DB_KEY_PREFIX + 'initialized') || needsReset) {
      this.reset();
    }
  },

  reset() {
    this.writeTable('roles', getSeedRoles());
    this.writeTable('users', getSeedUsers());
    this.writeTable('categories', getSeedCategories());
    this.writeTable('trainers', getSeedTrainers());
    this.writeTable('events', getSeedEvents());
    this.writeTable('registrations', getSeedRegistrations());
    this.writeTable('certificates', getSeedCertificates());
    this.writeTable('notifications', getSeedNotifications());
    this.writeTable('settings', getSeedSettings());
    this.writeTable('homepage', getSeedHomepage());
    
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

window.DAICO_DB = DB;
