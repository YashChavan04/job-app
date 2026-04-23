import React, { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [appliedCount, setAppliedCount] = useState(0);
  const [hasResume, setHasResume] = useState(false);

  useEffect(() => {
    // Fetch total jobs
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));

    // Get applied count
    const applied = JSON.parse(window.localStorage.getItem("appliedJobs") || "[]");
    setAppliedCount(applied.length);

    // Get resume status
    const resume = window.localStorage.getItem("uploadedResume");
    setHasResume(!!resume);
  }, []);

  const locationData = useMemo(() => {
    if (!jobs.length) return [];
    
    const counts = jobs.reduce((acc, job) => {
      acc[job.location] = (acc[job.location] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 locations
  }, [jobs]);

  const cards = [
    { label: "Applied jobs", value: appliedCount.toString(), tone: "text-sky-600" },
    { label: "Total Platform Jobs", value: jobs.length.toString(), tone: "text-amber-600" },
    { label: "Resume Uploaded", value: hasResume ? "Yes" : "No", tone: "text-emerald-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Your search at a glance
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your pipeline across applications, saved roles, and upcoming
            conversations.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Updated just now · Keep applications moving every week.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm"
          >
            <p className="text-xs font-medium text-muted-foreground">
              {card.label}
            </p>
            <p className={`mt-3 text-2xl font-semibold ${card.tone}`}>
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
          <h2 className="text-sm font-medium mb-4">Top Hiring Locations</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#0284c7" : "#bae6fd"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card/60 p-5 flex flex-col justify-center">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="font-medium">This week’s focus</p>
              <p className="mt-1 text-sm text-muted-foreground">
                You have applied to {appliedCount} roles so far. Try to hit 5 applications this week to maintain momentum!
              </p>
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2.5 mb-2">
            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${Math.min((appliedCount / 5) * 100, 100)}%` }}></div>
          </div>
          <p className="text-xs text-muted-foreground text-right">{appliedCount} / 5 target</p>

          <div className="mt-6 flex items-center justify-between">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              Consistency wins offers
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
