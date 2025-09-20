"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/common/navbar";

export default function Header() {
  const pathname = usePathname && usePathname();
  // If we're on the chat page (dashboard/wireframe), hide the desktop top navbar
  const hideDesktopHeader = pathname && pathname.startsWith("/dashboard/wireframe");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    try{
      const stored = localStorage.getItem('theme');
      if(stored === 'light' || stored === 'dark'){
        setTheme(stored);
      } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){
        setTheme('light');
      } else {
        setTheme('dark');
      }
    }catch(e){ /* ignore */ }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    try{ localStorage.setItem('theme', next); }catch(e){}
    setTheme(next);
    if(typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', next);
  };
  return (
    <>
      <header
        className={`${hideDesktopHeader ? 'hidden' : 'hidden md:block'} fixed top-0 w-full z-50 bg-transparent ${
          scrolled ? "bg-opacity-90 backdrop-blur-md" : "bg-opacity-0"
        } transition-all`}
      >
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img src={theme === 'light' ? 'logo/logo2.png' : 'logo/logo.png'} alt="Spendex Logo" className="h-[120px] w-auto" />
          </Link>
        </div>

        {/* Navigation */}
  <nav className="hidden md:flex items-center gap-3 space-x-6 text-lg text-muted">
          <Link href="#features" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#fhi" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link
            href="#features2"
            className="hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link href="#faq" className="hover:text-foreground transition-colors">
            FAQ
          </Link>

          {/* Button */}
          <Link href="/dashboard/wireframe" className="btn btn-primary text-base font-medium px-3 py-1">
            Get Started
          </Link>
          {/* Theme toggle */}
          <button
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
            aria-pressed={theme === 'light'}
            onClick={toggleTheme}
            className="btn-toggle ml-2 mobile-visible"
            style={{padding:'0.25rem 0.4rem'}}
          >
            {/* Layered icons: sun and moon. Only one is fully visible based on theme state. */}
            <span style={{position:'relative', width:16, height:16, display:'inline-block'}}>
              <svg
                className={`theme-icon ${theme === 'light' ? 'theme-icon--active' : 'theme-icon--enter'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{position:'absolute', left:0, top:0}}
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>

              <svg
                className={`theme-icon ${theme === 'dark' ? 'theme-icon--active' : 'theme-icon--enter'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{position:'absolute', left:0, top:0}}
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </span>
          </button>
        </nav>
      </div>
    </header>

      {/* Mobile navbar — hide on chat page (we handle mobile menu inside chat page itself) */}
      {!hideDesktopHeader && <Navbar />}
    </>
  );
}
