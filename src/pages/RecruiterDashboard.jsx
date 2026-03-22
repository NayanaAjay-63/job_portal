import { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jobs } from "../data/jobs";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import "./Dashboard.css";
import "./RecruiterDashboard.css";

const mockApplicants = [
  { id: 1, name: "Ajay Kumar", jobTitle: "React Developer", status: "Applied", date: "2024-03-20", skills: ["React", "JS"] },
  { id: 2, name: "Priya Nair", jobTitle: "Frontend Developer Intern", status: "Shortlisted", date: "2024-03-19", skills: ["HTML", "CSS"] },
  { id: 3, name: "Ravi Patel", jobTitle: "React Developer", status: "Under Review", date: "2024-03-18", skills: ["React", "Redux"] },
  { id: 4, name: "Ananya Singh", jobTitle: "Frontend Developer Intern", status: "Rejected", date: "2024-03-17", skills: ["JavaScript"] },
  { id: 5, name: "Kiran Kumar", jobTitle: "React Developer", status: "Applied", date: "2024-03-16", skills: ["TypeScript", "React"] },
];

const statusColors = { Applied: "blue", Shortlisted: "green", "Under Review": "yellow", Rejected: "red" };

function RecruiterOverview() {
  const { currentUser } = useAuth();
  const recruiterJobs = jobs.slice(0, 4);

  return (
    <div className="dashboard-main">
      <div className="dashboard-welcome">
        <div>
          <h1>Recruiter Dashboard 🏢</h1>
          <p>Manage your job postings and connect with top talent.</p>
        </div>
        <Link to="/recruiter/post" className="btn btn-accent btn-lg">+ Post New Job</Link>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <StatsCard
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>}
          label="Active Jobs"
          value={recruiterJobs.length}
          color="blue"
        />
        <StatsCard
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>}
          label="Total Applicants"
          value={mockApplicants.length}
          color="purple"
        />
        <StatsCard
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
          label="Shortlisted"
          value={mockApplicants.filter(a => a.status === "Shortlisted").length}
          color="green"
        />
        <StatsCard
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
          label="New This Week"
          value={3}
          color="yellow"
          trend={{ dir: "up", text: "+3 new" }}
        />
      </div>

      {/* Active Jobs */}
      <div className="card dashboard-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
          <h3>Active Job Posts</h3>
          <Link to="/recruiter/jobs" className="btn btn-ghost btn-sm">Manage All →</Link>
        </div>
        <div className="recruiter-jobs-table">
          {recruiterJobs.map((job) => (
            <div key={job.id} className="recruiter-job-row">
              <div>
                <strong>{job.title}</strong>
                <span>{job.location} · {job.type} · {job.mode}</span>
              </div>
              <div className="recruiter-job-row__right">
                <span className="badge badge-blue">{job.applicantsCount} Applicants</span>
                <span className="badge badge-green">Active</span>
                <button className="btn btn-ghost btn-sm">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Applicants */}
      <div className="card dashboard-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
          <h3>Recent Applicants</h3>
          <Link to="/recruiter/applicants" className="btn btn-ghost btn-sm">View All →</Link>
        </div>
        <ApplicantTable applicants={mockApplicants.slice(0, 4)} />
      </div>
    </div>
  );
}

function ManageJobs() {
  const recruiterJobs = jobs.slice(0, 6);
  return (
    <div className="dashboard-main">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="dashboard-section-title">Manage Jobs</h2>
        <Link to="/recruiter/post" className="btn btn-primary">+ Post New Job</Link>
      </div>
      <div className="card dashboard-section">
        <div className="recruiter-jobs-table">
          {recruiterJobs.map((job) => (
            <div key={job.id} className="recruiter-job-row">
              <div>
                <strong>{job.title}</strong>
                <span>{job.location} · {job.type} · Posted {job.postedOn}</span>
              </div>
              <div className="recruiter-job-row__right">
                <span className="badge badge-blue">{job.applicantsCount} Applicants</span>
                <span className="badge badge-green">Active</span>
                <button className="btn btn-ghost btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Applicants() {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Applied", "Under Review", "Shortlisted", "Rejected"];
  const filtered = filter === "All" ? mockApplicants : mockApplicants.filter(a => a.status === filter);

  return (
    <div className="dashboard-main">
      <h2 className="dashboard-section-title">Applicants</h2>
      <div className="recruiter-filter-tabs">
        {statuses.map(s => (
          <button key={s} className={`recruiter-filter-tab ${filter === s ? "recruiter-filter-tab--active" : ""}`} onClick={() => setFilter(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="card dashboard-section">
        <ApplicantTable applicants={filtered} showActions />
      </div>
    </div>
  );
}

function PostJob() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: "", company: "", location: "", salary: "", type: "Full-time", mode: "Remote", experience: "Fresher", description: "", skills: "" });
  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); setTimeout(() => navigate("/recruiter"), 1500); };

  return (
    <div className="dashboard-main">
      <h2 className="dashboard-section-title">Post a New Job</h2>
      {submitted ? (
        <div className="dashboard-empty">
          <span>🎉</span>
          <h3>Job Posted Successfully!</h3>
          <p>Redirecting to dashboard…</p>
        </div>
      ) : (
        <div className="card" style={{ padding: "var(--space-8)" }}>
          <form className="post-job-form" onSubmit={handleSubmit}>
            <div className="auth-form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="pj-title">Job Title *</label>
                <input id="pj-title" name="title" type="text" className="form-input" placeholder="e.g. Frontend Developer" value={form.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="pj-company">Company *</label>
                <input id="pj-company" name="company" type="text" className="form-input" placeholder="e.g. TechNova" value={form.company} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="pj-location">Location *</label>
                <input id="pj-location" name="location" type="text" className="form-input" placeholder="e.g. Hyderabad" value={form.location} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="pj-salary">Salary</label>
                <input id="pj-salary" name="salary" type="text" className="form-input" placeholder="e.g. ₹8–12 LPA" value={form.salary} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="pj-type">Job Type</label>
                <select id="pj-type" name="type" className="form-input form-select" value={form.type} onChange={handleChange}>
                  {["Full-time","Part-time","Internship","Contract"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="pj-mode">Work Mode</label>
                <select id="pj-mode" name="mode" className="form-input form-select" value={form.mode} onChange={handleChange}>
                  {["Remote","Hybrid","On-site"].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="pj-exp">Experience</label>
                <select id="pj-exp" name="experience" className="form-input form-select" value={form.experience} onChange={handleChange}>
                  {["Fresher","0–2 Years","2–4 Years","3–6 Years","6+ Years"].map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="pj-skills">Required Skills</label>
                <input id="pj-skills" name="skills" type="text" className="form-input" placeholder="React, Node.js, Python (comma-separated)" value={form.skills} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: "var(--space-4)" }}>
              <label className="form-label" htmlFor="pj-desc">Job Description *</label>
              <textarea id="pj-desc" name="description" className="form-input" rows="6" placeholder="Describe the role, responsibilities, and requirements…" value={form.description} onChange={handleChange} style={{ resize: "vertical" }} required />
            </div>
            <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
              <button type="submit" className="btn btn-primary btn-lg">Post Job</button>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => navigate("/recruiter")}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function ApplicantTable({ applicants, showActions }) {
  const [statuses, setStatuses] = useState({});
  return (
    <div className="applicant-table">
      {applicants.length === 0
        ? <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "var(--space-8)" }}>No applicants found</p>
        : applicants.map(a => (
          <div key={a.id} className="applicant-row">
            <div className="applicant-avatar">{a.name.charAt(0)}</div>
            <div className="applicant-info">
              <strong>{a.name}</strong>
              <span>{a.jobTitle}</span>
              <div style={{ display: "flex", gap: "var(--space-1)", marginTop: "4px" }}>
                {a.skills.map(s => <span key={s} className="badge badge-gray">{s}</span>)}
              </div>
            </div>
            <div className="applicant-right">
              <span className={`badge badge-${statusColors[statuses[a.id] || a.status] || "blue"}`}>{statuses[a.id] || a.status}</span>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{a.date}</span>
              {showActions && (
                <div style={{ display: "flex", gap: "4px" }}>
                  <button className="btn btn-sm btn-accent" onClick={() => setStatuses(p => ({ ...p, [a.id]: "Shortlisted" }))}>✓</button>
                  <button className="btn btn-sm btn-danger" onClick={() => setStatuses(p => ({ ...p, [a.id]: "Rejected" }))}>✕</button>
                </div>
              )}
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default function RecruiterDashboard() {
  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-layout">
          <Sidebar />
          <Routes>
            <Route index element={<RecruiterOverview />} />
            <Route path="post" element={<PostJob />} />
            <Route path="jobs" element={<ManageJobs />} />
            <Route path="applicants" element={<Applicants />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
