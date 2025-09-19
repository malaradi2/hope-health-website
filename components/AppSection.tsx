'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Download, Bell, Calendar } from 'lucide-react'

export default function AppSection() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Set launch date to 3 months from now
    const launchDate = new Date()
    launchDate.setMonth(launchDate.getMonth() + 3)
    
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-32 bg-gradient-to-b from-void to-midnight relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-plasma/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-midnight/80 backdrop-blur-sm border border-electric/20 rounded-full px-4 py-2 mb-8">
              <Bell className="w-4 h-4 text-neon animate-pulse" />
              <span className="font-mono text-sm text-silver">Coming Soon</span>
            </div>
            
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-platinum mb-8 leading-tight">
              HOPE Mobile
              <br />
              <span className="bg-gradient-to-r from-electric via-neon to-plasma bg-clip-text text-transparent">
                Apps
              </span>
            </h2>
            
            <p className="font-body text-xl text-silver/80 mb-12 leading-relaxed">
              Experience clinical-grade cardiac monitoring on your smartphone. Get real-time insights, 
              predictive analytics, and seamless integration with your wearable devices.
            </p>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-br from-midnight/80 to-slate/50 backdrop-blur-sm border border-silver/10 rounded-xl p-4 text-center"
                >
                  <motion.div
                    key={item.value}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl font-mono font-bold text-electric mb-1"
                  >
                    {item.value.toString().padStart(2, '0')}
                  </motion.div>
                  <div className="text-silver/60 text-sm font-mono uppercase tracking-wider">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* App Store Badges */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-midnight to-slate backdrop-blur-sm border border-silver/20 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-electric/40 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-electric to-plasma rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6 text-void" />
                </div>
                <div>
                  <div className="text-silver/60 text-sm font-mono">Available on</div>
                  <div className="text-platinum text-lg font-display font-semibold">App Store</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-midnight to-slate backdrop-blur-sm border border-silver/20 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-electric/40 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-neon to-electric rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6 text-void" />
                </div>
                <div>
                  <div className="text-silver/60 text-sm font-mono">Get it on</div>
                  <div className="text-platinum text-lg font-display font-semibold">Google Play</div>
                </div>
              </motion.div>
            </div>

            {/* Early Access CTA */}
            <button className="group bg-gradient-to-r from-electric to-plasma px-8 py-4 rounded-xl font-display font-semibold text-lg text-void transition-all hover:shadow-lg hover:shadow-electric/20 hover:scale-105">
              <span className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                Get Early Access
              </span>
            </button>
          </motion.div>

          {/* Right: Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative flex justify-center">
              {/* Main Phone */}
              <div className="relative z-20">
                <div className="w-64 h-[500px] bg-gradient-to-b from-midnight to-void rounded-[3rem] p-3 border border-silver/20">
                  <div className="w-full h-full bg-gradient-to-b from-void to-midnight rounded-[2.5rem] relative overflow-hidden">
                    
                    {/* Screen Content */}
                    <div className="p-6 h-full flex flex-col">
                      {/* Status Bar */}
                      <div className="flex items-center justify-between mb-8">
                        <span className="font-mono text-xs text-silver">9:41</span>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-neon rounded-full" />
                          <div className="w-1 h-1 bg-electric rounded-full" />
                          <div className="w-1 h-1 bg-plasma rounded-full" />
                        </div>
                      </div>

                      {/* App Header */}
                      <div className="text-center mb-8">
                        <h3 className="font-display text-2xl font-bold text-platinum mb-2">HOPE</h3>
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
                          <span className="font-mono text-xs text-silver">LIVE MONITORING</span>
                        </div>
                      </div>

                      {/* Heart Rate Display */}
                      <div className="bg-void/40 rounded-2xl p-6 mb-6 text-center">
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-4xl font-mono font-bold text-crimson mb-2"
                        >
                          72 BPM
                        </motion.div>
                        <div className="text-silver/60 text-sm">Resting Heart Rate</div>
                        
                        {/* Mini ECG */}
                        <div className="h-12 mt-4 relative">
                          <svg className="w-full h-full" viewBox="0 0 200 40">
                            <motion.path
                              d="M0,20 L40,20 L45,5 L50,35 L55,20 L200,20"
                              stroke="#EF4444"
                              strokeWidth="1"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: [0, 1, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-void/20 rounded-xl p-3 text-center">
                          <div className="text-electric text-lg font-mono font-bold">LOW</div>
                          <div className="text-silver/60 text-xs">Risk Score</div>
                        </div>
                        <div className="bg-void/20 rounded-xl p-3 text-center">
                          <div className="text-neon text-lg font-mono font-bold">AI</div>
                          <div className="text-silver/60 text-xs">Analysis</div>
                        </div>
                      </div>
                    </div>

                    {/* Screen Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-electric/5 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Background Phones */}
              <div className="absolute left-0 top-8 z-10 opacity-30 -rotate-12">
                <div className="w-48 h-96 bg-gradient-to-b from-midnight/80 to-void/80 rounded-[2.5rem] border border-silver/10" />
              </div>
              <div className="absolute right-0 top-8 z-10 opacity-30 rotate-12">
                <div className="w-48 h-96 bg-gradient-to-b from-midnight/80 to-void/80 rounded-[2.5rem] border border-silver/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}