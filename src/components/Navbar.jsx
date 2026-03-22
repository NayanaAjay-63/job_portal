import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!currentUser) return null;
    return currentUser.role === "recruiter" ? "/recruiter" : "/dashboard";
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#2563EB"/>
              <path d="M8 22V12L16 8L24 12V22L16 26L8 22Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="16" cy="17" r="3" fill="white"/>
            </svg>
          </div>
          <span className="navbar__logo-text">HireHub</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="navbar__links">
          <NavLink to="/jobs" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>
            Jobs
          </NavLink>
          <NavLink to="/companies" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>
            Companies
          </NavLink>
          {currentUser && (
            <NavLink to={getDashboardLink()} className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Right Section */}
        <div className="navbar__actions">
          {/* Theme Toggle */}
          <button className="navbar__icon-btn" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle dark mode">
            {theme === "light" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            )}
          </button>

          {currentUser ? (
            <div className="navbar__user">
              <NavLink to="/profile" className="navbar__avatar" title="Profile">
                <span>{currentUser.name?.charAt(0)?.toUpperCase() || "U"}</span>
              </NavLink>
              <div className="navbar__dropdown">
                <div className="navbar__dropdown-header">
                  <strong>{currentUser.name}</strong>
                  <span>{currentUser.role === "recruiter" ? "Recruiter" : "Job Seeker"}</span>
                </div>
                <Link to="/profile">My Profile</Link>
                {currentUser.role === "recruiter" ? (
                  <>
                    <Link to="/recruiter">Dashboard</Link>
                    <Link to="/recruiter/post">Post a Job</Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/dashboard/saved">Saved Jobs</Link>
                  </>
                )}
                <hr />
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            </div>
          ) : (
            <div className="navbar__auth">
              <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </div>
          )}

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        <NavLink to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</NavLink>
        <NavLink to="/companies" onClick={() => setMenuOpen(false)}>Companies</NavLink>
        {currentUser ? (
          <>
            <NavLink to={getDashboardLink()} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
            <button onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>Sign In</NavLink>
            <NavLink to="/register" onClick={() => setMenuOpen(false)}>Get Started</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
