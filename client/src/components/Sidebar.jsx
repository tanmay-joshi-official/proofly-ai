'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mail,
  Link as LinkIcon,
  Image,
  Video,
  Shield,
  Moon,
  Sun,
  Zap
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/', icon: Shield, label: 'Dashboard' },
  { href: '/email', icon: Mail, label: 'Email Analysis' },
  { href: '/link', icon: LinkIcon, label: 'Link Safety' },
  { href: '/image', icon: Image, label: 'Image Auth' },
  { href: '/video', icon: Video, label: 'Video Deepfake' },
];

export default function Sidebar({ isDark, toggleDarkMode, isSidebarOpen, setIsSidebarOpen }) {
  const pathname = usePathname();

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div
        className={clsx(
          'lg:block',
          !isSidebarOpen && 'hidden',
          'lg:hidden fixed inset-0 bg-black/50 z-40'
        )}
        onClick={closeSidebar}
      />

      <aside
        className={clsx(
          'fixed left-0 top-0 h-screen w-64 bg-white dark:bg-dark-100 border-r border-gray-200 dark:border-gray-800',
          'z-50 hidden lg:block'
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">Proofly AI</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Trust Intelligence</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    'hover:bg-gray-100 dark:hover:bg-dark-200',
                    isActive && 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  )}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors btn-press"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-primary-600 dark:text-primary-400" size={16} />
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">Powered by MiniMax-2.7</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Advanced AI analysis with real-time threat intelligence
              </p>
            </div>
          </div>
        </div>
      </aside>

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={clsx(
          'fixed left-0 top-0 h-full w-64 bg-white dark:bg-dark-100 border-r border-gray-200 dark:border-gray-800',
          'z-50 lg:hidden'
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg">Proofly AI</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Trust Intelligence</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    'hover:bg-gray-100 dark:hover:bg-dark-200',
                    isActive && 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  )}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors btn-press"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-primary-600 dark:text-primary-400" size={16} />
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">Powered by MiniMax-2.7</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Advanced AI analysis with real-time threat intelligence
              </p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg bg-white dark:bg-dark-100 shadow-lg btn-press border border-gray-200 dark:border-gray-700"
    >
      <Menu size={24} className="text-gray-600 dark:text-gray-300" />
    </button>
  );
}
