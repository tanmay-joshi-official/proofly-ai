'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ScrollToTop from './ScrollToTop';

export default function ClientLayout({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    localStorage.setItem('darkMode', String(!isDark));
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
        {children}
      </main>
      <ScrollToTop />
    </div>
  );
}
