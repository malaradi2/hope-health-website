'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HopeLogoProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const HopeLogo: React.FC<HopeLogoProps> = ({
  className = '',
  animated = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: 'easeOut'
      }
    }
  };

  const letters = ['H', 'O', 'P', 'E'];

  if (animated) {
    return (
      <div className={`relative ${className}`}>
        {/* Glow effect */}
        <motion.div
          variants={glowVariants}
          initial="hidden"
          animate="visible"
          className={`absolute inset-0 ${sizeClasses[size]} font-bold text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text blur-sm`}
        >
          HOPE
        </motion.div>

        {/* Main text */}
        <div className={`relative ${sizeClasses[size]} font-bold text-white flex`}>
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="hope-text-gradient"
              style={{
                display: 'inline-block',
                marginRight: letter === 'H' || letter === 'O' ? '0.05em' : '0'
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} font-bold hope-text-gradient ${className}`}>
      HOPE
    </div>
  );
};