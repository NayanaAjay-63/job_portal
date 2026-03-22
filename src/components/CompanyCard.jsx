import { Link } from "react-router-dom";
import "./CompanyCard.css";

const industryColors = [
  "#2563EB", "#7c3aed", "#0891b2", "#059669",
  "#d97706", "#dc2626", "#0ea5e9", "#8b5cf6",
];

export default function CompanyCard({ company }) {
  const color = industryColors[company.id % industryColors.length];
  const initials = company.name.slice(0, 2).toUpperCase();

  return (
    <Link to={`/companies`} className="company-card">
      <div className="company-card__logo" style={{ background: color }}>
        {initials}
      </div>
      <div className="company-card__info">
        <h3 className="company-card__name">{company.name}</h3>
        <span className="company-card__industry">{company.industry}</span>
        <div className="company-card__meta">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {company.location}
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
            </svg>
            {company.openings} openings
          </span>
        </div>
      </div>
    </Link>
  );
}
