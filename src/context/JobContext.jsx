import { createContext, useContext, useState, useEffect } from "react";
import { jobs } from "../data/jobs";
import { useAuth } from "./AuthContext";

const JobContext = createContext(null);

export function JobProvider({ children }) {
  const { currentUser, updateUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [filters, setFilters] = useState({
    type: [],
    mode: [],
    experience: [],
    salary: "",
    category: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  const savedJobIds = currentUser?.savedJobs || [];
  const appliedJobIds = currentUser?.appliedJobs?.map((a) => a.jobId) || [];

  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.skills.some((s) => s.toLowerCase().includes(q)) ||
      job.location.toLowerCase().includes(q);

    const lq = locationQuery.toLowerCase();
    const matchesLocation =
      !lq || job.location.toLowerCase().includes(lq);

    const matchesType =
      filters.type.length === 0 || filters.type.includes(job.type);
    const matchesMode =
      filters.mode.length === 0 || filters.mode.includes(job.mode);
    const matchesExp =
      filters.experience.length === 0 || filters.experience.includes(job.experience);
    const matchesCategory =
      filters.category.length === 0 || filters.category.includes(job.category);

    return matchesSearch && matchesLocation && matchesType && matchesMode && matchesExp && matchesCategory;
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const saveJob = (jobId) => {
    if (!currentUser) return;
    const newSaved = savedJobIds.includes(jobId)
      ? savedJobIds.filter((id) => id !== jobId)
      : [...savedJobIds, jobId];
    updateUser({ savedJobs: newSaved });
  };

  const applyJob = (jobId) => {
    if (!currentUser) return false;
    if (appliedJobIds.includes(jobId)) return false;
    const newApplied = [
      ...currentUser.appliedJobs,
      { jobId, status: "Applied", appliedOn: new Date().toISOString().split("T")[0] },
    ];
    updateUser({ appliedJobs: newApplied });
    return true;
  };

  const isSaved = (jobId) => savedJobIds.includes(jobId);
  const isApplied = (jobId) => appliedJobIds.includes(jobId);

  const resetFilters = () => {
    setFilters({ type: [], mode: [], experience: [], salary: "", category: [] });
    setSearchQuery("");
    setLocationQuery("");
    setCurrentPage(1);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        paginatedJobs,
        searchQuery,
        setSearchQuery,
        locationQuery,
        setLocationQuery,
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        totalPages,
        savedJobIds,
        appliedJobIds,
        saveJob,
        applyJob,
        isSaved,
        isApplied,
        resetFilters,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  return useContext(JobContext);
}
