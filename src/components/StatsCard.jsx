import "./StatsCard.css";

export default function StatsCard({ icon, label, value, color = "blue", trend }) {
  const colorMap = {
    blue: { bg: "var(--primary-light)", color: "var(--primary)" },
    green: { bg: "var(--accent-light)", color: "var(--accent)" },
    yellow: { bg: "#fef3c7", color: "#d97706" },
    red: { bg: "var(--danger-light)", color: "var(--danger)" },
    purple: { bg: "#ede9fe", color: "#7c3aed" },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="stats-card">
      <div className="stats-card__icon" style={{ background: c.bg, color: c.color }}>
        {icon}
      </div>
      <div className="stats-card__body">
        <span className="stats-card__value">{value}</span>
        <span className="stats-card__label">{label}</span>
        {trend && (
          <span className={`stats-card__trend stats-card__trend--${trend.dir}`}>
            {trend.dir === "up" ? "↑" : "↓"} {trend.text}
          </span>
        )}
      </div>
    </div>
  );
}
