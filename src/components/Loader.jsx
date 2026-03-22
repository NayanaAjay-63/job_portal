import "./Loader.css";

export default function Loader({ type = "job-card" }) {
  if (type === "job-card") {
    return (
      <div className="loader-card">
        <div className="loader-card__header">
          <div className="skeleton loader-card__logo" />
          <div className="loader-card__meta">
            <div className="skeleton loader-card__title" />
            <div className="skeleton loader-card__subtitle" />
          </div>
        </div>
        <div className="loader-card__details">
          <div className="skeleton loader-card__detail" />
          <div className="skeleton loader-card__detail" />
          <div className="skeleton loader-card__detail" />
        </div>
        <div className="loader-card__tags">
          <div className="skeleton loader-card__tag" />
          <div className="skeleton loader-card__tag" />
          <div className="skeleton loader-card__tag" />
        </div>
      </div>
    );
  }

  if (type === "stat") {
    return (
      <div className="loader-stat">
        <div className="skeleton loader-stat__icon" />
        <div className="skeleton loader-stat__num" />
        <div className="skeleton loader-stat__label" />
      </div>
    );
  }

  return <div className="skeleton" style={{ height: "100px", borderRadius: "var(--radius-md)" }} />;
}
