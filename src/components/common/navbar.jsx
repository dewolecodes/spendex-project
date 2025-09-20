"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") setTheme(stored);
      else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) setTheme("light");
      else setTheme("dark");
    } catch (e) {}
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    setTheme(next);
    if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <div className={`md:hidden fixed top-0 left-0 right-0 z-50 bg-transparent transition-all ${scrolled ? 'bg-opacity-90 backdrop-blur-md' : 'bg-opacity-0'}`}>
  <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo left */}
        <Link href="/" className="flex items-center">
          <img src={theme === "light" ? "/logo/logo2.png" : "/logo/logo.png"} alt="Spendex" className="h-28 w-auto logo-mobile" />
        </Link>

        {/* Right icons: theme toggle + menu */}
        <div className="flex items-center space-x-3">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-muted/10 transition-colors"
          >
            {theme === "light" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            )}
          </button>

          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md hover:bg-muted/10 transition-colors"
          >
            {/* Hamburger */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </div>
      </div>

      {/* Side menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* Panel */}
        <aside
          className={`absolute top-0 right-0 h-full w-72 bg-surface/90 text-foreground shadow-lg transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
          aria-label="Mobile menu"
        >
            <div className="p-4 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              {/* Slightly larger logo inside the side panel */}
              <img src={theme === "light" ? "/logo/logo2.png" : "/logo/logo.png"} alt="Spendex" className="h-20 w-auto" />
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
          </div>

          <nav className="px-4 py-2 space-y-3 text-lg">
            <Link href="#features" onClick={() => setOpen(false)} className="block py-2 hover:text-foreground">
              About
            </Link>
            <Link href="#fhi" onClick={() => setOpen(false)} className="block py-2 hover:text-foreground">
              Blog
            </Link>
            <Link href="#features2" onClick={() => setOpen(false)} className="block py-2 hover:text-foreground">
              Features
            </Link>
            <Link href="#faq" onClick={() => setOpen(false)} className="block py-2 hover:text-foreground">
              FAQ
            </Link>
            <Link href="/dashboard/wireframe" onClick={() => setOpen(false)} className="block py-2 btn btn-primary w-full text-center">
              Get Started
            </Link>

            <div className="pt-4 border-t border-muted/20">
              <button onClick={toggleTheme} className="w-full text-left py-2">
                Toggle theme
              </button>
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
}
