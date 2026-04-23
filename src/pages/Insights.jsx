import React, { useState, useEffect, useMemo } from "react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis
} from "recharts";

export default function Insights() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  const experienceData = useMemo(() => {
    if (!jobs.length) return [];
    const counts = jobs.reduce((acc, job) => {
      acc[job.experience_level] = (acc[job.experience_level] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [jobs]);

  const companyData = useMemo(() => {
    if (!jobs.length) return [];
    const counts = jobs.reduce((acc, job) => {
      acc[job.company] = (acc[job.company] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [jobs]);

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#6366f1'];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Search insights</h1>
        <p className="text-sm text-muted-foreground">
          Live market patterns based on real platform data to help you target your applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Experience Distribution Pie Chart */}
        <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
          <h2 className="text-sm font-medium mb-1">Experience Distribution</h2>
          <p className="text-xs text-muted-foreground mb-6">Ratio of open roles by seniority level</p>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={experienceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {experienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Companies Bar Chart */}
        <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
          <h2 className="text-sm font-medium mb-1">Top Hiring Companies</h2>
          <p className="text-xs text-muted-foreground mb-6">Companies with the most active listings</p>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companyData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} width={80} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {companyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#10b981" : "#a7f3d0"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-muted/50 p-5 text-sm">
        <h3 className="font-medium text-foreground mb-3">Key Takeaways</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Focus your efforts on <strong>{companyData[0]?.name || "top"}</strong> and <strong>{companyData[1]?.name || "leading"}</strong> companies, as they represent the bulk of active hiring volume right now.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>The market currently favors <strong>Mid-level</strong> engineers. If you are Entry-level, consider emphasizing projects that demonstrate Mid-level autonomy.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
