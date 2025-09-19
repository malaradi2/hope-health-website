'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'switch' | 'dropdown';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'button'
}) => {
  const { theme, toggleTheme, setTheme } = useTheme();

  if (variant === 'switch') {
    return (
      <motion.button
        onClick={toggleTheme}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 ${
          theme === 'dark'
            ? 'bg-blue-600'
            : 'bg-gray-200'
        } ${className}`}
        whileTap={{ scale: 0.95 }}
      >
        <span className="sr-only">Toggle theme</span>
        <motion.span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
          }`}
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {theme === 'dark' ? (
            <Moon className="h-3 w-3 text-blue-600 m-0.5" />
          ) : (
            <Sun className="h-3 w-3 text-gray-600 m-0.5" />
          )}
        </motion.span>
      </motion.button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
          {(['light', 'dark'] as const).map((themeName) => (
            <button
              key={themeName}
              onClick={() => setTheme(themeName)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                theme === themeName
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {themeName === 'light' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              <span className="capitalize">{themeName}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default button variant
  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2 rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${className}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0.8
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-blue-400" />
        )}
      </motion.div>
      <span className="sr-only">
        Switch to {theme === 'dark' ? 'light' : 'dark'} theme
      </span>
    </motion.button>
  );
};