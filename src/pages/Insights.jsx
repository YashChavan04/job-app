import React from "react";

export default function Insights() {
  const items = [
    {
      title: "Best time to apply each week",
      detail: "Candidates who apply Monday–Wednesday see 18% higher response rates.",
    },
    {
      title: "Average response timelines",
      detail: "Most companies reply within 7–10 days. Follow up after 5 days.",
    },
    {
      title: "Roles in highest demand",
      detail: "Frontend, data, and product roles are leading current hiring trends.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Search insights</h1>
        <p className="text-sm text-muted-foreground">
          Use live market patterns to plan when to apply, where to focus, and how to
          stand out.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm"
          >
            <p className="text-sm font-medium">{item.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

