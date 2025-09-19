'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Activity,
  Moon,
  Footprints,
  AlertTriangle,
  TrendingUp,
  Upload,
  Pill,
  MessageSquare,
  Settings,
  BarChart3
} from 'lucide-react';

import { HopeLogo } from '../../components/HopeLogo';
import { MetricCard } from '../../components/MetricCard';
import { RiskGauge } from '../../components/RiskGauge';
import { PercentileBar } from '../../components/PercentileBar';
import { AdviceItem } from '../../components/AdviceItem';
import { FloatingAgent } from '../../components/FloatingAgent';
import { RiskBreakdownModal } from '../../components/RiskBreakdownModal';
import { ThemeToggle } from '../../components/ThemeToggle';

import { useAppStore } from '../../store/useAppStore';
import { formatDate, formatTime } from '../../lib/utils';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';

export default function UserDashboard() {
  const router = useRouter();
  const {
    currentUser,
    liveMetrics,
    heartRateData,
    hrvData,
    sleepData,
    activityData,
    riskScore,
    baselineComparison,
    insights,
    adviceItems,
    doctors
  } = useAppStore();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth');
      return;
    }

    if (!currentUser.onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, [currentUser, router]);

  // Show onboarding modal if needed
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="hope-card p-8 max-w-md text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Welcome to HOPE!</h2>
          <p className="text-gray-400 mb-6">
            Let's set up your health profile to get personalized insights.
          </p>
          <button
            onClick={() => setShowOnboarding(false)}
            className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Complete Setup Later
          </button>
        </div>
      </div>
    );
  }

  if (!liveMetrics || !heartRateData || !riskScore) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="hope-live-pulse w-8 h-8 bg-teal-400 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your health data...</p>
        </div>
      </div>
    );
  }

  const navigationItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/user', active: true },
    { icon: Upload, label: 'Uploads', href: '/user/uploads' },
    { icon: Pill, label: 'Medications', href: '/user/meds' },
    { icon: MessageSquare, label: 'Chat & Advice', href: '/user/chat' },
    { icon: Settings, label: 'Settings', href: '/user/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <HopeLogo size="sm" />
              <nav className="hidden md:flex space-x-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? 'bg-teal-500/20 text-teal-400'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-gray-400">
                  Last sync: {formatTime(liveMetrics.lastUpdated)}
                </p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {currentUser?.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-white">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {currentUser?.name.split(' ')[0]}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-teal-400 rounded-full hope-live-pulse"></div>
                <span>Live data</span>
              </div>
              <ThemeToggle variant="dropdown" />
            </div>
          </div>
          <p className="text-gray-400">{formatDate(new Date())}</p>
        </motion.div>

        {/* Risk Score Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="hope-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Health Risk Assessment</h2>
                <p className="text-gray-400 text-sm">
                  Based on your current vitals and health patterns
                </p>
              </div>
              <button
                onClick={() => setShowRiskModal(true)}
                className="group hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-teal-500/20"
              >
                <RiskGauge riskScore={riskScore} size="md" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions - Moved up for easy access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Upload, label: 'Upload Data', href: '/user/uploads', color: 'teal' },
              { icon: Pill, label: 'Log Medication', href: '/user/meds', color: 'blue' },
              { icon: MessageSquare, label: 'Ask HOPE', href: '/user/chat', color: 'purple' },
              { icon: BarChart3, label: 'Analytics', href: '/user/analytics', color: 'amber' }
            ].map((action) => (
              <button
                key={action.href}
                onClick={() => router.push(action.href)}
                className="hope-card p-4 text-center hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-teal-500/10"
              >
                <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${
                  action.color === 'teal' ? 'from-teal-500/20 to-teal-600/20 border-teal-500/30' :
                  action.color === 'blue' ? 'from-blue-500/20 to-blue-600/20 border-blue-500/30' :
                  action.color === 'purple' ? 'from-purple-500/20 to-purple-600/20 border-purple-500/30' :
                  'from-amber-500/20 to-amber-600/20 border-amber-500/30'
                } rounded-xl border flex items-center justify-center`}>
                  <action.icon className={`w-6 h-6 ${
                    action.color === 'teal' ? 'text-teal-400' :
                    action.color === 'blue' ? 'text-blue-400' :
                    action.color === 'purple' ? 'text-purple-400' :
                    'text-amber-400'
                  }`} />
                </div>
                <span className="text-sm font-medium text-gray-300">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Live Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
        >
          <MetricCard
            title="Live Heart Rate"
            value={liveMetrics.heartRate}
            unit="bpm"
            icon={Heart}
            color="teal"
            isLive={true}
            trend={heartRateData.points.slice(-10).map(p => p.value)}
            change={{
              value: 2,
              direction: 'up',
              isGood: liveMetrics.heartRate <= 85
            }}
          />

          <MetricCard
            title="HRV"
            value={liveMetrics.hrv}
            unit="ms"
            icon={Activity}
            color="blue"
            trend={hrvData?.weeklyTrend.slice(-7).map(p => p.value)}
            change={{
              value: 5,
              direction: 'up',
              isGood: true
            }}
          />

          <MetricCard
            title="SpO₂"
            value={liveMetrics.spo2.toFixed(1)}
            unit="%"
            icon={AlertTriangle}
            color={liveMetrics.spo2 < 95 ? 'red' : 'purple'}
            isLive={true}
          />

          <MetricCard
            title="Steps Today"
            value={liveMetrics.steps.toLocaleString()}
            icon={Footprints}
            color="amber"
            change={{
              value: 12,
              direction: 'up',
              isGood: true
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Heart Rate Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hope-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">24-Hour Heart Rate</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-teal-400 rounded-full hope-live-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={heartRateData.points.slice(-48)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="timestamp"
                      tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111118',
                        border: '1px solid #27272E',
                        borderRadius: '0.5rem',
                        color: '#F9FAFB'
                      }}
                      labelFormatter={(value) => formatTime(new Date(value))}
                      formatter={(value: any) => [`${value} bpm`, 'Heart Rate']}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: '#10B981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Sleep & Activity Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sleep Chart */}
              {sleepData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="hope-card p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Last Night Sleep</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Total Sleep</span>
                      <span className="text-lg font-semibold text-white">
                        {sleepData.lastNight.totalSleep.toFixed(1)}h
                      </span>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(sleepData.lastNight.stages).map(([stage, duration]) => (
                        <div key={stage} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              stage === 'deep' ? 'bg-purple-500' :
                              stage === 'rem' ? 'bg-blue-500' :
                              stage === 'light' ? 'bg-teal-500' : 'bg-gray-500'
                            }`} />
                            <span className="text-sm text-gray-400 capitalize">{stage}</span>
                          </div>
                          <span className="text-sm text-white">{duration.toFixed(1)}h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Activity Chart */}
              {activityData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="hope-card p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Activity Progress</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Daily Goal</span>
                      <span className="text-lg font-semibold text-white">
                        {((activityData.steps / activityData.goal) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-teal-400 to-blue-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((activityData.steps / activityData.goal) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{activityData.steps.toLocaleString()} steps</span>
                      <span className="text-gray-400">{activityData.goal.toLocaleString()} goal</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Baseline Comparison */}
            {baselineComparison && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="hope-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">vs Your Peers</h3>
                <div className="space-y-6">
                  <PercentileBar
                    label="Resting HR"
                    value={liveMetrics.restingHR}
                    unit="bpm"
                    percentile={baselineComparison.userPercentiles.restingHR}
                  />
                  <PercentileBar
                    label="HRV"
                    value={liveMetrics.hrv}
                    unit="ms"
                    percentile={baselineComparison.userPercentiles.hrv}
                  />
                  <PercentileBar
                    label="Sleep Efficiency"
                    value={sleepData?.lastNight.efficiency ? Math.round(sleepData.lastNight.efficiency * 100) : 85}
                    unit="%"
                    percentile={baselineComparison.userPercentiles.sleepEfficiency}
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500">
                    Compared to {baselineComparison.cohortInfo.sampleSize.toLocaleString()} people aged {baselineComparison.cohortInfo.ageRange}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Recent Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="hope-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Health Insights</h3>
              <div className="space-y-4">
                {insights.slice(0, 3).map((insight) => (
                  <div key={insight.id} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <h4 className="text-sm font-medium text-white mb-1">{insight.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {insight.content}
                    </p>
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded">
                      {insight.category}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Advice */}
            {adviceItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">Recent Advice</h3>
                {adviceItems.slice(0, 3).map((advice) => (
                  <AdviceItem
                    key={advice.id}
                    advice={advice}
                    showApproval={true}
                    compact={true}
                  />
                ))}
                <button
                  onClick={() => router.push('/user/chat')}
                  className="w-full py-2 text-sm text-teal-400 hover:text-teal-300 transition-colors"
                >
                  View all advice →
                </button>
              </motion.div>
            )}

            {/* Quick Health Assistant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="hope-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">AI Health Assistant</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-teal-500/10 to-blue-600/10 rounded-lg border border-teal-500/20">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">24/7 Health Guidance</p>
                    <p className="text-xs text-gray-400">Get instant answers about your health data</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <button className="text-left p-2 bg-gray-800/50 hover:bg-gray-700 rounded text-xs text-gray-300 hover:text-white transition-colors">
                    💊 How are my medications working?
                  </button>
                  <button className="text-left p-2 bg-gray-800/50 hover:bg-gray-700 rounded text-xs text-gray-300 hover:text-white transition-colors">
                    📊 Explain my heart rate trends
                  </button>
                  <button className="text-left p-2 bg-gray-800/50 hover:bg-gray-700 rounded text-xs text-gray-300 hover:text-white transition-colors">
                    😴 Sleep optimization tips
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>


        {/* Disclaimer Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 py-3 border-t border-gray-700"
        >
          <p className="text-xs text-gray-500 text-center">
            This prototype is for demonstration only. Not for medical use. Always consult with healthcare professionals for medical decisions.
          </p>
        </motion.div>
      </div>

      {/* Floating Agent */}
      <FloatingAgent />

      {/* Risk Breakdown Modal */}
      {riskScore && (
        <RiskBreakdownModal
          riskScore={riskScore}
          isOpen={showRiskModal}
          onClose={() => setShowRiskModal(false)}
        />
      )}
    </div>
  );
}