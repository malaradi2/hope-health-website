'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Clock,
  User,
  AlertTriangle,
  X,
  MessageCircle,
  Shield,
  UserCheck,
  FileText,
  Star
} from 'lucide-react';
import { AdviceItem as AdviceItemType, AdviceApprovalStatus } from '../lib/types';
import { formatTime } from '../lib/utils';

interface AdviceItemProps {
  advice: AdviceItemType;
  showApproval?: boolean;
  onApprove?: (id: string) => void;
  className?: string;
  compact?: boolean;
}

export const AdviceItem: React.FC<AdviceItemProps> = ({
  advice,
  showApproval = true,
  onApprove,
  className = '',
  compact = false
}) => {
  const getStatusConfig = (status: AdviceApprovalStatus) => {
    switch (status) {
      case 'approved':
        return {
          color: 'text-teal-400',
          bgColor: 'bg-teal-500/20',
          borderColor: 'border-teal-500/30',
          icon: Check,
          label: 'Approved by Doctor',
          description: 'Clinically validated recommendation',
          priority: 'high'
        };
      case 'under_review':
        return {
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30',
          icon: FileText,
          label: 'Under Clinical Review',
          description: 'Being evaluated by medical team',
          priority: 'medium'
        };
      case 'needs_clarification':
        return {
          color: 'text-amber-400',
          bgColor: 'bg-amber-500/20',
          borderColor: 'border-amber-500/30',
          icon: MessageCircle,
          label: 'Clarification Requested',
          description: 'Doctor needs additional information',
          priority: 'high'
        };
      case 'requires_consultation':
        return {
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/20',
          borderColor: 'border-purple-500/30',
          icon: UserCheck,
          label: 'Consultation Required',
          description: 'Schedule appointment with your provider',
          priority: 'high'
        };
      case 'not_approved':
        return {
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          icon: X,
          label: 'Not Recommended',
          description: 'Clinical team advises against this',
          priority: 'high'
        };
      case 'pending_review':
      default:
        return {
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20',
          borderColor: 'border-gray-500/30',
          icon: Clock,
          label: 'Awaiting Review',
          description: 'Submitted for clinical evaluation',
          priority: 'low'
        };
    }
  };

  const statusConfig = getStatusConfig(advice.approvalStatus);
  const StatusIcon = statusConfig.icon;
  const latestReview = advice.reviewHistory[advice.reviewHistory.length - 1];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-teal-400';
    if (confidence >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getEvidenceIcon = (level: string) => {
    switch (level) {
      case 'strong': return '🟢';
      case 'moderate': return '🟡';
      case 'limited': return '🟠';
      default: return '⚪';
    }
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`hope-card p-3 border-l-4 ${statusConfig.borderColor} ${className}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white mb-1 line-clamp-1">
              {advice.summary}
            </h4>
            <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full text-xs ${statusConfig.bgColor} ${statusConfig.color}`}>
              <StatusIcon className="w-3 h-3" />
              <span>{statusConfig.label}</span>
            </div>
          </div>
          <div className="text-right ml-3">
            <div className={`text-xs font-medium ${getConfidenceColor(advice.confidence)}`}>
              {advice.confidence}% confidence
            </div>
            <div className="text-xs text-gray-500">{formatTime(advice.createdAt)}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`hope-card border-l-4 ${statusConfig.borderColor} ${className} ${
        statusConfig.priority === 'high' ? 'ring-1 ring-amber-500/20' : ''
      }`}
    >
      {/* Header with Status */}
      <div className="p-4 pb-3 border-b border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-sm font-medium text-white line-clamp-2">
                {advice.summary}
              </h3>
              {advice.urgencyLevel === 'high' && (
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-400">
              <span>{advice.category}</span>
              <span>•</span>
              <span>{formatTime(advice.createdAt)}</span>
              {advice.medicationRelated && (
                <>
                  <span>•</span>
                  <span className="text-purple-400">Medication-related</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Professional Status Badge */}
        <div className={`inline-flex items-center space-x-3 px-4 py-2 rounded-lg border ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
          <div className="flex items-center space-x-2">
            <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
            <div>
              <div className={`text-sm font-semibold ${statusConfig.color}`}>
                {statusConfig.label}
              </div>
              <div className="text-xs text-gray-400">
                {statusConfig.description}
              </div>
            </div>
          </div>

          {latestReview && (
            <div className="border-l border-gray-600 pl-3">
              <div className="flex items-center space-x-1 text-xs text-gray-300">
                <Shield className="w-3 h-3" />
                <span>{latestReview.reviewerName}</span>
              </div>
              <div className="text-xs text-gray-500">{latestReview.reviewerCredentials}</div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-3">
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          {advice.text}
        </p>

        {/* Clinical Details */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-800/30 rounded-lg">
          <div className="text-center">
            <div className={`text-sm font-semibold ${getConfidenceColor(advice.confidence)}`}>
              {advice.confidence}%
            </div>
            <div className="text-xs text-gray-500">AI Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-white">
              {getEvidenceIcon(advice.evidenceLevel)} {advice.evidenceLevel}
            </div>
            <div className="text-xs text-gray-500">Evidence Level</div>
          </div>
          <div className="text-center">
            <div className={`text-sm font-semibold ${
              advice.urgencyLevel === 'high' ? 'text-red-400' :
              advice.urgencyLevel === 'medium' ? 'text-amber-400' : 'text-teal-400'
            }`}>
              {advice.urgencyLevel.charAt(0).toUpperCase() + advice.urgencyLevel.slice(1)}
            </div>
            <div className="text-xs text-gray-500">Urgency</div>
          </div>
        </div>

        {/* Latest Review Notes */}
        {latestReview?.notes && (
          <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <FileText className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-blue-400 font-medium">Clinical Notes</div>
                <div className="text-sm text-gray-300 mt-1">{latestReview.notes}</div>
                {latestReview.clinicalReasoning && (
                  <div className="text-xs text-gray-400 mt-2">
                    <strong>Clinical Reasoning:</strong> {latestReview.clinicalReasoning}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions Required */}
        {latestReview?.requestedActions && latestReview.requestedActions.length > 0 && (
          <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-amber-400 font-medium">Actions Required</div>
                <ul className="text-sm text-gray-300 mt-1 space-y-1">
                  {latestReview.requestedActions.map((action, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tags and Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="flex flex-wrap gap-1">
            {advice.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center space-x-3">
            {advice.approvalStatus === 'approved' && (
              <div className="flex items-center space-x-1 text-xs text-teal-400">
                <Star className="w-3 h-3" />
                <span>Clinically Verified</span>
              </div>
            )}
            {advice.confidence >= 80 && (
              <div className="flex items-center space-x-1 text-xs text-blue-400">
                <Shield className="w-3 h-3" />
                <span>High Confidence</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};