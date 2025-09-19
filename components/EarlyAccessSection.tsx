'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, Zap, Users, Calendar } from 'lucide-react'

export default function EarlyAccessSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate submission
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      
      // Create mailto link
      const subject = encodeURIComponent('HOPE Clinical Early Access Request')
      const body = encodeURIComponent(`Hi HOPE team,

I'd like to join the early access program for HOPE Clinical.

Email: ${email}
Interest: Clinical-grade cardiac monitoring

Please keep me updated on:
- Beta testing opportunities
- Launch timeline
- Pricing updates

Thanks!`)
      window.open(`mailto:early-access@hope-health.com?subject=${subject}&body=${body}`, '_blank')
      
      // Reset after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 4000)
    }, 1500)
  }

  const benefits = [
    {
      icon: Users,
      title: "First Access",
      description: "Be among the first to experience clinical-grade cardiac monitoring"
    },
    {
      icon: Zap,
      title: "Beta Testing",
      description: "Help shape the platform with your feedback and usage patterns"
    },
    {
      icon: Calendar,
      title: "Launch Pricing",
      description: "Lock in special early-adopter pricing when we launch"
    }
  ]

  return (
    <section id="early-access" className="py-32 bg-gradient-to-b from-void to-midnight relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-plasma/10 rounded-full blur-3xl" />
        
        {/* Neural Network Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Connection lines */}
            <motion.line
              x1="20%" y1="30%" x2="80%" y2="70%"
              stroke="url(#lineGradient)" strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 1 }}
            />
            <motion.line
              x1="80%" y1="30%" x2="20%" y2="70%"
              stroke="url(#lineGradient)" strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 1.5 }}
            />
            
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            {/* Nodes */}
            <circle cx="20%" cy="30%" r="2" fill="url(#nodeGradient)" className="animate-pulse" />
            <circle cx="80%" cy="30%" r="2" fill="url(#nodeGradient)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="80%" cy="70%" r="2" fill="url(#nodeGradient)" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="20%" cy="70%" r="2" fill="url(#nodeGradient)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          </svg>
        </div>
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
              <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
              <span className="font-mono text-sm text-silver">Beta Program • Exclusive Access</span>
            </div>
            
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-platinum mb-8 leading-tight">
              Join the
              <br />
              <span className="bg-gradient-to-r from-electric via-plasma to-neon bg-clip-text text-transparent">
                Early Access
              </span>
            </h2>
            
            <p className="font-body text-xl text-silver/80 mb-12 leading-relaxed">
              Be among the first to experience the future of cardiac health monitoring. 
              Get exclusive access to our beta platform and help shape the next generation 
              of medical-grade wearable technology.
            </p>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-electric/20 to-plasma/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-electric" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-platinum mb-2">
                        {benefit.title}
                      </h3>
                      <p className="font-body text-silver/70 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-midnight/90 to-slate/50 backdrop-blur-xl border border-silver/10 rounded-3xl p-8 relative overflow-hidden">
              
              {/* Form Background Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-electric/60 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>

              <div className="relative z-10">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="font-display text-2xl font-bold text-platinum mb-4">
                        Request Early Access
                      </h3>
                      <p className="font-body text-silver/70">
                        Get notified when HOPE Clinical launches and secure your early-adopter benefits.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block font-body text-sm font-medium text-silver mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="w-full px-4 py-3 bg-void/40 border border-silver/20 rounded-xl text-platinum placeholder-silver/40 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all font-body"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || !email}
                        className="group w-full bg-gradient-to-r from-electric to-plasma px-8 py-4 rounded-xl font-display font-semibold text-lg text-void transition-all hover:shadow-lg hover:shadow-electric/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <span className="flex items-center justify-center gap-3">
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-void border-t-transparent rounded-full animate-spin" />
                              Joining...
                            </>
                          ) : (
                            <>
                              <Mail className="w-5 h-5" />
                              Request Access
                            </>
                          )}
                        </span>
                      </button>
                    </form>

                    <p className="text-center font-body text-xs text-silver/60 mt-6">
                      We respect your privacy. No spam, unsubscribe anytime.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-neon to-electric rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-void" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-platinum mb-4">
                      Welcome to the Future!
                    </h3>
                    <p className="font-body text-silver/80 leading-relaxed">
                      Thanks for joining our early access program. We'll be in touch soon with 
                      exclusive updates about HOPE Clinical and your beta testing opportunities.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-60">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-neon rounded-full" />
              <span className="font-mono text-sm text-silver">1M+ Cardiac Profiles</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-electric rounded-full" />
              <span className="font-mono text-sm text-silver">FDA Approved Devices</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-plasma rounded-full" />
              <span className="font-mono text-sm text-silver">Clinical Partners</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <span className="font-mono text-sm text-silver">HIPAA Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}