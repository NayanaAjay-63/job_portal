import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJobs } from "../context/JobContext";
import { featuredJobs, latestInternships } from "../data/jobs";
import { companies } from "../data/companies";
import JobCard from "../components/JobCard";
import CompanyCard from "../components/CompanyCard";
import "./Home.css";

export default function Home() {
  const { setSearchQuery, setLocationQuery } = useJobs();
  const [title, setTitle] = useState("");
  const [loc, setLoc] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(title);
    setLocationQuery(loc);
    navigate("/jobs");
  };

  return (
    <div className="home">
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="container hero__content">
          <div className="hero__badge">
            <span>🚀</span> 1000+ companies hiring now
          </div>
          <h1 className="hero__heading">
            Find Your <span className="hero__heading-accent">Dream Job</span>
            <br />& Launch Your Career
          </h1>
          <p className="hero__subheading">
            Connect with top companies. Discover internships, entry-level, and senior roles
            across technology, design, finance, and more.
          </p>

          {/* Search Form */}
          <form className="hero__search" onSubmit={handleSearch}>
            <div className="hero__search-input">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Job title, skill, or company…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="hero-search"
                aria-label="Job title or keyword"
              />
            </div>
            <div className="hero__search-divider" />
            <div className="hero__search-input">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                type="text"
                placeholder="Location or Remote…"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                id="hero-location"
                aria-label="Location"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg hero__search-btn">
              Search Jobs
            </button>
          </form>

          {/* Popular Searches */}
          <div className="hero__popular">
            <span>Popular:</span>
            {["React Developer", "Data Science", "Remote Internship", "UI/UX Designer", "Product Manager"].map((tag) => (
              <button
                key={tag}
                className="hero__popular-tag"
                onClick={() => { setSearchQuery(tag); navigate("/jobs"); }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="hero__stats">
          <div className="container">
            <div className="hero__stats-grid">
              {[
                { val: "50K+", label: "Active Jobs" },
                { val: "10K+", label: "Companies" },
                { val: "2M+", label: "Job Seekers" },
                { val: "500K+", label: "Placements" },
              ].map((s) => (
                <div key={s.label} className="hero__stat">
                  <strong>{s.val}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED JOBS ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-heading">Featured Jobs</h2>
              <p className="section-subheading">Handpicked opportunities from top companies</p>
            </div>
            <Link to="/jobs" className="btn btn-outline">View All Jobs →</Link>
          </div>
          <div className="home__jobs-grid">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOP COMPANIES ─── */}
      <section className="section home__companies-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-heading">Top Companies Hiring</h2>
              <p className="section-subheading">Work with the best in the industry</p>
            </div>
            <Link to="/companies" className="btn btn-outline">Explore Companies →</Link>
          </div>
          <div className="home__companies-grid">
            {companies.slice(0, 5).map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTERNSHIPS ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-heading">Latest Internships</h2>
              <p className="section-subheading">Start your career journey with top internships</p>
            </div>
            <Link to="/jobs?type=Internship" className="btn btn-outline">All Internships →</Link>
          </div>
          <div className="home__jobs-grid">
            {latestInternships.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="section home__why">
        <div className="container">
          <div className="home__why-content">
            <div className="home__why-text">
              <h2 className="section-heading">Why Choose HireHub?</h2>
              <p className="section-subheading">
                We make job searching smarter, faster, and more effective for everyone.
              </p>
              <div className="home__why-features">
                {[
                  {
                    icon: "🎯",
                    title: "Smart Job Matching",
                    desc: "Our algorithm matches your skills and preferences to the right opportunities.",
                  },
                  {
                    icon: "⚡",
                    title: "Apply Instantly",
                    desc: "One-click apply to multiple jobs without filling out long forms every time.",
                  },
                  {
                    icon: "📊",
                    title: "Track Applications",
                    desc: "Monitor all your applications and get real-time status updates in one place.",
                  },
                  {
                    icon: "🛡️",
                    title: "Verified Companies",
                    desc: "Every company is verified to ensure you only see legitimate opportunities.",
                  },
                ].map((f) => (
                  <div key={f.title} className="home__why-feature">
                    <span className="home__why-icon">{f.icon}</span>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="home__why-actions">
                <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
                <Link to="/jobs" className="btn btn-ghost btn-lg">Browse Jobs</Link>
              </div>
            </div>
            <div className="home__why-visual">
              <div className="home__why-card home__why-card--1">
                <div className="home__why-mini-card">
                  <strong>Frontend Developer</strong>
                  <span>TechNova • Remote</span>
                  <span className="badge badge-green">New Match!</span>
                </div>
              </div>
              <div className="home__why-card home__why-card--2">
                <div className="home__why-mini-card">
                  <strong>✓ Application Sent</strong>
                  <span>Analytics Hub</span>
                  <span style={{ color: "var(--accent)", fontSize: "12px" }}>Under Review</span>
                </div>
              </div>
              <div className="home__why-card home__why-card--3">
                <div className="home__why-mini-card">
                  <strong>🎉 Shortlisted!</strong>
                  <span>Interview on Monday</span>
                  <span style={{ color: "var(--warning)", fontSize: "12px" }}>9:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section home__testimonials-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
            <h2 className="section-heading">Success Stories</h2>
            <p className="section-subheading">Hear from people who found their dream jobs on HireHub</p>
          </div>
          <div className="home__testimonials">
            {[
              {
                name: "Arjun Mehta",
                role: "Frontend Developer @ TechNova",
                text: "I landed my first job through HireHub within 3 weeks of signing up. The job matching is incredibly accurate and the process was seamless.",
                avatar: "A",
                color: "#2563EB",
              },
              {
                name: "Sneha Patel",
                role: "Data Scientist @ Analytics Hub",
                text: "HireHub made it so easy to filter jobs by my exact skills and preferences. I applied to 10 jobs and got 3 interviews. Highly recommend!",
                avatar: "S",
                color: "#7c3aed",
              },
              {
                name: "Raju Sharma",
                role: "DevOps Engineer @ CloudBase",
                text: "The recruiter dashboard is fantastic. I posted a job and received quality applicants within 24 hours. This platform is a game-changer.",
                avatar: "R",
                color: "#059669",
              },
            ].map((t) => (
              <div key={t.name} className="home__testimonial-card">
                <p className="home__testimonial-text">"{t.text}"</p>
                <div className="home__testimonial-author">
                  <div className="home__testimonial-avatar" style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="home__cta">
        <div className="container">
          <div className="home__cta-content">
            <h2>Ready to Find Your Next Opportunity?</h2>
            <p>Join 2 million+ professionals who found their careers on HireHub.</p>
            <div className="home__cta-actions">
              <Link to="/register" className="btn btn-accent btn-lg">Create Free Account</Link>
              <Link to="/recruiter/post" className="btn btn-outline btn-lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}>
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
