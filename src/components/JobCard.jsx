import { Link, useNavigate } from "react-router-dom";
import { useJobs } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
import "./JobCard.css";

const typeColors = {
  "Internship": "badge-blue",
  "Full-time": "badge-green",
  "Part-time": "badge-yellow",
  "Contract": "badge-gray",
};

const modeColors = {
  "Remote": "badge-green",
  "Hybrid": "badge-yellow",
  "On-site": "badge-gray",
};

export default function JobCard({ job, compact = false }) {
  const { saveJob, applyJob, isSaved, isApplied } = useJobs();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const saved = isSaved(job.id);
  const applied = isApplied(job.id);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) { navigate("/login"); return; }
    saveJob(job.id);
  };

  const handleApply = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) { navigate("/login"); return; }
    applyJob(job.id);
    navigate(`/jobs/${job.id}`);
  };

  const initials = job.company?.slice(0, 2).toUpperCase() || "CO";
  const logoColors = ["#2563EB", "#7c3aed", "#0891b2", "#059669", "#d97706", "#dc2626"];
  const colorIndex = job.id % logoColors.length;

  return (
    <Link to={`/jobs/${job.id}`} className={`job-card ${compact ? "job-card--compact" : ""}`}>
      <div className="job-card__header">
        <div className="job-card__logo" style={{ background: logoColors[colorIndex] }}>
          {initials}
        </div>
        <div className="job-card__meta">
          <h3 className="job-card__title">{job.title}</h3>
          <span className="job-card__company">{job.company}</span>
        </div>
        <button
          className={`job-card__save-btn ${saved ? "job-card__save-btn--saved" : ""}`}
          onClick={handleSave}
          aria-label={saved ? "Unsave job" : "Save job"}
          title={saved ? "Saved" : "Save"}
        >
          <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
          </svg>
        </button>
      </div>

      <div className="job-card__details">
        <span className="job-card__detail">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {job.location}
        </span>
        <span className="job-card__detail">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          </svg>
          {job.experience}
        </span>
        <span className="job-card__detail">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
          </svg>
          {job.salary}
        </span>
      </div>

      <div className="job-card__badges">
        <span className={`badge ${typeColors[job.type] || "badge-gray"}`}>{job.type}</span>
        <span className={`badge ${modeColors[job.mode] || "badge-gray"}`}>{job.mode}</span>
        {job.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="badge badge-gray">{skill}</span>
        ))}
      </div>

      {!compact && (
        <div className="job-card__footer">
          <span className="job-card__posted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {job.postedOn} · {job.applicantsCount} applicants
          </span>
          <button
            className={`btn btn-sm ${applied ? "btn-ghost" : "btn-accent"}`}
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? "✓ Applied" : "Apply Now"}
          </button>
        </div>
      )}
    </Link>
  );
}
