import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import "./Profile.css";

export default function Profile() {
  const { currentUser, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    location: currentUser?.location || "",
    bio: currentUser?.bio || "",
    skills: (currentUser?.skills || []).join(", "),
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const completion = currentUser?.profileCompletion || 0;
  const initials = currentUser?.name?.slice(0, 2)?.toUpperCase() || "U";

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-layout">
          <Sidebar />
          <div className="dashboard-main">
            {/* Profile Header */}
            <div className="profile-header card">
              <div className="profile-header__avatar">{initials}</div>
              <div className="profile-header__info">
                <h1>{currentUser?.name}</h1>
                <p>{currentUser?.role === "recruiter" ? "Recruiter" : "Job Seeker"}</p>
                <p className="profile-header__location">📍 {currentUser?.location || "Location not set"}</p>
              </div>
              <div className="profile-header__completion">
                <span className="profile-header__completion-label">Profile {completion}% complete</span>
                <div className="progress-bar">
                  <div className="progress-bar__fill" style={{ width: `${completion}%` }} />
                </div>
              </div>
            </div>

            {saved && (
              <div className="profile-saved-msg">
                ✓ Profile updated successfully!
              </div>
            )}

            {/* Edit Form */}
            <div className="card profile-section">
              <div className="profile-section__header">
                <h3>Personal Information</h3>
                <button
                  className={`btn btn-sm ${editing ? "btn-ghost" : "btn-outline"}`}
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? "Cancel" : "Edit"}
                </button>
              </div>

              <form onSubmit={handleSave} className="profile-form">
                <div className="auth-form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="pf-name">Full Name</label>
                    <input id="pf-name" name="name" type="text" className="form-input" value={form.name} onChange={handleChange} disabled={!editing} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pf-email">Email</label>
                    <input id="pf-email" name="email" type="email" className="form-input" value={form.email} onChange={handleChange} disabled={!editing} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pf-phone">Phone</label>
                    <input id="pf-phone" name="phone" type="tel" className="form-input" value={form.phone} onChange={handleChange} disabled={!editing} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pf-location">Location</label>
                    <input id="pf-location" name="location" type="text" className="form-input" value={form.location} onChange={handleChange} disabled={!editing} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pf-bio">Bio</label>
                  <textarea id="pf-bio" name="bio" className="form-input" rows="3" value={form.bio} onChange={handleChange} disabled={!editing} style={{ resize: "vertical" }} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pf-skills">Skills (comma-separated)</label>
                  <input id="pf-skills" name="skills" type="text" className="form-input" value={form.skills} onChange={handleChange} disabled={!editing} placeholder="React, JavaScript, Node.js…" />
                </div>

                {editing && (
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                )}
              </form>

              {/* Skills Display */}
              {!editing && currentUser?.skills?.length > 0 && (
                <div className="profile-skills">
                  <h4>Skills</h4>
                  <div className="profile-skills-list">
                    {currentUser.skills.map((s) => (
                      <span key={s} className="badge badge-blue">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Experience */}
            {currentUser?.experience?.length > 0 && (
              <div className="card profile-section">
                <div className="profile-section__header">
                  <h3>Experience</h3>
                </div>
                {currentUser.experience.map((exp) => (
                  <div key={exp.id} className="profile-timeline-item">
                    <div className="profile-timeline-dot" />
                    <div>
                      <strong>{exp.title}</strong>
                      <p>{exp.company} · {exp.duration}</p>
                      <p className="profile-timeline-desc">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {currentUser?.education?.length > 0 && (
              <div className="card profile-section">
                <div className="profile-section__header">
                  <h3>Education</h3>
                </div>
                {currentUser.education.map((edu) => (
                  <div key={edu.id} className="profile-timeline-item">
                    <div className="profile-timeline-dot" style={{ background: "var(--accent)" }} />
                    <div>
                      <strong>{edu.degree}</strong>
                      <p>{edu.institution} · {edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resume Upload */}
            <div className="card profile-section">
              <div className="profile-section__header">
                <h3>Resume</h3>
              </div>
              <div className="profile-resume">
                <div className="profile-resume__icon">📄</div>
                <div>
                  <p>Upload your resume (PDF, DOC)</p>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Max file size: 5MB</p>
                </div>
                <label className="btn btn-outline btn-sm profile-resume__upload" htmlFor="resume-upload">
                  Upload Resume
                  <input id="resume-upload" type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
