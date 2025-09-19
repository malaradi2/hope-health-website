'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { copy } from '@/lib/copy'
import { fadeUpVariants, staggerContainer, buttonTap } from '@/lib/animations'

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const handleGetStarted = (planName: string) => {
    if (planName === 'Enterprise') {
      window.open('mailto:sales@hope-health.com?subject=Enterprise Pricing Inquiry', '_blank')
    } else {
      const element = document.getElementById('cta')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl font-bold text-navy mb-6"
          >
            {copy.pricing.title}
          </motion.h2>
          
          {/* Billing Toggle */}
          <motion.div
            variants={fadeUpVariants}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className={`font-medium ${!isAnnual ? 'text-navy' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                isAnnual ? 'bg-royal-blue' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                isAnnual ? 'transform translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-navy' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                Save 20%
              </span>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {copy.pricing.plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.popular 
                  ? 'border-royal-blue scale-105' 
                  : 'border-subtle-gray hover:border-royal-blue'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-royal-blue text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-navy mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price !== 'Custom' ? (
                      <>
                        <span className="text-4xl font-bold text-navy">
                          ${isAnnual && plan.price !== 'Custom' 
                            ? (parseFloat(plan.price.replace('$', '')) * 0.8).toFixed(0) 
                            : plan.price.replace('$', '')}
                        </span>
                        <span className="text-gray-500">
                          {isAnnual ? '/month (billed annually)' : plan.period}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-navy">{plan.price}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  {...buttonTap}
                  onClick={() => handleGetStarted(plan.name)}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                    plan.popular
                      ? 'bg-royal-blue text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-navy hover:bg-gray-200 border-2 border-gray-200 hover:border-royal-blue'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enterprise Features Callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="mt-16 bg-gradient-to-r from-navy to-royal-blue rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Enterprise plans include volume discounts, dedicated support, custom integrations, 
            and white-label options. Contact our sales team for a tailored solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
            <span>• Volume API pricing</span>
            <span>• Custom SLA agreements</span>
            <span>• Dedicated account manager</span>
            <span>• Priority feature requests</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}