import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "", role: "job_seeker", phone: "", location: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const result = register({ name: form.name, email: form.email, role: form.role, phone: form.phone, location: form.location });
    setLoading(false);
    if (result.success) {
      navigate(form.role === "recruiter" ? "/recruiter" : "/dashboard");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
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
          <h1>Create your account</h1>
          <p>Join millions of professionals on HireHub</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Role Selection */}
          <div className="auth-role-tabs">
            {[
              { val: "job_seeker", label: "I'm Looking for a Job" },
              { val: "recruiter", label: "I'm Hiring" },
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

          <div className="auth-form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Full Name</label>
              <input id="reg-name" type="text" name="name" className="form-input" placeholder="Ajay Kumar" value={form.name} onChange={handleChange} required />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email Address</label>
              <input id="reg-email" type="email" name="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-phone">Phone Number</label>
              <input id="reg-phone" type="tel" name="phone" className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-location">Location</label>
              <input id="reg-location" type="text" name="location" className="form-input" placeholder="Hyderabad" value={form.location} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password</label>
              <input id="reg-password" type="password" name="password" className="form-input" placeholder="Min 6 characters" value={form.password} onChange={handleChange} required />
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
              <input id="reg-confirm" type="password" name="confirm" className="form-input" placeholder="Repeat password" value={form.confirm} onChange={handleChange} required />
              {errors.confirm && <p className="form-error">{errors.confirm}</p>}
            </div>
          </div>

          <p className="auth-terms">
            By creating an account, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
