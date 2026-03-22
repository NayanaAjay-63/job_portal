import { useState } from "react";
import { companies } from "../data/companies";
import CompanyCard from "../components/CompanyCard";
import "./Companies.css";

export default function Companies() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");

  const industries = ["All", ...new Set(companies.map((c) => c.industry))];

  const filtered = companies.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
    const matchesIndustry = industry === "All" || c.industry === industry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="companies-page">
      {/* Header */}
      <div className="companies-page__header">
        <div className="container">
          <h1>Explore Companies</h1>
          <p>Discover top companies and find your perfect employer</p>
          <div className="companies-page__search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search companies, industries…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="companies-search"
              aria-label="Search companies"
            />
          </div>
        </div>
      </div>

      <div className="container companies-page__body">
        {/* Industry Filter */}
        <div className="companies-page__filters">
          {industries.map((ind) => (
            <button
              key={ind}
              className={`recruiter-filter-tab ${industry === ind ? "recruiter-filter-tab--active" : ""}`}
              onClick={() => setIndustry(ind)}
            >
              {ind}
            </button>
          ))}
        </div>

        <div className="companies-page__results-header">
          <p>{filtered.length} companies found</p>
        </div>

        {filtered.length === 0 ? (
          <div className="job-list__empty">
            <div className="job-list__empty-icon">🏢</div>
            <h3>No companies found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="companies-page__grid">
            {filtered.map((company) => (
              <div key={company.id} className="company-detail-card">
                <CompanyCard company={company} />
                <div className="company-detail-card__footer">
                  <p>{company.description}</p>
                  <div className="company-detail-card__meta">
                    <span>🏢 {company.size} employees</span>
                    <span>📅 Founded {company.founded}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
