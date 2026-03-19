import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    window.localStorage.setItem("isLoggedIn", "true");
    window.localStorage.setItem("userEmail", email);
    setError("");
    navigate(from, { replace: true });
  };

  return (
    <div className="mx-auto max-w-md space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to access your saved jobs, applications, and insights.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-border bg-card/80 p-6 shadow-sm"
      >
        {error && (
          <p className="text-xs font-medium text-red-600">{error}</p>
        )}

        <div className="space-y-1.5 text-left">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-muted-foreground"
          >
            Work email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5 text-left">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-muted-foreground"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="h-3 w-3 rounded border-border accent-foreground"
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button
            type="button"
            className="font-medium text-foreground hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </div>
  );
}