# ResolveHub — Online Complaint Registration & Management System

A modern, full-featured web application for submitting, tracking, and resolving complaints with role-based dashboards for users, agents, and administrators.

## Features

- **Complaint Registration** — Users can file complaints with category, priority, and detailed descriptions
- **Real-Time Tracking** — Public complaint lookup by ID with status timeline
- **Role-Based Access** — Separate dashboards for Users, Agents, and Admins
- **Smart Routing** — Admins assign complaints to support agents
- **Messaging** — Direct communication between users and assigned agents
- **Notifications** — Automatic alerts on status changes, assignments, and messages
- **Admin Analytics** — Overview stats, category breakdown, and agent workload

## Quick Start

```bash
cd complaint-system
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Demo Accounts

| Role  | Email                   | Password  |
|-------|-------------------------|-----------|
| User  | user@resolvehub.com     | user123   |
| Agent | agent@resolvehub.com    | agent123  |
| Admin | admin@resolvehub.com    | admin123  |

## Tech Stack

- React 19 + Vite
- React Router
- Lucide Icons
- LocalStorage (demo persistence)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # Auth & complaint state management
├── data/           # Seed data & localStorage helpers
├── pages/          # Route pages
└── utils/          # Formatting helpers
```

## Build for Production

```bash
npm run build
npm run preview
```
