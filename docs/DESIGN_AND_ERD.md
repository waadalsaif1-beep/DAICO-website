# Entity Relationship Diagram (ERD) & UI Wireframes

This document details the visual ER diagram (using Mermaid.js notation) and the interface wireframes for the **DAICO** web platform.

---

## 1. Entity Relationship Diagram (ERD)

The following Mermaid diagram models the relational tables, keys, fields, and constraints of the DAICO database.

```mermaid
erDiagram
    roles ||--o{ users : "assigns permissions to"
    users ||--o{ trainers : "can be associated with"
    users ||--o{ registrations : "registers for programs via"
    users ||--o{ notifications : "receives"
    users ||--o{ reviews : "writes"
    categories ||--o{ events : "groups"
    trainers ||--o{ events : "instructs / conducts"
    events ||--o{ registrations : "has enrollees via"
    registrations ||--o| certificates : "can generate"

    roles {
        int id PK
        string name "unique"
        timestamp created_at
    }

    users {
        bigint id PK
        string name
        string email "unique"
        string password_hash
        int role_id FK
        timestamp email_verified_at
        string remember_token
        timestamp created_at
    }

    trainers {
        bigint id PK
        bigint user_id FK
        string name
        string photo_url
        string title
        text bio
        int experience_years
        json specializations
        json certificates
        json social_links
        decimal rating
        timestamp created_at
    }

    categories {
        int id PK
        string name_ar
        string name_en
        string slug "unique"
    }

    events {
        bigint id PK
        string type "course|bootcamp|workshop|hackathon"
        string title
        text description
        int category_id FK
        bigint trainer_id FK
        string cover_image
        date start_date
        date end_date
        string duration
        string location_type "online|offline"
        string location_name
        int seats_total
        int seats_remaining
        decimal price
        string status "draft|published|cancelled"
        json objectives
        json requirements
        json skills
        json schedule
        json faqs
    }

    registrations {
        bigint id PK
        bigint user_id FK
        string program_type "course|bootcamp|workshop|hackathon"
        bigint program_id FK
        string status "pending|approved|completed|cancelled"
        timestamp registered_at
    }

    certificates {
        bigint id PK
        bigint user_id FK
        bigint registration_id FK
        bigint event_id FK
        string certificate_code "unique"
        timestamp issued_at
        string qr_hash "unique"
    }

    reviews {
        bigint id PK
        bigint user_id FK
        string program_type
        bigint program_id FK
        bigint trainer_id FK
        int rating
        text comment
        timestamp created_at
    }

    notifications {
        bigint id PK
        bigint user_id FK
        string title
        text message
        boolean is_read
        timestamp created_at
    }

    settings {
        string key PK
        text value
        timestamp updated_at
    }
```

---

## 2. UI Wireframes

Below are the layout wireframes representing the core user flows.

### 2.1 Wireframe: Homepage (`index.html`)
```
+-----------------------------------------------------------------------------------+
| [Logo] DAICO               (About)  (Programs)  (Trainers)  [Light/Dark] [Login]  |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                      [Badge: The First Innovation Academy]                        |
|                  Vibrant Title: Shape the Future of Tech With Us                  |
|          Description: Join advanced bootcamps, workshops, and hackathons...       |
|                                                                                   |
|                           [Browse Programs]  [About Us]                           |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  [ 12,500+ Students ]   [ 140+ Courses ]   [ 25+ Experts ]   [ 94% Hired ]        |
+-----------------------------------------------------------------------------------+
|  FEATURED PROGRAMS:                                                               |
|  [All]  [Courses]  [Bootcamps]  [Hackathons]  [Workshops]                         |
|                                                                                   |
|  +--------------------+  +--------------------+  +--------------------+           |
|  | [Image] [Bootcamp] |  | [Image] [Course]   |  | [Image] [Workshop] |           |
|  | Title: CyberSec    |  | Title: Laravel/Next|  | Title: Figma UI/UX |           |
|  | Date | Price: 1500 |  | Date | Price: Free |  | Date | Price: 99   |           |
|  | Trainer Info       |  | Trainer Info       |  | Trainer Info       |           |
|  | [Details & Register]|  | [Details & Register]|  | [Details & Register]|          |
|  +--------------------+  +--------------------+  +--------------------+           |
+-----------------------------------------------------------------------------------+
|  FAQS SECTION (Accordions):                                                       |
|  > Q: How do I enroll in free courses?                                            |
|  > Q: Are certificates accredited and verified?                                   |
+-----------------------------------------------------------------------------------+
|  CONTACT FORM:                                                                    |
|  Name:    [                    ]      Address Details:                            |
|  Email:   [                    ]      Email: info@daico.edu.sa                    |
|  Message: [                    ]      Phone: +966 11 400 9000                     |
|           [Submit Message]                                                        |
+-----------------------------------------------------------------------------------+
| © 2026 DAICO. All rights reserved.                   Made Proudly in Saudi Arabia |
+-----------------------------------------------------------------------------------+
```

---

### 2.2 Wireframe: Auth Screen (`login.html` / `register.html`)
```
+----------------------------------------------------------+
|                        DAICO LOGO                        |
|                       Secure Login                       |
|           Please enter credentials to continue.          |
+----------------------------------------------------------+
|  [Alert Message Box - Success / Error]                   |
|                                                          |
|  Email:                                                  |
|  [ student@daico.edu.sa                                ] |
|                                                          |
|  Password:                                               |
|  [ ••••••••••••••••                                    ] |
|                                                          |
|  [x] Remember me                        Forgot Password? |
|                                                          |
|  [               Secure Submit Log In                  ] |
+----------------------------------------------------------+
|  Don't have an account? Sign Up   |  <- Go back to Home  |
+----------------------------------------------------------+
```

---

### 2.3 Wireframe: User Dashboard (`user/index.html`)
```
+------------------+----------------------------------------------------------------+
| DAICO ACADEMY    | Welcome, Student Name!                              [Notif] [T]|
+------------------+----------------------------------------------------------------+
| (Active Options) | BROWSE TRAINING PROGRAMS                                       |
|                  |                                                                |
| * Browse events  | [Courses]  [Bootcamps]  [Hackathons]  [Workshops]              |
| * Enrolled Logs  |                                                                |
|                  | [ Search Input... ] [Category Select] [Location] [Free/Paid]   |
|                  |                                                                |
| 👤 Student       | +--------------------+ +--------------------+ +----------------+ |
| [Log Out]        | | [Image]            | | [Image]            | | [Image]        | |
|                  | | Title: CyberSec    | | Title: Next.js API | | Title: UX/UI   | |
|                  | | Free | Zoom        | | 400 SAR | Hybrid   | | Free | Zoom    | |
|                  | | [Details Modal]    | | [Details Modal]    | | [Details Modal]| |
|                  | +--------------------+ +--------------------+ +----------------+ |
+------------------+----------------------------------------------------------------+
```

#### Detailed Event Modal View:
```
+-----------------------------------------------------------------------------------+
| [X] Detailed Program: Next.js API & Laravel Integration                           |
+-----------------------------------------------------------------------------------+
|  [==== Cover Image Header ====]                                                   |
|                                                                                   |
|  Description: Complete core training on RESTful APIs ...                          |
|                                                                                   |
|  Objectives:                  Requirements:              Session Parameters:       |
|  * Build Laravel APIs         * JavaScript Basics        * Length: 40 Hours        |
|  * Client-side Query hooks    * Database foundations     * Seats: 12 left / 50     |
|                                                          * Price: 499 SAR          |
|  Schedule Outline:            Skills Acquired:           * Place: Online (Zoom)    |
|  * W1: Laravel API structure  [Laravel] [Next.js]                                 |
|  * W2: React state hooks                                                          |
|                                                          Trainer Information:      |
|  FAQs:                                                   [Photo] Khaled Al-Harbi   |
|  * Q: Are sessions recorded?                             Senior Architect (12y)    |
|    A: Yes, uploaded next day.                            "Expert in system design."|
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                            [ Register Seat Now ]                            |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

### 2.4 Wireframe: Admin Dashboard (`admin/index.html`)
```
+------------------+----------------------------------------------------------------+
| DAICO CONTROL    | Welcome Admin, Sara Al-Otaibi                       [Notif] [T]|
+------------------+----------------------------------------------------------------+
| * Analytics Stats| ANALYTICS WIDGETS                                              |
| * Programs CRUD  | [ Total Users: 1,420 ]             [ Active Programs: 15 ]     |
| * Registrations  | [ Total Enrollments: 450 ]         [ Active Trainers: 3 ]      |
| * Users & Rights |                                                                |
| * Certificates   | [Export Excel Report]                        [Export PDF Report]|
| * Announcements  |                                                                |
| * Settings Editor| RECENT COMPLETED REGISTRATIONS & ACTIVITY                     |
|                  | +--------------------+--------------------+-------------------+ |
| 👤 Admin         | | Student Name       | Applied Program    | Action Status     | |
| [Log Out]        | +--------------------+--------------------+-------------------+ |
|                  | | Ahmad Al-Malki     | Next.js API        | [Approved]        | |
|                  | | Sara Salem         | Cybersecurity      | [Completed]       | |
|                  | +--------------------+--------------------+-------------------+ |
+------------------+----------------------------------------------------------------+
```
