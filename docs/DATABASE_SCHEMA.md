# Database Schema & Relational Design

This document details the relational database design for the **DAICO** platform, including tables, data types, primary/foreign keys, constraints, indexes, and relationships.

---

## 1. Entity Relationship (ER) Summary

The following entity relationships define the core flow of the system:
*   **Users** have one **Role** (Many-to-One / Role-Based access control).
*   **Categories** contain multiple **Courses, Bootcamps, Workshops, and Hackathons** (One-to-Many).
*   **Trainers** teach multiple **Courses, Bootcamps, Workshops, and Hackathons** (One-to-Many).
*   **Users** register for events via **Registrations** (Many-to-Many through a junction table).
*   **Registrations** can produce **Certificates** upon completion (One-to-One).
*   **Users** write **Reviews** for completed events (Many-to-One).
*   **Users** receive multiple **Notifications** (One-to-Many).

---

## 2. Table Schemas

### 2.1 Table: `roles`
Stores role classifications for permissions.

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique role ID |
| `name` | VARCHAR(50) | UNIQUE, NOT NULL | Role name (e.g., 'super_admin', 'admin', 'user') |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date role was created |

*   **Indexes:**
    *   `idx_roles_name` ON `name` (for fast security access lookup)

---

### 2.2 Table: `users`
Stores user profile credentials and role association.

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique user ID |
| `name` | VARCHAR(150) | NOT NULL | User's full name (Arabic/English support) |
| `email` | VARCHAR(191) | UNIQUE, NOT NULL | User's email |
| `password_hash` | VARCHAR(255) | NOT NULL | Securely hashed password (bcrypt) |
| `role_id` | INT | FOREIGN KEY references `roles(id)` | User's current role |
| `email_verified_at`| TIMESTAMP | NULLABLE | Email verification timestamp |
| `remember_token` | VARCHAR(100) | NULLABLE | Session persistence token |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Registration date |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last profile update |

*   **Foreign Keys:**
    *   `fk_users_role` (role_id) REFERENCES `roles(id)` ON DELETE RESTRICT
*   **Indexes:**
    *   `idx_users_email` ON `email` (login lookup optimization)
    *   `idx_users_role` ON `role_id`

---

### 2.3 Table: `trainers`
Stores profile details, bio, and social links of trainers.

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique trainer ID |
| `user_id` | BIGINT | FOREIGN KEY references `users(id)` | Associated user account (optional) |
| `name` | VARCHAR(150) | NOT NULL | Trainer's full name |
| `photo_url` | VARCHAR(255) | NULLABLE | Link to profile photo |
| `title` | VARCHAR(100) | NOT NULL | Job title (e.g. 'Senior UI/UX Designer') |
| `bio` | TEXT | NOT NULL | Arabic biography |
| `experience_years` | INT | NOT NULL | Years of active training experience |
| `specializations` | JSON | NOT NULL | List of tags (e.g., ["React", "Laravel"]) |
| `certificates` | JSON | NULLABLE | Professional certifications |
| `social_links` | JSON | NULLABLE | Social media urls (LinkedIn, Twitter, Github) |
| `rating` | DECIMAL(3,2) | DEFAULT 5.00 | Weighted student rating |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record created |

*   **Foreign Keys:**
    *   `fk_trainers_user` (user_id) REFERENCES `users(id)` ON DELETE SET NULL

---

### 2.4 Table: `categories`
Categorizes courses, bootcamps, workshops, and hackathons.

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique category ID |
| `name_ar` | VARCHAR(100) | NOT NULL | Category name in Arabic (e.g., 'البرمجة') |
| `name_en` | VARCHAR(100) | NOT NULL | Category name in English (e.g., 'Programming') |
| `slug` | VARCHAR(100) | UNIQUE, NOT NULL | SEO URL slug |

---

### 2.5 Dynamic Program Tables
All program entities (Courses, Bootcamps, Workshops, Hackathons) are structured as follows. They reference a specific category and trainer. We design them as individual relational tables to accommodate custom metadata fields for each program type.

#### Table: `courses`
| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique course ID |
| `title` | VARCHAR(200) | NOT NULL | Course title |
| `description` | TEXT | NOT NULL | Full description |
| `category_id` | INT | FOREIGN KEY references `categories(id)` | Category reference |
| `trainer_id` | BIGINT | FOREIGN KEY references `trainers(id)` | Primary trainer |
| `cover_image` | VARCHAR(255) | NOT NULL | Path/URL to header image |
| `start_date` | DATE | NOT NULL | Date course begins |
| `end_date` | DATE | NOT NULL | Date course ends |
| `duration_hours` | INT | NOT NULL | Total length in hours |
| `location_type` | ENUM('online', 'offline') | NOT NULL | Where course is held |
| `seats_total` | INT | NOT NULL | Total seats capacity |
| `seats_remaining` | INT | NOT NULL | Remaining seats |
| `price` | DECIMAL(10,2) | DEFAULT 0.00 | Registration cost (0.00 = free) |
| `status` | ENUM('draft', 'published', 'cancelled') | DEFAULT 'draft' | Publishing state |
| `objectives` | JSON | NOT NULL | Learning goals array |
| `requirements` | JSON | NOT NULL | Course prerequisites |
| `skills_acquired`| JSON | NOT NULL | Expected outcomes |
| `schedule` | JSON | NOT NULL | Weekly outline/milestones |
| `faqs` | JSON | NULLABLE | Frequently Asked Questions |

*   **Foreign Keys:**
    *   `fk_courses_category` (category_id) REFERENCES `categories(id)` ON DELETE RESTRICT
    *   `fk_courses_trainer` (trainer_id) REFERENCES `trainers(id)` ON DELETE RESTRICT
*   **Indexes:**
    *   `idx_courses_status` ON `status`
    *   `idx_courses_dates` ON (`start_date`, `end_date`)

*(Note: The tables `bootcamps`, `workshops`, and `hackathons` follow an identical relational format with category/trainer foreign keys, but may have custom attributes like hackathon prize pools or bootcamp mentors. To optimize, they can share these fields or reference structural tables.)*

---

### 2.6 Table: `registrations`
Junction table tracking user enrollments in programs.

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Registration ID |
| `user_id` | BIGINT | FOREIGN KEY references `users(id)` | Registering student |
| `program_type` | ENUM('course', 'bootcamp', 'workshop', 'hackathon') | NOT NULL | Type of event enrolled |
| `program_id` | BIGINT | NOT NULL | ID in corresponding program table |
| `status` | ENUM('pending', 'approved', 'cancelled', 'completed') | DEFAULT 'pending' | Enrollee status |
| `registered_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date of registration |

*   **Foreign Keys:**
    *   `fk_registrations_user` (user_id) REFERENCES `users(id)` ON DELETE CASCADE
*   **Indexes:**
    *   `idx_registrations_lookup` ON (`user_id`, `program_type`, `program_id`)

---

### 2.7 Table: `certificates`
Stores details of generated certificates.

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | BIGINT | FOREIGN KEY references `users(id)` | Recipient user |
| `registration_id` | BIGINT | FOREIGN KEY references `registrations(id)` | Originating registration |
| `certificate_code`| VARCHAR(100) | UNIQUE, NOT NULL | Unique serial identifier (e.g. CERT-DAICO-2026-99) |
| `issued_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Timestamp of issuance |
| `qr_hash` | VARCHAR(255) | UNIQUE, NOT NULL | Secure verification token |

*   **Foreign Keys:**
    *   `fk_certificates_user` (user_id) REFERENCES `users(id)` ON DELETE CASCADE
    *   `fk_certificates_reg` (registration_id) REFERENCES `registrations(id)` ON DELETE CASCADE

---

### 2.8 Table: `reviews`
Stores feedback ratings left by students on courses/trainers.

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Review ID |
| `user_id` | BIGINT | FOREIGN KEY references `users(id)` | Reviewer |
| `program_type` | ENUM('course', 'bootcamp', 'workshop', 'hackathon') | NOT NULL | Type of event reviewed |
| `program_id` | BIGINT | NOT NULL | Event ID |
| `trainer_id` | BIGINT | FOREIGN KEY references `trainers(id)` | Trainer ID being reviewed |
| `rating` | INT | CHECK (rating BETWEEN 1 AND 5) | Star rating (1-5) |
| `comment` | TEXT | NULLABLE | Feedback text |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Timestamp |

*   **Foreign Keys:**
    *   `fk_reviews_user` (user_id) REFERENCES `users(id)` ON DELETE CASCADE
    *   `fk_reviews_trainer` (trainer_id) REFERENCES `trainers(id)` ON DELETE CASCADE

---

### 2.9 Table: `notifications`
Stores transactional notifications sent to users.

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Notification ID |
| `user_id` | BIGINT | FOREIGN KEY references `users(id)` | Recipient user |
| `title` | VARCHAR(150) | NOT NULL | Alert title |
| `message` | TEXT | NOT NULL | Alert message content |
| `is_read` | BOOLEAN | DEFAULT FALSE | Read state indicator |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation time |

*   **Foreign Keys:**
    *   `fk_notifications_user` (user_id) REFERENCES `users(id)` ON DELETE CASCADE
*   **Indexes:**
    *   `idx_notifications_unread` ON (`user_id`, `is_read`)

---

### 2.10 Table: `settings`
Stores global application settings.

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `key` | VARCHAR(100) | PRIMARY KEY | Configuration lookup key (e.g. 'site_name_ar') |
| `value` | TEXT | NOT NULL | Config value |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last modified |

---

### 2.11 Table: `homepage_content`
Manages landing page sections (hero slider, stat nodes, partner logos).

| Column Name | Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `section_name` | VARCHAR(100) | PRIMARY KEY | Hero, About, Stats, Testimonials, Partners |
| `content_data` | JSON | NOT NULL | Dynamic structured configuration of visual contents |
| `updated_by` | BIGINT | FOREIGN KEY references `users(id)` | Admin user modifying the content |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last edit time |
