
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
  }, [jobs, searchTerm, locationFilter]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleApply = (job) => {
    const applied = JSON.parse(window.localStorage.getItem("appliedJobs") || "[]");
    if (!applied.includes(job.id)) {
      applied.push(job.id);
      window.localStorage.setItem("appliedJobs", JSON.stringify(applied));
    }
    window.open(job.apply_url, '_blank');
  };

  if (loading) {
    return <h2 className="mt-10 text-center text-sm text-muted-foreground">Loading jobs…</h2>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Explore curated roles
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Search across top companies, locations, and experience levels.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Showing {filteredJobs.length} roles · Page {currentPage}
        </p>
      </div>

      <div className="grid gap-3 rounded-2xl border border-border bg-card/70 p-4 shadow-sm md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Search by title, company…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="hidden md:block"
          />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-3 py-1">Full-time</span>
          <span className="rounded-full bg-muted px-3 py-1">Remote</span>
          <span className="rounded-full bg-muted px-3 py-1">Entry · Mid · Senior</span>
        </div>
      </div>

      <div className="space-y-4">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold md:text-lg">{job.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {job.company} · {job.location}
                  </p>
                </div>
                <p className="text-sm font-semibold text-emerald-600">{job.salary}</p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-muted px-3 py-1">
                  💼 {job.experience_level}
                </span>
                <span className="rounded-full bg-muted px-3 py-1">
                  🕒 {job.job_type}
                </span>
                <span className="rounded-full border border-blue-200 bg-blue-50/50 text-blue-700 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300 px-3 py-1 font-medium">
                  🌐 Via {job.portal}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="max-w-md text-xs text-muted-foreground">
                  Join a high-impact team working on modern products, with clear growth paths
                  and collaborative culture.
                </p>
                <Button
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => handleApply(job)}
                >
                  Apply now
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No jobs found. Try adjusting your filters.</p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {Array.from(
          { length: Math.ceil(filteredJobs.length / jobsPerPage) },
          (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          )
        )}
      </div>
    </div>
  );
}

