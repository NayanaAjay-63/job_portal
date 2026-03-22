import { Link, Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobContext";
import { jobs } from "../data/jobs";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import JobCard from "../components/JobCard";
import "./Dashboard.css";

function Overview() {
  const { currentUser } = useAuth();
  const { jobs: allJobs } = useJobs();

  const appliedJobs = currentUser?.appliedJobs || [];
  const savedJobs = currentUser?.savedJobs || [];

  const statusIcons = { Applied: "📋", "Under Review": "🔍", Shortlisted: "⭐", Rejected: "❌", Offered: "🎉" };
  const statusColors = {
    Applied: "blue", "Under Review": "yellow", Shortlisted: "green", Rejected: "red", Offered: "purple"
  };

  const completion = currentUser?.profileCompletion || 0;
  const recommended = allJobs.slice(0, 4);

  return (
    <div className="dashboard-main">
      {/* Welcome */}
      <div className="dashboard-welcome">
        <div>
          <h1>Welcome back, {currentUser?.name?.split(" ")[0]}! 👋</h1>
          <p>Here's what's happening with your job search today.</p>
        </div>
        <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats">
        <StatsCard
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
          label="Applied Jobs"
          value={appliedJobs.length}
          color="blue"
          trend={{ dir: "up", text: "this week" }}
        />
        <StatsCard
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>}
          label="Saved Jobs"
          value={savedJobs.length}
          color="purple"
        />
        <StatsCard
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
          label="Shortlisted"
          value={appliedJobs.filter(a => a.status === "Shortlisted").length}
          color="green"
        />
        <StatsCard
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
          label="Under Review"
          value={appliedJobs.filter(a => a.status === "Under Review").length}
          color="yellow"
        />
      </div>

      {/* Profile Completion */}
      <div className="card dashboard-profile-bar">
        <div className="dashboard-profile-bar__header">
          <div>
            <h3>Profile Completion</h3>
            <p>Complete your profile to get better job recommendations</p>
          </div>
          <Link to="/profile" className="btn btn-outline btn-sm">Edit Profile</Link>
        </div>
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${completion}%` }} />
        </div>
        <p className="dashboard-profile-bar__pct">{completion}% complete</p>
      </div>

      {/* Application Tracking */}
      {appliedJobs.length > 0 && (
        <div className="card dashboard-section">
          <h3>Recent Applications</h3>
          <div className="dashboard-applications">
            {appliedJobs.slice(0, 5).map((app) => {
              const job = jobs.find((j) => j.id === app.jobId);
              if (!job) return null;
              return (
                <div key={app.jobId} className="dashboard-application-row">
                  <div className="dashboard-application-info">
                    <strong>{job.title}</strong>
                    <span>{job.company} · {job.location}</span>
                  </div>
                  <div className="dashboard-application-right">
                    <span className={`badge badge-${statusColors[app.status] || "gray"}`}>
                      {statusIcons[app.status]} {app.status}
                    </span>
                    <span className="dashboard-application-date">{app.appliedOn}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommended Jobs */}
      <div className="card dashboard-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
          <h3>Recommended For You</h3>
          <Link to="/jobs" className="btn btn-ghost btn-sm">View All →</Link>
        </div>
        <div className="dashboard-recommended-grid">
          {recommended.map((job) => (
            <JobCard key={job.id} job={job} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

function AppliedJobs() {
  const { currentUser } = useAuth();
  const applied = currentUser?.appliedJobs || [];

  return (
    <div className="dashboard-main">
      <h2 className="dashboard-section-title">Applied Jobs</h2>
      {applied.length === 0 ? (
        <div className="dashboard-empty">
          <span>📋</span>
          <h3>No applications yet</h3>
          <p>Start applying to jobs to track them here.</p>
          <Link to="/jobs" className="btn btn-primary">Find Jobs</Link>
        </div>
      ) : (
        <div className="dashboard-job-list">
          {applied.map((app) => {
            const job = jobs.find((j) => j.id === app.jobId);
            if (!job) return null;
            return <JobCard key={app.jobId} job={job} />;
          })}
        </div>
      )}
    </div>
  );
}

function SavedJobs() {
  const { currentUser } = useAuth();
  const { savedJobIds } = useJobs();
  const savedJobsList = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="dashboard-main">
      <h2 className="dashboard-section-title">Saved Jobs</h2>
      {savedJobsList.length === 0 ? (
        <div className="dashboard-empty">
          <span>🔖</span>
          <h3>No saved jobs yet</h3>
          <p>Save jobs you're interested in to revisit them later.</p>
          <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
        </div>
      ) : (
        <div className="dashboard-job-list">
          {savedJobsList.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function UserDashboard() {
  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-layout">
          <Sidebar />
          <Routes>
            <Route index element={<Overview />} />
            <Route path="applied" element={<AppliedJobs />} />
            <Route path="saved" element={<SavedJobs />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
