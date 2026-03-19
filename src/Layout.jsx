import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  { to: "/resume", label: "Resume" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/companies", label: "Companies" },
  { to: "/insights", label: "Insights" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem("isLoggedIn") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-lg font-semibold">
              J
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-muted-foreground">
                Job Portal
              </span>
              <span className="text-xs text-muted-foreground">
                Track, apply, succeed
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            {links.map((link) => {
              const isActive =
                link.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-full px-3 py-1 transition-colors ${
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <span>☀️</span> : <span>🌙</span>}
            </Button>

            <div className="hidden sm:block">
              {isLoggedIn ? (
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button size="sm" variant="outline">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl px-4 py-10">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}