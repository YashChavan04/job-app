import React from "react";

const cards = [
  { label: "Applied jobs", value: "5", tone: "text-sky-600" },
  { label: "Saved jobs", value: "10", tone: "text-amber-600" },
  { label: "Interviews", value: "2", tone: "text-emerald-600" },
];

export default function Dashboard() {
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

      <section className="rounded-2xl border border-border bg-card/60 p-5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">This week’s focus</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Shortlist 3 new roles and follow up on 2 existing applications.
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Consistency wins offers
          </span>
        </div>
      </section>
    </div>
  );
}

