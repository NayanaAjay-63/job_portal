import JobCard from "./JobCard";
import Loader from "./Loader";
import "./JobList.css";

export default function JobList({ jobs, loading }) {
  if (loading) {
    return (
      <div className="job-list">
        {[...Array(6)].map((_, i) => (
          <Loader key={i} type="job-card" />
        ))}
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="job-list__empty">
        <div className="job-list__empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
            <path d="M8 11h6M11 8v6"/>
          </svg>
        </div>
        <h3>No jobs found</h3>
        <p>Try adjusting your search criteria or removing some filters.</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
