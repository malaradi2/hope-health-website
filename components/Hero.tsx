'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Activity, Zap, Shield } from 'lucide-react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [heartRate, setHeartRate] = useState(72)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setHeartRate(68 + Math.floor(Math.random() * 16))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const scrollToNext = () => {
    const element = document.getElementById('core')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) return <div className="min-h-screen bg-void" />

  return (
    <section className="min-h-screen bg-gradient-to-b from-void via-midnight to-slate relative overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-electric rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-plasma rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-gold rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.line
            x1="25%" y1="25%" x2="66%" y2="33%"
            stroke="url(#gradient1)" strokeWidth="0.5" opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1 }}
          />
          <motion.line
            x1="66%" y1="33%" x2="33%" y2="66%"
            stroke="url(#gradient2)" strokeWidth="0.5" opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 2 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF88" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.div 
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex items-center min-h-screen"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-midnight/80 backdrop-blur-sm border border-electric/20 rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
                <span className="font-mono text-sm text-silver">Medical Grade • Live</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-6xl lg:text-8xl font-bold mb-6 leading-none"
            >
              <span className="text-platinum">HOPE</span>
              <br />
              <span className="bg-gradient-to-r from-electric via-plasma to-neon bg-clip-text text-transparent">
                CLINICAL
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-xl text-silver/80 mb-12 leading-relaxed max-w-lg"
            >
              Transform consumer wearables into clinical-grade diagnostic tools. 
              <span className="text-electric font-medium"> Powered by 1M+ cardiac profiles</span> from 
              Canada's leading heart clinics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="group relative bg-gradient-to-r from-electric to-plasma px-8 py-4 rounded-xl font-display font-semibold text-lg text-void transition-all hover:shadow-lg hover:shadow-electric/20 hover:scale-105">
                <span className="relative z-10">Request Access</span>
                <div className="absolute inset-0 bg-gradient-to-r from-plasma to-electric opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </button>
              
              <button className="group border border-silver/20 text-silver px-8 py-4 rounded-xl font-display font-semibold text-lg hover:border-electric hover:text-electric transition-all">
                View Demo
                <Zap className="w-5 h-5 inline ml-2 group-hover:text-electric" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-8 mt-12"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon" />
                <span className="font-mono text-sm text-silver">FDA Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-electric" />
                <span className="font-mono text-sm text-silver">Clinical Grade</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Live Medical Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-midnight/80 to-slate/50 backdrop-blur-xl border border-silver/10 rounded-3xl p-8 relative overflow-hidden">
              
              {/* Scan Lines Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-electric/60 to-transparent"
                  animate={{ y: [0, 400] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display text-2xl font-bold text-platinum">Live Diagnostics</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-neon rounded-full animate-pulse" />
                    <span className="font-mono text-sm text-silver">ACTIVE</span>
                  </div>
                </div>

                {/* Heart Rate */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body text-silver">Cardiac Rhythm</span>
                    <motion.span
                      key={heartRate}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="font-mono text-3xl font-bold text-crimson"
                    >
                      {heartRate} BPM
                    </motion.span>
                  </div>
                  
                  <div className="h-20 bg-void/40 rounded-xl p-4 relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 400 60">
                      <motion.path
                        d="M0,30 L80,30 L90,10 L100,50 L110,30 L400,30"
                        stroke="#EF4444"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, pathOffset: 1 }}
                        animate={{ pathLength: 1, pathOffset: 0 }}
                        transition={{ 
                          pathLength: { duration: 2, repeat: Infinity },
                          pathOffset: { duration: 2, repeat: Infinity }
                        }}
                      />
                      <motion.path
                        d="M0,30 L80,30 L90,10 L100,50 L110,30 L400,30"
                        stroke="#EF4444"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.3"
                        animate={{
                          d: [
                            "M0,30 L80,30 L90,10 L100,50 L110,30 L400,30",
                            "M0,30 L75,32 L85,8 L95,52 L105,28 L400,30",
                            "M0,30 L80,30 L90,10 L100,50 L110,30 L400,30"
                          ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-void/20 rounded-xl p-4">
                    <div className="text-electric text-2xl font-mono font-bold">98.7%</div>
                    <div className="text-silver/70 text-sm">Accuracy</div>
                  </div>
                  <div className="bg-void/20 rounded-xl p-4">
                    <div className="text-neon text-2xl font-mono font-bold">LOW</div>
                    <div className="text-silver/70 text-sm">Risk Score</div>
                  </div>
                  <div className="bg-void/20 rounded-xl p-4">
                    <div className="text-gold text-2xl font-mono font-bold">24/7</div>
                    <div className="text-silver/70 text-sm">Monitoring</div>
                  </div>
                  <div className="bg-void/20 rounded-xl p-4">
                    <div className="text-plasma text-2xl font-mono font-bold">AI</div>
                    <div className="text-silver/70 text-sm">Analysis</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-silver/50 hover:text-electric transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  )
}