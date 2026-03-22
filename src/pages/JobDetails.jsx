import { useParams, Link, useNavigate } from "react-router-dom";
import { jobs } from "../data/jobs";
import { useJobs } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
import JobCard from "../components/JobCard";
import "./JobDetails.css";

const logoColors = ["#2563EB", "#7c3aed", "#0891b2", "#059669", "#d97706", "#dc2626"];

export default function JobDetails() {
  const { id } = useParams();
  const { saveJob, applyJob, isSaved, isApplied } = useJobs();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const job = jobs.find((j) => j.id === Number(id));
  const similar = jobs.filter((j) => j.id !== Number(id) && (j.category === job?.category || j.type === job?.type)).slice(0, 3);

  if (!job) {
    return (
      <div className="container" style={{ padding: "var(--space-20) var(--space-6)", textAlign: "center" }}>
        <h2>Job not found</h2>
        <Link to="/jobs" className="btn btn-primary" style={{ marginTop: "var(--space-4)", display: "inline-flex" }}>
          Browse Jobs
        </Link>
      </div>
    );
  }

  const saved = isSaved(job.id);
  const applied = isApplied(job.id);
  const colorIdx = job.id % logoColors.length;

  const handleApply = () => {
    if (!currentUser) { navigate("/login"); return; }
    applyJob(job.id);
  };

  const handleSave = () => {
    if (!currentUser) { navigate("/login"); return; }
    saveJob(job.id);
  };

  return (
    <div className="job-details">
      <div className="container">
        <div className="job-details__layout">
          {/* Main Content */}
          <div className="job-details__main">
            {/* Header Card */}
            <div className="job-details__header card">
              <div className="job-details__company-row">
                <div className="job-details__logo" style={{ background: logoColors[colorIdx] }}>
                  {job.company.slice(0, 2).toUpperCase()}
                </div>
                <div className="job-details__company-info">
                  <h1 className="job-details__title">{job.title}</h1>
                  <p className="job-details__company">{job.company}</p>
                </div>
              </div>

              <div className="job-details__meta">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
                <span>🕒 {job.type}</span>
                <span>💻 {job.mode}</span>
                <span>📅 {job.experience}</span>
              </div>

              <div className="job-details__skills">
                {job.skills.map((skill) => (
                  <span key={skill} className="badge badge-blue">{skill}</span>
                ))}
              </div>

              <div className="job-details__actions">
                <button
                  className={`btn btn-lg ${applied ? "btn-ghost" : "btn-accent"}`}
                  onClick={handleApply}
                  disabled={applied}
                  id="apply-btn"
                >
                  {applied ? "✓ Applied" : "Apply Now"}
                </button>
                <button
                  className={`btn btn-lg btn-outline ${saved ? "btn-saved" : ""}`}
                  onClick={handleSave}
                  id="save-btn"
                >
                  {saved ? "✓ Saved" : "Save Job"}
                </button>
              </div>

              <p className="job-details__posted-info">
                Posted {job.postedOn} · {job.applicantsCount} applicants
              </p>
            </div>

            {/* Description */}
            <div className="card job-details__section">
              <h2>About the Role</h2>
              <p>{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="card job-details__section">
              <h2>Responsibilities</h2>
              <ul className="job-details__list">
                {job.responsibilities.map((r, i) => (
                  <li key={i}>
                    <span className="job-details__bullet" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Required */}
            <div className="card job-details__section">
              <h2>Required Skills</h2>
              <div className="job-details__skills">
                {job.skills.map((skill) => (
                  <span key={skill} className="badge badge-gray" style={{ fontSize: "var(--text-sm)", padding: "0.4rem 0.8rem" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="job-details__sidebar">
            {/* Company Card */}
            <div className="card job-details__company-card">
              <h3>About {job.company}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
                <div className="job-details__company-detail">
                  <span>Industry</span>
                  <strong>{job.category}</strong>
                </div>
                <div className="job-details__company-detail">
                  <span>Location</span>
                  <strong>{job.location}</strong>
                </div>
                <div className="job-details__company-detail">
                  <span>Job Type</span>
                  <strong>{job.type}</strong>
                </div>
                <div className="job-details__company-detail">
                  <span>Work Mode</span>
                  <strong>{job.mode}</strong>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            {similar.length > 0 && (
              <div className="job-details__similar">
                <h3>Similar Jobs</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
                  {similar.map((j) => (
                    <JobCard key={j.id} job={j} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
