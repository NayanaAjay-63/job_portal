import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { demoUsers } from "../data/users";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "job_seeker" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(form.email, form.password, form.role);
    setLoading(false);
    if (result.success) {
      navigate(form.role === "recruiter" ? "/recruiter" : "/dashboard");
    } else {
      setError("Invalid credentials. Use demo credentials below.");
    }
  };

  const fillDemo = (role) => {
    const creds = role === "recruiter" ? demoUsers.recruiter : demoUsers.jobSeeker;
    setForm({ email: creds.email, password: creds.password, role });
    setError("");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <div className="auth-logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#2563EB"/>
                <path d="M8 22V12L16 8L24 12V22L16 26L8 22Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="16" cy="17" r="3" fill="white"/>
              </svg>
            </div>
            <span>HireHub</span>
          </Link>
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {/* Demo Credentials */}
        <div className="auth-demo">
          <p>Try demo accounts:</p>
          <div className="auth-demo-btns">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => fillDemo("job_seeker")}>
              👤 Job Seeker Demo
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => fillDemo("recruiter")}>
              🏢 Recruiter Demo
            </button>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Role Selection */}
          <div className="auth-role-tabs">
            {[
              { val: "job_seeker", label: "Job Seeker" },
              { val: "recruiter", label: "Recruiter" },
            ].map((r) => (
              <button
                key={r.val}
                type="button"
                className={`auth-role-tab ${form.role === r.val ? "auth-role-tab--active" : ""}`}
                onClick={() => setForm((prev) => ({ ...prev, role: r.val }))}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              name="email"
              className="form-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              Password
              <Link to="#" className="auth-forgot">Forgot password?</Link>
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? (
              <span className="auth-spinner" />
            ) : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one free →</Link>
        </p>
      </div>
    </div>
  );
}
