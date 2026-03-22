import { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import FilterPanel from "../components/FilterPanel";
import JobList from "../components/JobList";
import Pagination from "../components/Pagination";
import "./Jobs.css";

export default function Jobs() {
  const {
    paginatedJobs,
    filteredJobs,
    searchQuery,
    setSearchQuery,
    locationQuery,
    setLocationQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    filters,
    resetFilters,
  } = useJobs();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localLoc, setLocalLoc] = useState(locationQuery);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchQuery(localSearch);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [localSearch]);

  useEffect(() => {
    const t = setTimeout(() => {
      setLocationQuery(localLoc);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [localLoc]);

  const sortOptions = ["Most Relevant", "Newest", "Salary: High to Low", "Most Applicants"];
  const [sort, setSort] = useState("Most Relevant");

  return (
    <div className="jobs-page">
      {/* Top Search Bar */}
      <div className="jobs-page__search-bar">
        <div className="container">
          <div className="jobs-page__search-row">
            <div className="jobs-page__search-input">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Job title, skill, or company…"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                id="jobs-search"
                aria-label="Search jobs"
              />
              {localSearch && (
                <button onClick={() => { setLocalSearch(""); setSearchQuery(""); }} className="jobs-page__clear">✕</button>
              )}
            </div>
            <div className="jobs-page__search-input">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                type="text"
                placeholder="Location or Remote…"
                value={localLoc}
                onChange={(e) => setLocalLoc(e.target.value)}
                id="jobs-location"
                aria-label="Location"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="jobs-page__layout">
          {/* Filters Sidebar */}
          <div className={`jobs-page__filters ${showFilters ? "jobs-page__filters--open" : ""}`}>
            <FilterPanel />
          </div>

          {/* Main Content */}
          <div className="jobs-page__main">
            {/* Results Header */}
            <div className="jobs-page__results-header">
              <div>
                <h1 className="jobs-page__title">
                  {searchQuery ? `Results for "${searchQuery}"` : "All Jobs"}
                </h1>
                <p className="jobs-page__count">
                  {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <div className="jobs-page__controls">
                <button
                  className="btn btn-ghost btn-sm jobs-page__filter-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <line x1="4" y1="6" x2="20" y2="6"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                    <line x1="11" y1="18" x2="13" y2="18"/>
                  </svg>
                  Filters
                </button>
                <select
                  className="form-input form-select jobs-page__sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  id="jobs-sort"
                  aria-label="Sort jobs"
                >
                  {sortOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filter Tags */}
            {(filters.type.length > 0 || filters.mode.length > 0 || filters.experience.length > 0) && (
              <div className="jobs-page__filter-tags">
                {[...filters.type, ...filters.mode, ...filters.experience].map((tag) => (
                  <span key={tag} className="badge badge-blue jobs-page__filter-tag">
                    {tag}
                  </span>
                ))}
                <button className="jobs-page__clear-all" onClick={resetFilters}>
                  Clear all ✕
                </button>
              </div>
            )}

            <JobList jobs={paginatedJobs} loading={loading} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => { setCurrentPage(p); window.scrollTo(0, 0); }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
