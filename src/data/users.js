export const users = [
  {
    id: 1,
    name: "Ajay Kumar",
    email: "seeker@example.com",
    password: "demo-password",
    role: "job_seeker",
    phone: "+91 98765 43210",
    location: "Hyderabad",
    bio: "Passionate frontend developer with a love for building beautiful web experiences.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Node.js"],
    experience: [
      {
        id: 1,
        title: "Web Developer Intern",
        company: "StartupXYZ",
        duration: "Jun 2024 – Aug 2024",
        description: "Built React components and worked on API integration.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "B.Tech Computer Science",
        institution: "JNTU Hyderabad",
        year: "2021 – 2025",
      },
    ],
    savedJobs: [2, 5, 7],
    appliedJobs: [
      { jobId: 1, status: "Under Review", appliedOn: "2024-03-15" },
      { jobId: 3, status: "Shortlisted", appliedOn: "2024-03-10" },
      { jobId: 4, status: "Applied", appliedOn: "2024-03-20" },
    ],
    profileCompletion: 75,
    avatar: null,
    socialLinks: {
      linkedin: "https://linkedin.com/in/ajaykumar",
      github: "https://github.com/ajaykumar",
    },
  },
  {
    id: 2,
    name: "Priya Nair",
    email: "recruiter@example.com",
    password: "demo-password",
    role: "recruiter",
    phone: "+91 87654 32109",
    location: "Hyderabad",
    company: "TechNova",
    companyId: 1,
    bio: "HR Manager at TechNova with 5 years of tech recruitment experience.",
    postedJobs: [1, 13],
    avatar: null,
  },
];

// Credentials for the login page demo buttons
export const demoUsers = {
  jobSeeker: { email: "seeker@example.com", password: "demo-password" },
  recruiter: { email: "recruiter@example.com", password: "demo-password" },
};
