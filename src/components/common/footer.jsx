"use client";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function Footer() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    // Determine current theme from several sources and keep in sync
    const readTheme = () => {
      try {
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') return stored;
      } catch (e) {
        // ignore
      }

      if (typeof document !== 'undefined') {
        const attr = document.documentElement.getAttribute('data-theme');
        if (attr === 'light' || attr === 'dark') return attr;
      }

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
      return 'dark';
    };

    setTheme(readTheme());

    // Observe changes to the data-theme attribute so the footer updates when theme toggles
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          const v = document.documentElement.getAttribute('data-theme');
          if (v === 'light' || v === 'dark') setTheme(v);
        }
      }
    });

    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, { attributes: true });
    }

    // Also listen for storage events (theme changed in another tab)
    const onStorage = (e) => {
      if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  return (
    <footer className="bg-transparent text-foreground">
      <div>
        {/* Top area: mobile-first stacked layout; becomes row on md+ */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src={theme === 'light' ? '/logo/logo2.png' : '/logo/logo.png'}
              alt="Spendex Logo"
              width={240}
              height={160}
              className="h-[96px] md:h-[120px] w-auto"
              priority={true}
            />
          </div>

          {/* Navigation: on mobile show stacked links; on md+ show horizontal */}
          <nav className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0 text-base text-center">
            <Link href="#features" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">
              Contact Us
            </Link>
            <Link href="#features2" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">
              Services
            </Link>
          </nav>

          {/* Social icons: visible on all sizes but more compact on mobile */}
          <nav className="flex items-center space-x-4 md:space-x-8">
            <Link href="#features" className="hover:text-foreground transition-colors">
              <FaFacebook className="text-xl md:text-2xl" />
            </Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">
              <FaInstagram className="text-xl md:text-2xl" />
            </Link>
            <Link href="#features2" className="hover:text-foreground transition-colors">
              <BsTwitterX className="text-xl md:text-2xl" />
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom area: stacked on mobile, row on md+ */}
      <div className="border-t px-4 md:px-10" style={{ borderColor: 'var(--muted)' }}>
        <div className="max-w-full flex flex-col md:flex-row justify-between items-center mx-auto px-6 py-4 text-center gap-2">
          <p className="text-sm text-muted">&copy; 2023 Copyright</p>
          <nav className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 mt-2 md:mt-0">
            <Link href="#privacy" className="text-sm text-muted hover:text-foreground">
              Privacy
            </Link>
            <Link href="#terms" className="text-sm text-muted hover:text-foreground">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
