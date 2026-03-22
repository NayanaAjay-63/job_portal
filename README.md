# HireHub - Modern Job Portal 🚀

[![Built with Vite](https://img.shields.io/badge/Built_with-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

HireHub is a modern, responsive, full-stack-ready job and internship portal UI built entirely with React and vanilla CSS. It features a clean, professional design inspired by top platforms like LinkedIn and Indeed, supporting dedicated flows for both **Job Seekers** and **Recruiters**.

## ✨ Features

### 👤 For Job Seekers
* **Smart Search & Filters:** Find jobs by title, location, type, mode (remote/hybrid), and experience level.
* **Job Discovery:** Browse featured jobs, latest internships, and top companies.
* **One-Click Apply & Save:** Easily apply to or save jobs for later.
* **Application Tracking:** Monitor the status of your applications (Applied, Under Review, Shortlisted, etc.) right from your dashboard.
* **Profile Management:** Update personal information, experience, education, and upload a resume.

### 🏢 For Recruiters
* **Recruiter Dashboard:** Get a bird's-eye view of active job postings and applicant statistics.
* **Post Jobs:** A comprehensive form to post new opportunities.
* **Manage Applicants:** Review applications and change applicant statuses (Shortlist / Reject).

### 🎨 Design & UX
* **100% Custom CSS:** No UI libraries were used. A complete, bespoke design system utilizing CSS custom properties.
* **Dark Mode:** Built-in light and dark mode support with a seamless toggle.
* **Responsive Design:** Mobile-first approach ensuring a perfect layout across all devices.
* **Micro-interactions:** Smooth hover states, skeleton loaders, and toast notifications for user feedback.

## 🛠️ Tech Stack

* **Frontend Framework:** React 18 (via Vite)
* **Routing:** React Router v6
* **Styling:** Vanilla CSS (Custom Design System)
* **State Management:** React Context API + LocalStorage
* **Data:** Mock JSON data layer included

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hirehub.git
   ```

2. Navigate into the project directory:
   ```bash
   cd hirehub
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔑 Demo Credentials

To explore the dashboard functionalities, you can use the pre-configured demo accounts. (These can also be autofilled via buttons on the login page).

**Job Seeker Demo:**
* Email: `seeker@example.com`
* Password: `demo-password`

**Recruiter Demo:**
* Email: `recruiter@example.com`
* Password: `demo-password`

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI components (Navbar, JobCard, etc.)
├── context/      # React Context providers (Auth, Theme, Jobs)
├── data/         # Mock data for jobs, companies, and users
├── pages/        # Route components (Home, Dashboard, etc.)
├── routes/       # Application routing logic (AppRoutes.jsx)
├── styles/       # Global CSS and design system tokens
├── App.jsx       # Main application layout and context boundaries
└── main.jsx      # React entry point
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Built with ❤️ for job seekers and recruiters.*
