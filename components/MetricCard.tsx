'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    direction: 'up' | 'down';
    isGood?: boolean;
  };
  icon?: LucideIcon;
  color?: 'teal' | 'blue' | 'purple' | 'amber' | 'red';
  trend?: number[];
  isLive?: boolean;
  className?: string;
  onClick?: () => void;
}

const colorMap = {
  teal: {
    bg: 'from-teal-500/20 to-teal-600/20',
    icon: 'text-teal-400',
    value: 'text-teal-300',
    border: 'border-teal-500/30'
  },
  blue: {
    bg: 'from-blue-500/20 to-blue-600/20',
    icon: 'text-blue-400',
    value: 'text-blue-300',
    border: 'border-blue-500/30'
  },
  purple: {
    bg: 'from-purple-500/20 to-purple-600/20',
    icon: 'text-purple-400',
    value: 'text-purple-300',
    border: 'border-purple-500/30'
  },
  amber: {
    bg: 'from-amber-500/20 to-amber-600/20',
    icon: 'text-amber-400',
    value: 'text-amber-300',
    border: 'border-amber-500/30'
  },
  red: {
    bg: 'from-red-500/20 to-red-600/20',
    icon: 'text-red-400',
    value: 'text-red-300',
    border: 'border-red-500/30'
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit = '',
  change,
  icon: Icon,
  color = 'teal',
  trend,
  isLive = false,
  className = '',
  onClick
}) => {
  const colors = colorMap[color];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`hope-card p-6 cursor-pointer relative overflow-hidden ${className}`}
      onClick={onClick}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50`} />

      {/* Live indicator */}
      {isLive && (
        <div className="absolute top-4 right-4">
          <div className={`w-2 h-2 ${colors.icon} rounded-full hope-live-pulse`} />
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className={`p-2 bg-gradient-to-br ${colors.bg} rounded-lg border ${colors.border}`}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
            )}
            <h3 className="text-sm font-medium text-gray-300">{title}</h3>
          </div>
        </div>

        {/* Value */}
        <div className="mb-2">
          <span className={`text-2xl font-bold ${colors.value}`}>
            {value}
          </span>
          {unit && (
            <span className="text-sm text-gray-400 ml-1">{unit}</span>
          )}
        </div>

        {/* Change indicator */}
        {change && (
          <div className="flex items-center space-x-2">
            <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
              change.isGood === undefined
                ? change.direction === 'up'
                  ? 'bg-teal-500/20 text-teal-400'
                  : 'bg-red-500/20 text-red-400'
                : change.isGood
                ? 'bg-teal-500/20 text-teal-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              <span className={`mr-1 ${change.direction === 'up' ? '↗' : '↘'}`}>
                {change.direction === 'up' ? '↗' : '↘'}
              </span>
              <span>{Math.abs(change.value)}%</span>
            </div>
          </div>
        )}

        {/* Mini trend line */}
        {trend && trend.length > 1 && (
          <div className="mt-4">
            <svg viewBox="0 0 100 20" className="w-full h-5">
              <polyline
                fill="none"
                stroke={`url(#gradient-${color})`}
                strokeWidth="2"
                points={trend
                  .map((point, index) => {
                    const x = (index / (trend.length - 1)) * 100;
                    const minVal = Math.min(...trend);
                    const maxVal = Math.max(...trend);
                    const range = maxVal - minVal || 1;
                    const y = 20 - ((point - minVal) / range) * 20;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={colors.icon.replace('text-', '')} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={colors.icon.replace('text-', '')} stopOpacity={0.4} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};