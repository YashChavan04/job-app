import React from "react";

export default function Companies() {
  const featured = [
    "Google",
    "Amazon",
    "Microsoft",
    "TCS",
    "Infosys",
    "Swiggy",
    "Flipkart",
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Top companies</h1>
        <p className="text-sm text-muted-foreground">
          Discover teams that are actively hiring and learn more about their
          culture before you apply.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {featured.map((name) => (
          <div
            key={name}
            className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
              {name[0]}
            </div>
            <p className="text-sm font-medium">{name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              High-growth team · Product & engineering roles · Hybrid / remote.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

