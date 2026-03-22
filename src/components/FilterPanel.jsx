import { useJobs } from "../context/JobContext";
import "./FilterPanel.css";

const jobTypes = ["Internship", "Full-time", "Part-time", "Contract"];
const modes = ["Remote", "Hybrid", "On-site"];
const experiences = ["Fresher", "0–2 Years", "1–3 Years", "2–4 Years", "3–6 Years", "6+ Years", "8+ Years"];
const categories = ["Technology", "Design", "Data Science", "Marketing", "Management", "Human Resources", "Finance", "Sales"];

export default function FilterPanel() {
  const { filters, setFilters, resetFilters, filteredJobs } = useJobs();

  const toggle = (key, value) => {
    const arr = filters[key];
    const updated = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    setFilters((prev) => ({ ...prev, [key]: updated }));
  };

  const hasFilters =
    filters.type.length > 0 ||
    filters.mode.length > 0 ||
    filters.experience.length > 0 ||
    filters.category.length > 0;

  return (
    <aside className="filter-panel">
      <div className="filter-panel__header">
        <h3>Filters</h3>
        <span className="filter-panel__count">{filteredJobs.length} results</span>
        {hasFilters && (
          <button className="filter-panel__reset" onClick={resetFilters}>
            Reset all
          </button>
        )}
      </div>

      <FilterSection title="Job Type">
        {jobTypes.map((t) => (
          <CheckboxItem
            key={t}
            label={t}
            checked={filters.type.includes(t)}
            onChange={() => toggle("type", t)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Work Mode">
        {modes.map((m) => (
          <CheckboxItem
            key={m}
            label={m}
            checked={filters.mode.includes(m)}
            onChange={() => toggle("mode", m)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Experience">
        {experiences.map((e) => (
          <CheckboxItem
            key={e}
            label={e}
            checked={filters.experience.includes(e)}
            onChange={() => toggle("experience", e)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Category">
        {categories.map((c) => (
          <CheckboxItem
            key={c}
            label={c}
            checked={filters.category.includes(c)}
            onChange={() => toggle("category", c)}
          />
        ))}
      </FilterSection>
    </aside>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="filter-section">
      <h4 className="filter-section__title">{title}</h4>
      <div className="filter-section__options">{children}</div>
    </div>
  );
}

function CheckboxItem({ label, checked, onChange }) {
  return (
    <label className="checkbox-item">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkbox-item__mark" />
      <span className="checkbox-item__label">{label}</span>
    </label>
  );
}
