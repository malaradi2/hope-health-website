'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RiskScore, RiskLevel } from '../lib/types';
import { getRiskColor } from '../lib/utils';

interface RiskGaugeProps {
  riskScore: RiskScore;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  className?: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  riskScore,
  size = 'md',
  showDetails = false,
  className = ''
}) => {
  const sizeConfig = {
    sm: { radius: 40, strokeWidth: 6, fontSize: 'text-sm' },
    md: { radius: 60, strokeWidth: 8, fontSize: 'text-base' },
    lg: { radius: 80, strokeWidth: 10, fontSize: 'text-lg' }
  };

  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const strokeDasharray = circumference * 0.75; // 3/4 circle
  const strokeDashoffset = strokeDasharray - (strokeDasharray * riskScore.overall / 100);

  const getLevelColor = (level: RiskLevel) => {
    switch (level) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
    }
  };

  const getLevelText = (level: RiskLevel) => {
    switch (level) {
      case 'low': return 'Low Risk';
      case 'medium': return 'Medium Risk';
      case 'high': return 'High Risk';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg
          width={config.radius * 2 + config.strokeWidth * 2}
          height={config.radius * 2 + config.strokeWidth * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={config.radius + config.strokeWidth}
            cy={config.radius + config.strokeWidth}
            r={config.radius}
            stroke="#374151"
            strokeWidth={config.strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDasharray * 0.25}
            strokeLinecap="round"
          />

          {/* Progress circle */}
          <motion.circle
            cx={config.radius + config.strokeWidth}
            cy={config.radius + config.strokeWidth}
            r={config.radius}
            stroke={getLevelColor(riskScore.level)}
            strokeWidth={config.strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDasharray * 0.25}
            strokeLinecap="round"
            initial={{ strokeDashoffset: strokeDasharray }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 8px ${getLevelColor(riskScore.level)}40)`
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <div className={`font-bold text-white ${config.fontSize}`}>
              {riskScore.overall}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Risk Score
            </div>
          </motion.div>
        </div>
      </div>

      {/* Risk level label */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-4 text-center"
      >
        <div
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: `${getLevelColor(riskScore.level)}20`,
            color: getLevelColor(riskScore.level)
          }}
        >
          <div
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: getLevelColor(riskScore.level) }}
          />
          {getLevelText(riskScore.level)}
        </div>
      </motion.div>

      {/* Detailed breakdown */}
      {showDetails && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-6 w-full max-w-xs space-y-3"
        >
          {Object.entries(riskScore.factors).map(([factor, score]) => (
            <div key={factor} className="flex items-center justify-between">
              <span className="text-sm text-gray-400 capitalize">
                {factor.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: score <= 33 ? '#10B981' : score <= 66 ? '#F59E0B' : '#EF4444'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </div>
                <span className="text-xs text-gray-300 w-8 text-right">
                  {score}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};