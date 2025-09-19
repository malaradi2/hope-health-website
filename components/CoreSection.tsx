'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Stethoscope, 
  Brain, 
  Activity, 
  Shield, 
  Zap, 
  Heart,
  Database,
  Cpu,
  TrendingUp,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react'

export default function CoreSection() {
  const [activeSection, setActiveSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [heartRate, setHeartRate] = useState(72)
  const [dataPoints, setDataPoints] = useState(1000000)

  useEffect(() => {
    const heartInterval = setInterval(() => {
      setHeartRate(68 + Math.floor(Math.random() * 16))
    }, 2000)

    const dataInterval = setInterval(() => {
      setDataPoints(prev => prev + Math.floor(Math.random() * 100))
    }, 3000)

    return () => {
      clearInterval(heartInterval)
      clearInterval(dataInterval)
    }
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 3)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const sections = [
    {
      title: "Clinical Foundation",
      subtitle: "Medical-Grade Infrastructure",
      description: "Built on FDA-approved cardiac monitoring devices and partnerships with Canada's leading heart disease clinics. Our foundation is medical science, not fitness tracking.",
      icon: Stethoscope,
      color: "crimson",
      visual: "clinical"
    },
    {
      title: "AI Intelligence", 
      subtitle: "1M+ Cardiac Profiles",
      description: "Advanced machine learning trained on over 1 million anonymized cardiac profiles. We bridge the gap between clinical diagnostics and consumer wearables.",
      icon: Brain,
      color: "plasma",
      visual: "ai"
    },
    {
      title: "Predictive Power",
      subtitle: "Early Detection System", 
      description: "Transform your smartwatch into a clinical-grade diagnostic tool. Detect potential cardiac events weeks before symptoms appear.",
      icon: TrendingUp,
      color: "neon",
      visual: "prediction"
    }
  ]

  return (
    <section id="core" className="py-32 bg-gradient-to-b from-slate to-midnight relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-plasma/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-6xl lg:text-7xl font-bold text-platinum mb-8 leading-tight">
            Beyond
            <br />
            <span className="bg-gradient-to-r from-electric via-plasma to-neon bg-clip-text text-transparent">
              Wearables
            </span>
          </h2>
          <p className="font-body text-2xl text-silver/70 max-w-3xl mx-auto leading-relaxed">
            We don't just track fitness metrics. We provide medical-grade cardiac intelligence 
            that can save lives through early detection and prevention.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Interactive Content */}
          <div>
            {/* Section Selector */}
            <div className="flex items-center gap-4 mb-12">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 bg-midnight border border-silver/20 rounded-full flex items-center justify-center hover:border-electric transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-silver" /> : <Play className="w-5 h-5 text-silver" />}
              </button>
              
              <div className="flex gap-2">
                {sections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveSection(index)
                      setIsPlaying(false)
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeSection === index ? 'bg-electric' : 'bg-silver/20 hover:bg-silver/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                {sections.map((section, index) => {
                  const Icon = section.icon
                  const isActive = activeSection === index
                  
                  return isActive ? (
                    <div key={index} className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 bg-gradient-to-br from-${section.color} to-${section.color}/60 rounded-2xl flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-void" />
                        </div>
                        <div>
                          <h3 className="font-display text-3xl font-bold text-platinum">
                            {section.title}
                          </h3>
                          <p className="font-mono text-sm text-electric uppercase tracking-wider">
                            {section.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <p className="font-body text-xl text-silver/80 leading-relaxed">
                        {section.description}
                      </p>
                      
                      <button className="group flex items-center gap-3 text-electric font-display font-semibold text-lg hover:text-plasma transition-colors">
                        Learn More
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  ) : null
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Dynamic Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-midnight/90 to-void/90 backdrop-blur-xl border border-silver/10 rounded-3xl p-8 relative overflow-hidden">
              
              {/* Animated Background Grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                  {Array.from({ length: 96 }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="border border-electric/20"
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 3, delay: i * 0.05, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10 space-y-8">
                <AnimatePresence mode="wait">
                  {/* Clinical Foundation Visual */}
                  {activeSection === 0 && (
                    <motion.div
                      key="clinical"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <div className="mb-8">
                        <div className="relative w-32 h-32 mx-auto">
                          <div className="absolute inset-0 bg-gradient-to-br from-crimson/30 to-crimson/10 rounded-full"></div>
                          <motion.div
                            className="absolute inset-0 border-2 border-crimson/60 rounded-full"
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Heart className="w-16 h-16 text-crimson" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-void/40 rounded-xl p-4">
                          <Shield className="w-6 h-6 text-neon mx-auto mb-2" />
                          <div className="font-mono text-sm text-silver">FDA</div>
                          <div className="font-mono text-xs text-silver/60">Approved</div>
                        </div>
                        <div className="bg-void/40 rounded-xl p-4">
                          <Stethoscope className="w-6 h-6 text-electric mx-auto mb-2" />
                          <div className="font-mono text-sm text-silver">Clinical</div>
                          <div className="font-mono text-xs text-silver/60">Partners</div>
                        </div>
                        <div className="bg-void/40 rounded-xl p-4">
                          <Activity className="w-6 h-6 text-gold mx-auto mb-2" />
                          <div className="font-mono text-sm text-silver">Medical</div>
                          <div className="font-mono text-xs text-silver/60">Grade</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* AI Intelligence Visual */}
                  {activeSection === 1 && (
                    <motion.div
                      key="ai"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <div className="mb-8">
                        <div className="relative w-32 h-32 mx-auto">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-plasma/30 to-electric/30 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Brain className="w-16 h-16 text-plasma" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-void/40 rounded-xl p-6 mb-6">
                        <motion.div
                          key={dataPoints}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-mono font-bold text-electric mb-2"
                        >
                          {dataPoints.toLocaleString()}+
                        </motion.div>
                        <div className="text-silver/70 text-sm">Cardiac Profiles Analyzed</div>
                      </div>

                      <div className="flex justify-center gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-8 bg-gradient-to-t from-plasma to-electric rounded"
                            animate={{ scaleY: [0.3, 1, 0.7, 1, 0.5] }}
                            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Prediction Visual */}
                  {activeSection === 2 && (
                    <motion.div
                      key="prediction"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <div className="mb-8">
                        <div className="relative w-full h-24">
                          <svg className="w-full h-full" viewBox="0 0 400 80">
                            <motion.path
                              d="M0,40 L60,40 L70,20 L80,60 L90,40 L150,40 L160,15 L170,65 L180,40 L400,40"
                              stroke="#00FF88"
                              strokeWidth="2"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: [0, 1, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.path
                              d="M0,40 L60,40 L70,20 L80,60 L90,40 L150,40 L160,15 L170,65 L180,40 L400,40"
                              stroke="#00D9FF"
                              strokeWidth="1"
                              fill="none"
                              opacity="0.5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: [0, 1, 0] }}
                              transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-void/40 rounded-xl p-4">
                          <motion.div
                            key={heartRate}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="text-2xl font-mono font-bold text-crimson mb-1"
                          >
                            {heartRate}
                          </motion.div>
                          <div className="text-silver/70 text-sm">BPM</div>
                        </div>
                        <div className="bg-void/40 rounded-xl p-4">
                          <div className="text-2xl font-mono font-bold text-neon mb-1">LOW</div>
                          <div className="text-silver/70 text-sm">Risk</div>
                        </div>
                        <div className="bg-void/40 rounded-xl p-4">
                          <div className="text-2xl font-mono font-bold text-gold mb-1">30D</div>
                          <div className="text-silver/70 text-sm">Forecast</div>
                        </div>
                        <div className="bg-void/40 rounded-xl p-4">
                          <div className="text-2xl font-mono font-bold text-electric mb-1">AI</div>
                          <div className="text-silver/70 text-sm">Active</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}