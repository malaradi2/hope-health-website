'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, Database, Cpu, Heart, Activity, Zap, Shield, TrendingUp } from 'lucide-react'
import { fadeUpVariants, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations'

const stepIcons = [Stethoscope, Database, Cpu, TrendingUp]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [animatedData, setAnimatedData] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedData(prev => (prev + 1) % 100)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      title: "Clinical Foundation",
      description: "Partner with Canada's leading heart disease clinics using FDA-approved cardiac monitoring devices to establish medical-grade baselines",
      detail: "Building on established clinical protocols and validated cardiac diagnostics",
      interactive: true,
      visual: "clinical"
    },
    {
      title: "Data Integration", 
      description: "Aggregate and analyze over 1 million anonymized cardiac profiles to train our predictive models",
      detail: "Continuous learning from expanding clinical dataset",
      interactive: true,
      visual: "data"
    },
    {
      title: "AI Translation",
      description: "Advanced machine learning bridges clinical-grade diagnostics with consumer wearable technology",
      detail: "Proprietary algorithms democratize medical-grade insights",
      interactive: true,
      visual: "ai"
    },
    {
      title: "Predictive Insights",
      description: "Transform smartwatch data into clinical-quality predictions for early disease detection and prevention",
      detail: "Consumer devices powered by clinical intelligence",
      interactive: true,
      visual: "prediction"
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-off-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-20 grid-rows-10 h-full w-full">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="border border-accent-blue/10"></div>
          ))}
        </div>
      </div>

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
            Clinical Intelligence
            <span className="bg-gradient-to-r from-accent-blue to-neon-green bg-clip-text text-transparent"> Meets Consumer Tech</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-2xl text-slate-300 max-w-4xl mx-auto"
          >
            Bridging the gap between hospital-grade diagnostics and everyday wearables
          </motion.p>
        </motion.div>

        {/* Interactive Step Selector */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="flex justify-center mb-12"
        >
          <div className="bg-navy/20 backdrop-blur-sm rounded-2xl p-2 border border-subtle-gray/20">
            <div className="grid grid-cols-4 gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    activeStep === index
                      ? 'bg-accent-blue text-white'
                      : 'text-slate-400 hover:text-charcoal hover:bg-navy/10'
                  }`}
                >
                  Step {index + 1}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="space-y-20">
          {steps.map((step, index) => {
            const Icon = stepIcons[index]
            const isEven = index % 2 === 0
            const isActive = activeStep === index
            
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-40'
                } ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Content */}
                <motion.div
                  variants={isEven ? slideInLeft : slideInRight}
                  className={!isEven ? 'lg:col-start-2' : ''}
                >
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-accent-blue to-neon-green rounded-2xl flex items-center justify-center">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 bg-charcoal text-off-white rounded-full flex items-center justify-center font-bold text-xl">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                    {step.title}
                  </h3>
                  
                  <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <p className="text-accent-blue font-semibold text-lg">
                    {step.detail}
                  </p>
                </motion.div>

                {/* Interactive Visual */}
                <motion.div
                  variants={isEven ? slideInRight : slideInLeft}
                  className={!isEven ? 'lg:col-start-1' : ''}
                >
                  <div className="bg-gradient-to-br from-navy/40 to-dark-gray/40 backdrop-blur-sm border border-subtle-gray/30 rounded-3xl p-8 relative overflow-hidden min-h-[400px] flex items-center justify-center">
                    
                    {/* Clinical Foundation Visual */}
                    {index === 0 && (
                      <div className="text-center">
                        <div className="relative mb-8">
                          <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full mx-auto flex items-center justify-center relative overflow-hidden">
                            <Heart className="w-16 h-16 text-red-400" />
                            <motion.div
                              className="absolute inset-0 rounded-full border-4 border-red-400/30"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </div>
                          <div className="absolute -top-4 -right-4 bg-neon-green/20 rounded-full p-3">
                            <Shield className="w-6 h-6 text-neon-green" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-navy/20 rounded-lg px-4 py-2">
                            <span className="text-slate-300 text-sm">FDA Approved Devices</span>
                          </div>
                          <div className="bg-navy/20 rounded-lg px-4 py-2">
                            <span className="text-slate-300 text-sm">Clinical Partnerships</span>
                          </div>
                          <div className="bg-navy/20 rounded-lg px-4 py-2">
                            <span className="text-slate-300 text-sm">Medical Grade Standards</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Data Integration Visual */}
                    {index === 1 && (
                      <div className="text-center w-full">
                        <div className="relative mb-8">
                          <Database className="w-20 h-20 text-accent-blue mx-auto mb-4" />
                          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="h-8 bg-gradient-to-r from-accent-blue/30 to-neon-green/30 rounded"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="bg-navy/20 rounded-xl p-4">
                          <motion.div
                            key={animatedData}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-2xl font-bold text-neon-green mb-2"
                          >
                            1M+ Data Points
                          </motion.div>
                          <div className="text-slate-400 text-sm">Continuously Growing Dataset</div>
                        </div>
                      </div>
                    )}

                    {/* AI Translation Visual */}
                    {index === 2 && (
                      <div className="text-center">
                        <div className="relative mb-8">
                          <div className="flex items-center justify-center gap-8 mb-6">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mb-2">
                                <Stethoscope className="w-8 h-8 text-red-400" />
                              </div>
                              <span className="text-xs text-slate-400">Clinical</span>
                            </div>
                            
                            <motion.div
                              className="flex-1 h-1 bg-gradient-to-r from-red-400 to-accent-blue relative"
                              animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Cpu className="w-8 h-8 text-accent-blue absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-gray rounded-full p-1" />
                            </motion.div>
                            
                            <div className="text-center">
                              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-2">
                                <Activity className="w-8 h-8 text-blue-400" />
                              </div>
                              <span className="text-xs text-slate-400">Wearable</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-navy/20 rounded-xl p-4">
                          <div className="text-accent-blue font-semibold mb-1">AI Translation Layer</div>
                          <div className="text-slate-400 text-sm">Bridging Clinical & Consumer</div>
                        </div>
                      </div>
                    )}

                    {/* Predictive Insights Visual */}
                    {index === 3 && (
                      <div className="text-center">
                        <div className="relative mb-8">
                          <div className="w-32 h-32 bg-gradient-to-br from-neon-green/20 to-blue-500/20 rounded-full mx-auto flex items-center justify-center relative">
                            <TrendingUp className="w-16 h-16 text-neon-green" />
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-neon-green/30"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-navy/20 rounded-lg p-3">
                              <div className="text-neon-green text-lg font-bold">Early</div>
                              <div className="text-slate-400 text-xs">Detection</div>
                            </div>
                            <div className="bg-navy/20 rounded-lg p-3">
                              <div className="text-accent-blue text-lg font-bold">Smart</div>
                              <div className="text-slate-400 text-xs">Prevention</div>
                            </div>
                          </div>
                          <div className="bg-navy/20 rounded-lg p-3">
                            <div className="text-charcoal font-semibold">Continuous Monitoring</div>
                            <div className="text-slate-400 text-sm">24/7 Health Intelligence</div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}