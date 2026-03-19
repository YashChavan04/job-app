import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="mx-auto max-w-md space-y-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
      >
        Go back home
      </Link>
    </div>
  );
}

