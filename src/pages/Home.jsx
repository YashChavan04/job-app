import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
        <div className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Hiring fast-growing teams and top talent
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Find your next{" "}
            <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              dream role
            </span>
            .
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Discover curated opportunities from leading companies, track every
            application in one place, and move from search to signed offer with
            confidence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            className="rounded-full px-6"
            onClick={() => navigate("/jobs")}
          >
            Browse open roles
          </Button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            View my dashboard
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground sm:text-sm">
          <div>
            <div className="font-semibold text-foreground">5k+</div>
            <div>curated roles</div>
          </div>
          <div>
            <div className="font-semibold text-foreground">95%</div>
            <div>see more relevant matches</div>
          </div>
          <div>
            <div className="font-semibold text-foreground">24/7</div>
            <div>application tracking</div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
          <p className="text-sm font-medium">One place for your search</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Keep jobs, resumes, and interview prep together so you always know
            what to do next.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
          <p className="text-sm font-medium">Signal over noise</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Focus on high-intent roles from trusted companies instead of endless
            scrolling.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
          <p className="text-sm font-medium">Built for momentum</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Light dashboards and reminders help you keep applications moving
            every week.
          </p>
        </div>
      </section>
    </div>
  );
}