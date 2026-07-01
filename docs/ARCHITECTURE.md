# DAICO System Architecture

This document describes the high-level architecture, directory layout, and key logical flows of the **DAICO** web platform.

---

## 1. Architectural Overview

DAICO is built as a **decoupled web platform** with an interactive frontend client and a documented backend infrastructure. Due to system environment constraints, the interactive component is implemented as a **Zero-Dependency Single-Page & Multi-Page hybrid Client-Side Architecture** using:

*   **HTML5** for structured semantic markup.
*   **Vanilla CSS3** for modern design tokens, micro-animations, light/dark modes, and fully native RTL layout support.
*   **Vanilla JS (ES6+)** for rendering UI views, handling forms, updating page state, and routing.
*   **LocalStorage Database Engine (`db.js`)**: A simulated client-side relational database manager. It loads default seed records (Super Admin, Admins, Users, Trainers, Courses) into `localStorage` on initial load, allowing full CRUD operations, mock foreign key lookups, and session management without a running server.

---

## 2. Directory Structure

Below is the directory design representing the modularized nature of the project:

```
DAICO-website/
│
├── index.html                   # Main landing page for DAICO (Hero, Programs overview, FAQs)
│
├── auth/                        # User authentication flows
│   ├── login.html               # Secure login interface
│   ├── register.html            # Registration interface
│   ├── forgot-password.html     # Recovery request interface
│   └── verify-email.html        # Simulated token confirmation interface
│
├── admin/
│   └── index.html               # Unified Admin portal (Dynamic sub-panels for Events, Users, Registrations)
│
├── user/
│   └── index.html               # Unified User portal (Browse programs, registrations log, certificates viewer)
│
├── css/
│   ├── variables.css            # Centralized design tokens (glowing HSL palettes, Apple fonts, responsive dimensions)
│   ├── base.css                 # Standard browser reset, semantic element wrappers, responsive defaults
│   ├── main.css                 # Custom styling for landing page sections (grids, testimonial sliders, footer)
│   ├── auth.css                 # CSS specifically for auth forms
│   └── dashboard.css            # Navigation sidebars, cards, tables, modal forms, and UI grids
│
├── js/
│   ├── db.js                    # Mock Relational Database Engine, schemas, & seeder
│   ├── auth.js                  # Authentication controller, session tracking, role-based redirects
│   ├── main.js                  # Homepage controller (FAQs accordion, scroll-reveal, contact form)
│   ├── admin.js                 # Admin view controllers, analytics calculator, CSV/PDF export mocks
│   └── user.js                  # User view controller, search-filters engine, certificate canvas creator
│
├── docs/                        # Specifications and design plans
│   ├── ARCHITECTURE.md          # Systems architecture manual (this file)
│   ├── DATABASE_SCHEMA.md       # Relational schema tables, fields, types, indexes, and constraints
│   ├── API_DOCUMENTATION.md     # REST API design specifications (GET, POST, PUT, DELETE)
│   └── DEPLOYMENT_GUIDE.md      # Deployment guidelines & scalability strategies
│
└── assets/                      # Icons, logos, graphics
```

---

## 3. Core System Flows

### A. Authentication & Authorization Flow
```
[User Form Submit] ──> [auth.js Controller] ──> [db.js (Query Users Table)]
                                                    │
    ┌───────────────── User Verified? ──────────────┤
   No                                              Yes
    │                                               │
 [Display Error]                        [Generate Session Cookie/localStorage]
                                                    │
                                        [Check User.role]
                                                    │
                         ┌──────────────────────────┴──────────────────────────┐
                    [role == 'admin']                                 [role == 'user']
                         │                                                     │
            Redirect: /admin/index.html                           Redirect: /user/index.html
```

### B. Program Registration Flow
1. **User** searches/filters events, opens detailed modal, and clicks "Register" (سجل الآن).
2. **User Controller** checks remaining seats:
   * If `seats_remaining > 0`, it inserts a record into the `registrations` table in `db.js`.
   * Decrements `seats_remaining` in the `events` table.
   * Inserts an enrollment notification into the `notifications` table.
3. **Admin** views the incoming request in the registrations panel and can manage status updates.
4. **User Dashboard** dynamically updates the registration status badge.

### C. Certificate Issuance & Verification Flow
```
[Admin marks Course Registration as Completed]
                       │
  [db.js generates Certificate Table record & Code]
                       │
  [User views Certificate in User Dashboard]
                       │
  [JS draws Canvas with Custom Typography, Signature, and QR Code]
                       │
  [Scan QR Code] ──> Decodes Verification Link: /user/index.html?verify=CERT-XXX
                       │
  [Verify Route] ──> Looks up Certificate Code in db.js ──> Shows Success Modal
```

---

## 4. UI/UX Architecture

To conform to modern high-end web platforms (Stripe, Apple, Notion), the UI leverages:
*   **System Fonts Stack**: `Tajawal` for clean Arabic text, `Inter` for visual consistency.
*   **CSS Variables**: Real-time switching between Light and Dark themes by toggling the `data-theme` attribute on the `<html>` node.
*   **Transitions**: Smooth `cubic-bezier(0.16, 1, 0.3, 1)` scaling and opacity changes for all hover states and modals.
*   **RTL Design Rules**: Logical properties ensure layout elements change gracefully based on direction without breaking layouts.
