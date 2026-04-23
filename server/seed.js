import sqlite3Pkg from 'sqlite3';
const sqlite3 = sqlite3Pkg.verbose();
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const titles = [
  "Frontend Developer", "Backend Developer", "Full Stack Engineer", 
  "Data Scientist", "Product Designer", "Mobile App Developer", 
  "DevOps Engineer", "Cloud Architect", "Machine Learning Engineer", 
  "UI/UX Designer", "QA Automation Engineer", "System Administrator"
];

const companies = [
  "TCS", "Infosys", "Wipro", "HCL Tech", "Tech Mahindra", 
  "Flipkart", "Swiggy", "Zomato", "Paytm", "CRED", 
  "Ola", "Reliance Jio", "Razorpay", "Postman", "Zoho"
];

const locations = ["Remote", "Mumbai", "Bangalore", "Pune", "Delhi NCR", "Hyderabad", "Chennai"];
const experiences = ["Entry", "Mid", "Senior", "Director"];
const types = ["Full-time", "Part-time", "Contract", "Internship"];
const salaries = ["4-6 LPA", "8-12 LPA", "15-20 LPA", "25-35 LPA", "40+ LPA", "Not Disclosed"];

const jobPortals = ["Naukri.com", "LinkedIn", "Indeed India", "Glassdoor"];

function generateSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function generateApplyUrl(portal, title, company, location) {
  const titleSlug = generateSlug(title);
  const locationSlug = generateSlug(location);

  // Using dynamic search URLs that actually resolve to real pages (preventing 404s)
  switch (portal) {
    case "Naukri.com":
      return `https://www.naukri.com/${titleSlug}-jobs-in-${locationSlug}`;
    case "LinkedIn":
      return `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(title + " " + company)}`;
    case "Indeed India":
      return `https://in.indeed.com/jobs?q=${encodeURIComponent(title)}&l=${encodeURIComponent(location)}`;
    case "Glassdoor":
      return `https://www.glassdoor.co.in/Job/jobs.htm?sc.keyword=${encodeURIComponent(title)}&locName=${encodeURIComponent(location)}`;
    default:
      return `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(title)}`;
  }
}

const realJobs = Array.from({ length: 180 }, (_, i) => {
  const title = titles[i % titles.length];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const experience_level = experiences[Math.floor(Math.random() * experiences.length)];
  const job_type = types[Math.floor(Math.random() * types.length)];
  const salary = salaries[Math.floor(Math.random() * salaries.length)];
  const portal = jobPortals[Math.floor(Math.random() * jobPortals.length)];
  
  return {
    title,
    company,
    location,
    experience_level,
    job_type,
    salary,
    portal,
    apply_url: generateApplyUrl(portal, title, company, location)
  };
});

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS jobs');
  db.run(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    job_type TEXT NOT NULL,
    salary TEXT NOT NULL,
    portal TEXT NOT NULL,
    apply_url TEXT NOT NULL
  )`);

  const stmt = db.prepare('INSERT INTO jobs (title, company, location, experience_level, job_type, salary, portal, apply_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  
  for (const job of realJobs) {
    stmt.run(job.title, job.company, job.location, job.experience_level, job.job_type, job.salary, job.portal, job.apply_url);
  }
  
  stmt.finalize();
  
  console.log('Database seeded successfully with valid search URLs and portal names!');
});

db.close();
