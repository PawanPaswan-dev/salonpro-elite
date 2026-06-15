# SalonPro Elite — Premium Salon ERP + CRM Platform

A production-ready Next.js 14 (App Router) demo of a luxury unisex salon's
complete digital platform: a polished public-facing marketing website plus
four role-based operational dashboards — Owner/Admin, Employee, Reception,
and Customer Portal.

Built with **Next.js 14, React 18, TypeScript, Tailwind CSS, and Recharts**.
Styled in a black / gold / white luxury theme with glassmorphism panels,
smooth animations, and enterprise-grade dashboard UI.

---

## ✨ Features

### Public Website
- **Home** — animated hero, services preview, "Why Us", testimonial CTA
- **About** — brand story, stats, values
- **Services** — 8 services with category filters, pricing, duration, benefits
- **Membership** — Silver / Gold / Platinum tiers with benefits & pricing
- **Gallery** — masonry image gallery
- **Reviews** — 100 generated reviews (4.8★ avg), rating distribution, submission form
- **Contact** — contact form + location/info cards
- **Book Appointment** — 3-step booking flow with live confirmation

### Owner / Admin Dashboard (`/owner`)
- Revenue, profit, active customers, membership sales, inventory alerts
- Charts: revenue growth, customer growth, service popularity, staff performance
- Full analytics: daily/weekly/monthly revenue, retention, top services, best employees
- Customer database (100 records) with search
- Inventory management with low-stock/out-of-stock alerts
- Staff directory with attendance, targets, commissions, ratings

### Employee Dashboard (`/employee`)
- Profile, attendance, assigned customers, daily tasks
- Target achievement progress bar, commission earned, performance rating
- Assigned appointments list

### Reception Dashboard (`/reception`)
- Today's schedule, walk-ins, check-ins
- Appointment management table (500 generated appointments) with search
- Customer search & check-in

### Customer Portal (`/customer`)
- Appointment history, loyalty points, total spend
- Digital membership card with QR code (member ID)
- Digital wallet with transaction history

---

## 🔐 Demo Login Credentials

| Role | Email | Password | Route |
|------|-------|----------|-------|
| Owner / Admin | owner@salonproelite.in | admin123 | `/owner` |
| Employee / Staff | staff@salonproelite.in | staff123 | `/employee` |
| Reception | reception@salonproelite.in | reception123 | `/reception` |
| Customer Portal | customer@salonproelite.in | customer123 | `/customer` |

Click **Staff / Admin Login** in the top navigation — the modal autofills
demo credentials when you select a role.

> **Note:** This demo uses client-side credential checking against the
> constants in `data/demoData.ts` for presentation purposes. There is no
> real authentication backend. See "Going to Production" below for how to
> wire up real auth.

---

## 📁 Project Structure

```
salonpro-elite/
├── app/
│   ├── layout.tsx                 # Root layout (fonts, nav, footer)
│   ├── globals.css                # Tailwind + global styles
│   ├── page.tsx                   # Home
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── membership/page.tsx
│   ├── gallery/page.tsx
│   ├── reviews/page.tsx
│   ├── contact/page.tsx
│   ├── book/page.tsx
│   ├── owner/
│   │   ├── layout.tsx             # Sidebar shell for owner routes
│   │   ├── page.tsx               # Overview
│   │   ├── analytics/page.tsx
│   │   ├── customers/page.tsx
│   │   ├── inventory/page.tsx
│   │   └── staff/page.tsx
│   ├── employee/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── tasks/page.tsx
│   ├── reception/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── appointments/page.tsx
│   │   └── customers/page.tsx
│   └── customer/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── card/page.tsx
│       └── wallet/page.tsx
├── components/
│   ├── ui/                        # GlassCard, GoldButton, SectionHeading, StarRating
│   ├── nav/                       # TopNav, Footer, LoginModal
│   ├── dashboard/                 # DashboardShell, DashboardSidebar, StatCard
│   ├── charts/                    # Recharts wrappers (Revenue, Retention, etc.)
│   ├── booking/                   # BookingFlow (3-step appointment booking)
│   ├── services/                  # ServicesGrid (filterable)
│   ├── reviews/                   # ReviewSubmitForm, ReviewsList
│   ├── contact/                   # ContactForm
│   ├── owner/                     # CustomerTable
│   ├── reception/                 # AppointmentTable, CustomerSearch
│   └── customer/                  # QRCodeBlock
├── data/
│   └── demoData.ts                # All generated demo data (100 customers,
│                                   # 20 employees, 500 appointments, 100
│                                   # reviews, inventory, revenue analytics)
├── lib/
│   └── utils.ts                   # fmtINR, initials, cn (classnames)
├── public/                         # Static assets
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
└── PROJECT_GUIDE.md                # Production architecture (DB schema, etc.)
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18.18+ (LTS recommended)
- npm, pnpm, or yarn

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables (not required for the demo, but useful
#    as a reference for production wiring)
cp .env.example .env.local

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the public site loads
by default. Use the demo credentials above to access each dashboard.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#000000` / `#0a0a0a` |
| Gold (primary accent) | `#D4AF37` |
| Gold (dark) | `#8C6D0F` |
| Gold (light) | `#F4E5B3` |
| Display font | Playfair Display (`font-serif`) |
| UI/body font | Inter (`font-sans`) |
| Card style | Glassmorphism — `backdrop-blur-xl bg-white/[0.04] border border-white/10` |

All theme tokens are defined in `tailwind.config.ts` under
`theme.extend.colors.gold` and `theme.extend.fontFamily`.

---

## 📊 Demo Data

All data is generated deterministically (seeded random) in
`data/demoData.ts` so the demo looks the same on every load:

- 100 customers (Silver / Gold / Platinum tiers)
- 20 employees across 8 roles
- 500 appointments across 6 months
- 100 customer reviews (avg rating 4.8+)
- 10 inventory SKUs with stock/reorder thresholds
- 6 months of revenue/expense/customer analytics
- Daily (14-day), weekly (4-week), and retention trend data

To connect this to a real database, replace the exports in `demoData.ts`
with data-fetching functions (e.g. Prisma queries) — the component layer
already consumes typed objects (`Customer`, `Employee`, `Appointment`,
`Service`, etc.) and requires no further changes if your API returns the
same shapes.

---

## 🌐 Deploying to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Option B — Git-based (recommended)

1. Push this project to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no build configuration changes are needed.
4. (Optional, for production auth/db) add environment variables from
   `.env.example` under **Project Settings → Environment Variables**.
5. Click **Deploy**.

The demo runs entirely on static generated data and requires **no database**
to deploy successfully.

---

## 🏗 Going to Production

See **`PROJECT_GUIDE.md`** for:
- Full Prisma database schema (Users, Customers, Employees, Appointments,
  Services, Memberships, Inventory, Reviews, Revenue snapshots, etc.)
- NextAuth-based authentication wiring
- QR membership card generation & scanning workflow
- Notes on migrating `demoData.ts` to live API/database queries

---

## 📄 License

This is a demo/template project created for client presentation purposes.
Replace demo data, branding, and images before commercial use.
