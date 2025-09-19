'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'
import { copy } from '@/lib/copy'
import { fadeUpVariants, staggerContainer, buttonTap } from '@/lib/animations'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate submission (in real app, this would be an API call)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      
      // For demo purposes, create a mailto link
      const subject = encodeURIComponent('HOPE Early Access Request')
      const body = encodeURIComponent(`Hi HOPE team,\n\nI'd like to join the waitlist for early access.\n\nEmail: ${email}\n\nThanks!`)
      window.open(`mailto:waitlist@hope-health.com?subject=${subject}&body=${body}`, '_blank')
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 3000)
    }, 1000)
  }

  return (
    <section id="cta" className="py-24 bg-gradient-to-br from-navy via-royal-blue to-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {copy.cta.title}
          </motion.h2>
          
          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {copy.cta.subtitle}
          </motion.p>

          {!isSubmitted ? (
            <motion.form
              variants={fadeUpVariants}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.cta.placeholder}
                    required
                    className="w-full px-6 py-4 rounded-lg text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  />
                </div>
                
                <motion.button
                  {...buttonTap}
                  type="submit"
                  disabled={isLoading || !email}
                  className="bg-white text-royal-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
                      Joining...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      {copy.cta.button}
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">You're in!</h3>
              </div>
              <p className="text-blue-100">
                Thanks for joining our waitlist. We'll be in touch soon with updates about early access.
              </p>
            </motion.div>
          )}

          <motion.p
            variants={fadeUpVariants}
            className="text-sm text-blue-200 mt-6"
          >
            {copy.cta.disclaimer}
          </motion.p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">HIPAA</div>
            <div className="text-sm text-blue-200">Compliant</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">256-bit</div>
            <div className="text-sm text-blue-200">Encryption</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">SOC 2</div>
            <div className="text-sm text-blue-200">Certified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">99.9%</div>
            <div className="text-sm text-blue-200">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}