import React from "react";
import { Button } from "@/components/ui/button";

export default function Resume() {
  const handleUpload = (e) => {
    e.preventDefault();
    alert("Resume uploaded!");
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Smart resume profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Upload your latest resume and we’ll keep your profile ready for
          one-click applications.
        </p>
      </div>

      <form
        onSubmit={handleUpload}
        className="space-y-5 rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center shadow-sm"
      >
        <div className="space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <span className="text-2xl">📄</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Drag & drop your resume here
            </p>
            <p className="text-xs text-muted-foreground">
              PDF or DOCX · Max 10 MB
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground">
          <label
            htmlFor="resume"
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-input bg-background px-4 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            Choose file
          </label>
          <input id="resume" type="file" className="hidden" />
          <span>No file selected</span>
        </div>

        <Button type="submit" className="w-full">
          Upload resume
        </Button>
      </form>

      <div className="rounded-2xl border border-border bg-muted/60 p-4 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Tips for a stronger match</p>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>Highlight measurable impact in your recent roles.</li>
          <li>Keep it to 1–2 pages for most roles.</li>
          <li>Tailor your resume to the roles you’re targeting.</li>
        </ul>
      </div>
    </div>
  );
}

