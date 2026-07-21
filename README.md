# PHOENIX Frontend

PHOENIX is a modern, enterprise-grade web platform built with **Next.js 16 (App Router)**, **TypeScript**, **React 19**, and **Tailwind CSS**. The application features a modular feature-driven architecture serving three primary user experiences: a **Public Marketing Site**, a **Client Self-Service Portal**, and a comprehensive **Admin Management Dashboard**.

---

## 🌟 Architecture Overview

The application utilizes Next.js App Router route groups, parallel routes, and a feature-first folder organization to separate concerns cleanly:

1. **Public Marketing Shell (`(marketing)`)**: High-converting public pages including services, events, artist portfolios, media galleries, team showcase, FAQs, press releases, client testimonials, consultation booking, and dynamic CMS pages.
2. **Authentication Shell (`(auth)`)**: Clean, focused interface for user authentication, password resets, email verification, and OAuth provider callbacks.
3. **Client Portal Shell (`(portal)`)**: Role-guarded portal for clients to track active projects, review project milestones and documents, check artist bookings, manage consultations, and update account settings.
4. **Admin Dashboard Shell (`(admin)`)**: Comprehensive management interface for administrators and team members featuring parallel route slots for real-time analytics, CRM inquiry tracking, artist booking management, full content management (CMS), user role management, media library, and global site settings.
5. **Feature Modules (`src/features/`)**: Self-contained domain modules mirroring backend models. Each module encapsulates its UI components, custom hooks, API service functions, TypeScript interfaces, and validation schemas.

---

## 📁 Project Directory Structure

```
FRONTEND/
├── public/                     # Static assets (images, fonts, favicon)
├── src/
│   ├── app/                    # Next.js App Router root
│   │   ├── (marketing)/        # Public Marketing Shell (services, events, artists, gallery, etc.)
│   │   ├── (auth)/             # Authentication Shell (login, register, password recovery, etc.)
│   │   ├── (portal)/           # Client Portal Shell (dashboard, projects, bookings, account, etc.)
│   │   ├── (admin)/admin/      # Admin Portal Shell (dashboard with parallel slots, CRM, CMS, settings, etc.)
│   │   ├── api/                # API route handlers (revalidate webhook)
│   │   ├── layout.tsx          # Root layout & providers
│   │   ├── globals.css         # Global CSS & Tailwind imports
│   │   ├── not-found.tsx       # Custom 404 page
│   │   └── error.tsx           # Global error boundary
│   │
│   ├── features/               # 20 Domain-Driven Feature Modules (services, events, artists, CRM, etc.)
│   │                           # Each contains: components/, hooks/, api.ts, types.ts, validations.ts
│   │
│   ├── components/             # Shared UI Components
│   │   ├── ui/                 # Core UI primitives
│   │   ├── layout/             # Header, footer, admin sidebar, portal nav
│   │   ├── data-display/       # Data tables, stat cards, pagination
│   │   └── feedback/           # Toast, skeleton, spinner, error boundary
│   │
│   ├── lib/                    # Infrastructure & Utilities
│   │   ├── api/                # Typed fetch wrapper & endpoints factory
│   │   ├── auth/               # Server session verification & role guards
│   │   ├── query/              # TanStack Query client & centralized query keys
│   │   └── utils/              # Helper functions (cn, formatCurrency, formatDate, slugify)
│   │
│   ├── hooks/                  # Cross-feature hooks (debounce, pagination, media query)
│   ├── store/                  # Zustand state stores (UI, admin table, booking wizard)
│   ├── providers/              # React Context Providers (Query, Theme, Toast)
│   ├── types/                  # Global TypeScript type definitions (API, NextAuth)
│   ├── constants/              # System constants (roles, event types, nav links, routes)
│   ├── config/                 # Site configuration & environment validation
│   └── proxy.ts                # Middleware / Route Guarding Proxy
│
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration & path aliases (`@/*`)
└── package.json                # Project dependencies & npm scripts
```

---

## 🗺 Route Mapping & Navigation

### 1. Public Marketing Routes (`/`)
- `/` – Homepage
- `/services` & `/services/[slug]` – Service catalog & detailed service offering
- `/events` & `/events/[slug]` – Upcoming events list & event page
- `/artists`, `/artists/[slug]`, & `/artists/categories/[slug]` – Roster of artists, detailed artist portfolios, and category views
- `/gallery` – Media gallery showcase
- `/team` – Company team members
- `/faqs` – Frequently asked questions
- `/testimonials` – Client reviews and success stories
- `/press` – Press coverage and news articles
- `/contact` – Inquiry contact form
- `/book-consultation` – Interactive consultation scheduling wizard
- `/[slug]` – Catch-all renderer for custom dynamic pages created via CMS

### 2. Authentication Routes (`/`)
- `/login` – User sign-in
- `/register` – User registration
- `/forgot-password` – Request password recovery request
- `/reset-password` – Password reset form
- `/verify-email` – Account verification landing page
- `/google/callback` – OAuth redirection handler

### 3. Client Portal Routes (`/`) *(Guarded for CLIENT role)*
- `/dashboard` – Client workspace dashboard overview
- `/projects`, `/projects/[id]`, `/projects/[id]/milestones`, `/projects/[id]/documents` – Active client projects, milestone progress, and file library
- `/bookings` – Artist booking status tied to inquiries
- `/consultations` – Scheduled client consultation meetings
- `/account` – Profile settings & account configuration

### 4. Admin Management Routes (`/admin/`) *(Guarded for ADMIN & TEAM_MEMBER roles)*
- `/admin/dashboard` – Executive dashboard with parallel slot widgets (`@analytics`, `@recentInquiries`, `@upcomingConsultations`)
- `/admin/crm/inquiries` & `/admin/crm/inquiries/[id]` – Lead management CRM & timeline activity logger
- `/admin/crm/consultations` – Consultation management
- `/admin/artist-bookings` & `/admin/artist-bookings/[id]` – Artist booking oversight
- `/admin/content/*` – Complete CMS suite for managing:
  - `services`, `events`, `artists`, `gallery`, `team`, `faqs`, `testimonials`, `press`, and custom `pages`
- `/admin/users` – User management & role assignment
- `/admin/media-library` – Asset upload and management hub
- `/admin/settings/*` – Configuration editors for site settings, social media links, client logos, and SEO meta tags
- `/admin/analytics` – Historical metrics and analytical performance snapshots

---

## 🛠 Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack build engine
- **UI & React Core**: React 19, React Compiler (`babel-plugin-react-compiler`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) for client state
- **Data Fetching**: [TanStack Query v5 (React Query)](https://tanstack.com/query) for server-state caching & synchronization
- **Type Safety**: TypeScript 5+ with strict mode & `@/*` path alias mapping
- **Linting & Quality**: ESLint with `eslint-config-next` ruleset

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.17` or higher
- **Package Manager**: `npm` (v9+)

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Compiles the production build, runs TypeScript validation, and generates static routes |
| `npm run start` | Starts the Next.js production server |
| `npm run lint` | Executes ESLint to check for code quality issues |
