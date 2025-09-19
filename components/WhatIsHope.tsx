'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Brain, Zap, Shield, TrendingUp, Heart, Users, BarChart3 } from 'lucide-react'
import { copy } from '@/lib/copy'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

export default function WhatIsHope() {
  const [animatedValue, setAnimatedValue] = useState(0)
  const [heartRate, setHeartRate] = useState(72)
  const [riskScore, setRiskScore] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => 68 + Math.floor(Math.random() * 8))
      setRiskScore(prev => 12 + Math.floor(Math.random() * 8))
      setAnimatedValue(prev => (prev + 1) % 100)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { label: "Clinical Data Points", value: "1M+", icon: BarChart3 },
    { label: "Heart Clinic Partners", value: "Canada", icon: Heart },
    { label: "FDA Approved", value: "Devices", icon: Shield },
    { label: "Growing Dataset", value: "Daily", icon: TrendingUp }
  ]

  return (
    <section id="what-is-hope" className="py-24 bg-dark-gray relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.h2
            variants={fadeUpVariants}
            className="text-5xl md:text-6xl font-bold text-charcoal mb-6 tracking-tight"
          >
            Medical-Grade 
            <span className="bg-gradient-to-r from-accent-blue to-neon-green bg-clip-text text-transparent"> Intelligence</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-2xl text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            HOPE transforms millions of health data points into actionable insights using advanced AI that rivals clinical-grade diagnostics
          </motion.p>
        </motion.div>

        {/* Metrics Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                className="bg-navy/30 backdrop-blur-sm border border-subtle-gray/20 rounded-2xl p-6 text-center hover:bg-navy/40 transition-all"
              >
                <Icon className="w-8 h-8 text-accent-blue mx-auto mb-3" />
                <div className="text-3xl font-bold text-charcoal mb-1">{metric.value}</div>
                <div className="text-slate-400 text-sm font-medium">{metric.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Live Health Dashboard */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="bg-gradient-to-br from-navy/40 to-dark-gray/40 backdrop-blur-sm border border-subtle-gray/30 rounded-3xl p-8 relative overflow-hidden"
          >
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-accent-blue/20"></div>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-charcoal mb-8 flex items-center gap-3">
                <Activity className="w-6 h-6 text-neon-green" />
                Live Health Analytics
              </h3>

              {/* Heart Rate Monitor */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-300 font-medium">Heart Rate Variability</span>
                  <span className="text-2xl font-bold text-neon-green">{heartRate} BPM</span>
                </div>
                <div className="h-24 bg-navy/20 rounded-lg p-4 relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 400 80">
                    <motion.path
                      d="M0,40 Q100,20 100,40 T200,40 T300,40 T400,40"
                      stroke="#10B981"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-300 font-medium">Health Risk Score</span>
                  <span className="text-2xl font-bold text-accent-blue">{riskScore}%</span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-6 flex-1 rounded ${i < 3 ? 'bg-neon-green' : i < 7 ? 'bg-yellow-500' : 'bg-navy/30'}`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: i <= riskScore / 10 ? 1 : 0.3 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>

              {/* AI Processing */}
              <div className="bg-navy/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-5 h-5 text-accent-blue" />
                  <span className="text-slate-300 font-medium">AI Processing</span>
                  <div className="ml-auto">
                    <motion.div
                      className="w-2 h-2 bg-neon-green rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>• Analyzing ECG patterns...</div>
                  <div>• Cross-referencing sleep data...</div>
                  <div>• Generating personalized insights...</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Capabilities */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeUpVariants}>
              <h3 className="text-3xl font-bold text-charcoal mb-6">
                Beyond Fitness Tracking
              </h3>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                While others count steps, HOPE predicts health outcomes. Our medical-grade AI processes 
                continuous biometric data to identify risks before symptoms appear.
              </p>
            </motion.div>

            {/* Capability Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Heart,
                  title: "Cardiovascular Intelligence",
                  desc: "Advanced ECG analysis detecting arrhythmias and heart stress patterns",
                  color: "text-red-400"
                },
                {
                  icon: Brain,
                  title: "Predictive Health Modeling",
                  desc: "AI algorithms trained on clinical datasets predict health events 30 days ahead",
                  color: "text-purple-400"
                },
                {
                  icon: Users,
                  title: "Population Health Insights",
                  desc: "Compare your metrics against clinical cohorts for personalized benchmarking",
                  color: "text-blue-400"
                },
                {
                  icon: TrendingUp,
                  title: "Continuous Optimization",
                  desc: "Real-time feedback loops adapt recommendations as your health evolves",
                  color: "text-green-400"
                }
              ].map((capability, index) => {
                const Icon = capability.icon
                return (
                  <motion.div
                    key={index}
                    variants={fadeUpVariants}
                    className="bg-navy/20 backdrop-blur-sm border border-subtle-gray/20 rounded-xl p-6 hover:bg-navy/30 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <Icon className={`w-6 h-6 ${capability.color} group-hover:scale-110 transition-transform`} />
                      <div>
                        <h4 className="text-lg font-semibold text-charcoal mb-2">{capability.title}</h4>
                        <p className="text-slate-400 leading-relaxed">{capability.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Medical Grade Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-navy/40 to-accent-blue/20 backdrop-blur-sm border border-accent-blue/30 rounded-full px-8 py-4">
            <Shield className="w-6 h-6 text-accent-blue" />
            <span className="text-charcoal font-semibold text-lg">FDA Class II Medical Device Data Standards</span>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}