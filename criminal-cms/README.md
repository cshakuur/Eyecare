# INCCMS – Integrated National Criminal Case Management System

A modern, full-featured criminal case management platform built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.

## Features

- 🔐 Secure Login with MFA (Two-Factor Authentication)
- 🏛️ Role-Based Dashboards for all justice sector stakeholders
- 📊 Analytics & Reports with visual charts
- 📋 Case Tracking across the full criminal justice lifecycle
- 🗓️ Court Scheduler with courtroom availability
- 🔒 Prison Management with inmate registry
- 📱 Responsive Design with mobile sidebar toggle
- ⚡ Sortable Data Tables with status badges

## Running Locally

```bash
cd criminal-cms
npm install
npm run dev
```

Open http://localhost:3000 — redirects to login page.

## Running in GitHub Codespaces

```bash
cd criminal-cms
npm run dev
```

Codespaces will forward port 3000 automatically.

## Demo Credentials

All accounts use MFA code: **123456**

| Role | Username | Password |
|------|----------|----------|
| Admin | admin@inccms.gov | Admin@2024 |
| Police Officer | officer@inccms.gov | Police@2024 |
| Prosecutor | prosecutor@inccms.gov | Prose@2024 |
| Judge | judge@inccms.gov | Judge@2024 |
| Prison Officer | prison@inccms.gov | Prison@2024 |

## Pages

| Route | Description |
|-------|-------------|
| `/login` | Login + MFA screen |
| `/dashboard/admin` | System-wide overview |
| `/dashboard/police` | Case entry & field operations |
| `/dashboard/investigation` | Evidence & forensics tracking |
| `/dashboard/prosecutor` | Charge review & indictments |
| `/dashboard/court` | Hearing scheduler |
| `/dashboard/judge` | Verdicts & judicial orders |
| `/dashboard/prison` | Inmate registry & facilities |
| `/dashboard/reports` | Analytics & performance metrics |

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS v4
- React Hooks
