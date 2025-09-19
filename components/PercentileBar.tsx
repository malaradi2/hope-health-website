'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getPercentileLabel } from '../lib/utils';

interface PercentileBarProps {
  label: string;
  value: number;
  percentile: number;
  unit?: string;
  className?: string;
}

export const PercentileBar: React.FC<PercentileBarProps> = ({
  label,
  value,
  percentile,
  unit = '',
  className = ''
}) => {
  const getPercentileColor = (percentile: number) => {
    if (percentile >= 75) return '#10B981'; // Green
    if (percentile >= 50) return '#3B82F6'; // Blue
    if (percentile >= 25) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const percentileColor = getPercentileColor(percentile);
  const percentileText = getPercentileLabel(percentile);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          <span className="text-xs text-gray-500">vs peers</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-white">
            {value}
            {unit && <span className="text-sm text-gray-400 ml-1">{unit}</span>}
          </div>
        </div>
      </div>

      {/* Percentile bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">0th</span>
          <span className="text-gray-300 font-medium">{percentile}th percentile</span>
          <span className="text-gray-500">100th</span>
        </div>

        <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
          {/* Background segments */}
          <div className="absolute inset-0 flex">
            <div className="w-1/4 bg-red-500/30" />
            <div className="w-1/4 bg-amber-500/30" />
            <div className="w-1/4 bg-blue-500/30" />
            <div className="w-1/4 bg-teal-500/30" />
          </div>

          {/* User position indicator */}
          <motion.div
            className="absolute top-0 bottom-0 w-1 rounded-full shadow-lg"
            style={{
              backgroundColor: percentileColor,
              left: `${percentile}%`,
              boxShadow: `0 0 8px ${percentileColor}80`
            }}
            initial={{ left: '0%' }}
            animate={{ left: `${percentile}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Animated fill to position */}
          <motion.div
            className="absolute top-0 bottom-0 rounded-full"
            style={{
              backgroundColor: `${percentileColor}40`,
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${percentile}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        {/* Percentile labels */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Poor</span>
          <span>Below Avg</span>
          <span>Average</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
      </div>

      {/* Status badge */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${percentileColor}20`,
            color: percentileColor
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full mr-2"
            style={{ backgroundColor: percentileColor }}
          />
          {percentileText}
        </motion.div>
      </div>
    </div>
  );
};