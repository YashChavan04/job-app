# 🚀 JobTrack Pro: Next-Generation Career Hub

A high-performance, full-stack job portal designed for precision job hunting and market analysis. Built with **React 18**, **Vite**, **Express.js**, and **SQLite**, this application bridges the gap between searching for roles and actually securing them. It serves as both a comprehensive job board and an intelligent personal command center.

---

## 🏗️ Architecture Overview

The platform utilizes a modern Monorepo-style structure where a Lightning-fast React frontend communicates seamlessly with an embedded Node.js API, backed by a localized SQLite database.

### 1. Frontend (Client-Side)
- **Framework:** React 18 powered by Vite for instant HMR and optimized production builds.
- **Styling Engine:** Tailwind CSS combined with Radix UI headless primitives for accessible, flawlessly responsive, and premium "glassmorphic" interface designs.
- **Routing:** React Router DOM v6 for seamless SPA transitions.
- **Data Visualization:** Recharts integration for rendering complex market data and personal metrics into beautiful, interactive SVG charts.

### 2. Backend (Server-Side)
- **Runtime & API:** Node.js + Express.js serving RESTful endpoints (`/api/jobs`).
- **Database Layer:** `sqlite3` driver maintaining a lightweight, zero-configuration local database (`database.sqlite`).
- **Seeding Engine:** Procedural seeding script that generates hundreds of realistic, geo-targeted job roles complete with safe search URLs for real Indian job portals (Naukri, LinkedIn, Instahyre, etc.).

---

## ✨ Core Technical Features

- **Dynamic Job Board & Search Algorithm:** Fetches a massive dataset of active roles. Implements multi-dimensional client-side filtering (by title, location, experience) with optimized rendering for large lists.
- **Intelligent Activity Tracking:** Utilizes browser `localStorage` to securely track application events. Clicking "Apply" instantly logs the action and safely redirects users to the authentic portal interface.
- **Data-Driven Insights Engine:** The `Insights.jsx` module consumes the entire database on mount to compute real-time market trends. It dynamically calculates Experience Distribution (Pie Charts) and Top Hiring Companies (Bar Charts) on the fly.
- **Personal Command Center:** The `Dashboard.jsx` provides a holistic view of the user's job search pipeline, mapping applied roles against total platform volume and measuring momentum against weekly targets.
- **Zero-Config Concurrency:** Engineered with `concurrently` so that a single command boots both the React client and the Express backend simultaneously, abstracting away complex microservice orchestration during development.

---

## 📂 System File Structure

```text
job-app/
├── server/
│   ├── index.js          # Express API server & SQLite initialization
│   └── seed.js           # Procedural database generation script
├── src/
│   ├── components/       # Radix UI + Tailwind compound components
│   ├── pages/            # View components (Dashboard, Jobs, Insights, Resume)
│   ├── App.jsx           # Top-level Routing Configuration
│   ├── Layout.jsx        # Global App Shell & Theme Manager
│   └── index.css         # Global Tailwind Directives & CSS Variables
├── package.json          # Dependency management & Concurrent scripts
└── database.sqlite       # (Generated) Local Relational Database
```

---

## ⚙️ Getting Started (Developer Setup)

Follow these instructions to spin up the local development environment.

### Prerequisites
- **Node.js** (v18.x or higher recommended)
- **npm** or **yarn**

### 1. Installation
Clone the repository and install the full dependency tree (this installs both frontend dependencies and backend drivers like `express` and `sqlite3`).
```bash
npm install
```

### 2. Database Initialization
Before running the application, you must seed the relational database. Our automated script will generate the schema and populate it with 180 highly realistic, localized job entries.
```bash
node server/seed.js
```
*You should see a success message indicating the database was populated. This will create a `database.sqlite` file in your `server` directory.*

### 3. Booting the Application
We've configured the project to run synchronously. A single command will boot the API on port `5000` and the Vite client on port `5173` (or the next available port).
```bash
npm run dev
```

Your browser should automatically open, or you can manually navigate to `http://localhost:5173`.

---

## 📝 Available Scripts

- `npm run dev`: Bootstraps both the Vite server and the Node.js API concurrently.
- `npm run build`: Compiles the React application into static assets inside the `/dist` folder for production deployment.
- `npm run lint`: Executes ESLint rules across the codebase to ensure styling consistency.
- `node server/seed.js`: Drops the current jobs table and regenerates fresh seed data.

---

*Engineered for performance, scale, and the ultimate developer experience.*
