# 🚀 Job Portal & Career Hub

A modern, full-featured job portal and career tracking application built with **React**, **Vite**, and **Tailwind CSS**. This platform provides everything users need to find jobs, track applications, build resumes, and analyze the job market.

## ✨ Features

- **💼 Job Board & Search**: Browse, filter, and search through a comprehensive list of job openings.
- **🏢 Company Directory**: Explore detailed profiles of top companies hiring right now.
- **📄 Interactive Resume Builder**: Create, edit, and export professional resumes directly to PDF.
- **📊 Application Dashboard**: Manage and track all your job applications in one centralized dashboard with drag-and-drop support.
- **📈 Market Insights**: Visualize job market trends and application analytics through interactive charts.
- **🗺️ Geo-Location**: Map-based job search utilizing interactive maps.
- **🔐 User Authentication**: Secure login and session management.
- **💳 Premium Features**: Integrated payment gateway for premium services.
- **🌙 Dark Mode**: Built-in support for dark mode with seamless theme toggling.
- **📱 Responsive Design**: Fully responsive and mobile-friendly UI crafted with Tailwind CSS and Radix UI primitives.

## 🛠️ Tech Stack

**Frontend Framework:**
- React 18
- Vite
- React Router DOM v6

**Styling & UI:**
- Tailwind CSS
- Radix UI (Headless components)
- Framer Motion (Animations)
- Lucide React (Icons)

**Forms & Validation:**
- React Hook Form
- Zod (Schema validation)

**Data Visualization & Maps:**
- Recharts
- React Leaflet

**Utilities:**
- React Query (Data fetching)
- Date-fns (Date formatting)
- Sonner / React Hot Toast (Notifications)

## 📂 Project Structure

```text
src/
├── api/            # API integration and service calls
├── components/     # Reusable UI components (Buttons, Cards, Forms, etc.)
├── hooks/          # Custom React hooks
├── lib/            # Utility libraries and configurations
├── pages/          # Application routes (Home, Jobs, Resume, Dashboard, etc.)
├── utils/          # Helper functions
├── App.jsx         # Main application routing
└── index.css       # Global stylesheet & Tailwind directives
```

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v16 or higher) and `npm` installed.

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd "job app"
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   *The app will automatically be available at `http://localhost:5173`.*

### Building for Production

To create an optimized production build, run:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

## 📝 Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles the application for production.
- `npm run lint`: Analyzes the code for potential errors.
- `npm run typecheck`: Checks JS/TS configurations.

---
*Built with ❤️ for a seamless job hunting experience.*
