# DAICO REST API Specification

This document details the REST API endpoints designed for the **DAICO** web platform, outlining the request headers, parameters, and JSON payloads.

---

## 1. Global Specifications

*   **Base URL:** `/api/v1`
*   **Content-Type:** `application/json`
*   **Authorization Header:** `Bearer <JWT_TOKEN>` (Required for all routes unless marked "Public")

---

## 2. Authentication Endpoints

### 2.1 Post User Login (Public)
Authenticate credentials and return session token.

*   **URL:** `POST /auth/login`
*   **Request Body:**
```json
{
  "email": "student@daico.edu.sa",
  "password": "Password123"
}
```
*   **Response (200 OK):**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 4,
    "name": "أحمد المالكي",
    "email": "student@daico.edu.sa",
    "role": "user",
    "verified": true
  }
}
```

---

### 2.2 Register User (Public)
Register a new user account.

*   **URL:** `POST /auth/register`
*   **Request Body:**
```json
{
  "name": "سارة القحطاني",
  "email": "sara@daico.edu.sa",
  "password": "Password123",
  "password_confirmation": "Password123"
}
```
*   **Response (201 Created):**
```json
{
  "status": "success",
  "message": "User registered successfully. Please verify your email.",
  "user_id": 12
}
```

---

## 3. Events Management (Courses, Bootcamps, etc.)

### 3.1 Get Events (Public)
Retrieve a list of filtered programs.

*   **URL:** `GET /events`
*   **Parameters:**
    *   `type`: `course` \| `bootcamp` \| `workshop` \| `hackathon` (Optional)
    *   `category_id`: integer (Optional)
    *   `location_type`: `online` \| `offline` (Optional)
    *   `price`: `free` \| `paid` (Optional)
    *   `q`: search string (Optional)
*   **Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "type": "course",
      "title": "مطور واجهات المستخدم المتقدم",
      "category": "تطوير الويب",
      "trainer_name": "م. خالد الحربي",
      "start_date": "2026-07-15",
      "seats_remaining": 12,
      "price": 0.00,
      "location_type": "online"
    }
  ]
}
```

---

### 3.2 Get Event Details (Public)
Retrieve full parameters of a single course, bootcamp, workshop, or hackathon.

*   **URL:** `GET /events/:id`
*   **Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "type": "course",
    "title": "مطور واجهات المستخدم المتقدم",
    "description": "تعلم بناء واجهات ويب احترافية باستخدام تقنيات حديثة...",
    "category": { "id": 2, "name": "تطوير الويب" },
    "trainer": {
      "id": 3,
      "name": "م. خالد الحربي",
      "photo": "/assets/trainers/khaled.jpg",
      "title": "Senior Frontend Architect",
      "bio": "خبير في بناء وتصميم واجهات المستخدم لأكثر من 8 سنوات."
    },
    "start_date": "2026-07-15",
    "end_date": "2026-08-15",
    "duration": "40 ساعة",
    "location_type": "online",
    "seats_total": 50,
    "seats_remaining": 12,
    "price": 0.00,
    "learning_objectives": ["إتقان CSS Grid/Flexbox", "فهم مكونات React الأساسية"],
    "requirements": ["معرفة أساسية بـ HTML"],
    "skills_acquired": ["تطوير الويب HTML/CSS", "أساسيات React"],
    "faqs": [
      { "question": "هل تتوفر شهادة؟", "answer": "نعم، شهادة حضور رقمية معتمدة." }
    ]
  }
}
```

---

### 3.3 Create Event (Admin Only)
Add a new learning event to the catalog.

*   **URL:** `POST /admin/events`
*   **Request Body:**
```json
{
  "type": "workshop",
  "title": "ورشة عمل تصميم تجربة المستخدم UX",
  "description": "ورشة عمل تفاعلية لتصميم تجارب مستخدم مميزة...",
  "category_id": 4,
  "trainer_id": 3,
  "start_date": "2026-08-01",
  "end_date": "2026-08-02",
  "duration": "8 ساعات",
  "location_type": "offline",
  "location_name": "مقر الحاضنة - الرياض",
  "seats_total": 20,
  "price": 150.00,
  "status": "published"
}
```
*   **Response (201 Created):**
```json
{
  "status": "success",
  "message": "Event created and published successfully.",
  "event_id": 28
}
```

---

### 3.4 Update Event (Admin Only)
Modify an existing event.

*   **URL:** `PUT /admin/events/:id`
*   **Request Body:**
```json
{
  "seats_total": 30,
  "price": 120.00
}
```
*   **Response (200 OK):**
```json
{
  "status": "success",
  "message": "Event modified successfully."
}
```

---

### 3.5 Delete Event (Admin Only)
Delete or archive an event record.

*   **URL:** `DELETE /admin/events/:id`
*   **Response (200 OK):**
```json
{
  "status": "success",
  "message": "Event deleted successfully."
}
```

---

## 4. User Registrations

### 4.1 Post Registration (User Only)
Enroll the authenticated user into an event.

*   **URL:** `POST /registrations`
*   **Request Body:**
```json
{
  "event_id": 1,
  "program_type": "course"
}
```
*   **Response (201 Created):**
```json
{
  "status": "success",
  "message": "Enrollment request submitted successfully.",
  "registration_id": 104,
  "status_state": "approved"
}
```

---

## 5. Admin Dashboard Analytics (Admin Only)

### 5.1 Get Metrics (Admin Only)
Retrieve quick metrics, graphs, and performance parameters.

*   **URL:** `GET /admin/analytics`
*   **Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "total_students": 1420,
    "active_courses": 15,
    "completion_rate": "89.4%",
    "revenue": 34000.00,
    "registrations_by_month": {
      "May": 320,
      "June": 480,
      "July": 620
    }
  }
}
```
