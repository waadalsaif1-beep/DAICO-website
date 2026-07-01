# Deployment & Future Scalability Guide

This document describes how to deploy the current client-side **DAICO** web platform prototype, secure the environment, and scale it to a full-production Laravel + React/Next.js stack.

---

## 1. Deploying the Static Prototype (HTML/CSS/JS)

The current platform runs as a static site and can be deployed with zero costs to several modern platforms.

### A. Github Pages
1. Push the repository to GitHub.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Select the `main` branch as the build source and directory `/` (root).
4. Click **Save**. Your site will be live at `https://<username>.github.io/DAICO-website/`.

### B. Vercel / Netlify
1. Create an account on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Connect your GitHub repository.
3. Import the project, leave build settings blank, and set root directory to `./`.
4. Click **Deploy**.

---

## 2. Transitioning to Production Architecture

To scale this to thousands of daily active users, we recommend transitioning to a full **Laravel (Backend API) + Next.js (RTL React Frontend)** setup.

```
       [ Client Browser (Next.js Frontend) ]
                         │
          (HTTPS API Requests / CORS Secured)
                         │
                         ▼
        [ Nginx Web Server / Load Balancer ]
                         │
                         ▼
             [ Laravel Backend Cluster ]
                         │
           ┌─────────────┴─────────────┐
           ▼                           ▼
  [ MySQL Primary-Replica ]     [ Redis Cache ]
```

### Backend Migration (Laravel 11)
*   **Database**: Set up MySQL on RDS (Amazon Web Services) or DigitalOcean Managed Databases. Use migrations to translate the `DATABASE_SCHEMA.md` into Laravel migration files.
*   **Authentication**: Use **Laravel Sanctum** to manage stateful tokens (JWT) securely.
*   **Storage**: Connect Laravel filesystems to Amazon S3 or DigitalOcean Spaces to support high-performance file and image uploads.
*   **Worker Queues**: Configure **Laravel Horizon** and Redis to process notifications, send verification emails, and generate certificate PDFs in the background.

### Frontend Migration (Next.js 14 App Router)
*   **RTL Rendering**: Use Next.js with tailwindcss-rtl or logical CSS properties.
*   **State Management**: Use `React Query` (`@tanstack/react-query`) to handle server-state caching.
*   **Static Generation**: Pre-render landing pages and trainer profile pages using SSR (Server-Side Rendering) or ISR (Incremental Static Regeneration) for lightning-fast loading speeds and SEO.

---

## 3. Security Best Practices

### A. Client-Side Security (Static App)
*   **Content Security Policy (CSP)**: Set headers to prevent Cross-Site Scripting (XSS) by disabling unverified inline scripts and styling.
*   **Secure Storage**: Never store high-priority data (e.g. raw passwords, session secrets) in plaintext in `localStorage`. In this mock, we hashed credentials to demonstrate security protocols.

### B. Production Server Security (Laravel API)
*   **Rate Limiting**: Apply Laravel's throttle middleware (`throttle:api`) to protect endpoints against brute force and DDoS attacks.
*   **Input Validation**: Enforce rigorous API validation checks using Form Requests to prevent SQL Injection and shell execution exploits.
*   **SSL/TLS**: Force all traffic through HTTPS (TLS 1.3). Set secure HSTS headers.
*   **CORS Configuration**: Restrict the `Access-Control-Allow-Origin` headers on the Laravel API to match only the Next.js production domains.
