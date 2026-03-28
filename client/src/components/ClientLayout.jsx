'use client';

import { useState, useEffect } from 'react';
import Sidebar, { HamburgerButton } from './Sidebar';
import ScrollToTop from './ScrollToTop';

export default function ClientLayout({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    localStorage.setItem('darkMode', String(!isDark));
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        isDark={isDark} 
        toggleDarkMode={toggleDarkMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <HamburgerButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
      <main className="flex-1 min-h-screen lg:ml-64 transition-all duration-300">
        <div className={`pt-16 px-4 lg:px-8 ${isSidebarOpen ? 'lg:ml-0' : ''}`}>
          {children}
        </div>
      </main>
      <ScrollToTop />
    </div>
  );
}
