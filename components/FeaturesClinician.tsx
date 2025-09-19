'use client'

import { motion } from 'framer-motion'
import { FileCheck, TrendingUp, Award, Zap } from 'lucide-react'
import { copy } from '@/lib/copy'
import { fadeUpVariants, staggerContainer, cardHover } from '@/lib/animations'

const featureIcons = [FileCheck, TrendingUp, Award, Zap]

export default function FeaturesClinician() {
  return (
    <section className="py-24 bg-white">
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
            {copy.clinicianFeatures.title}
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {copy.clinicianFeatures.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {copy.clinicianFeatures.features.map((feature, index) => {
            const Icon = featureIcons[index]
            
            return (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                whileHover="hover"
                initial="rest"
              >
                <motion.div
                  variants={cardHover}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-sm border border-subtle-gray hover:shadow-lg transition-shadow h-full"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-navy to-royal-blue rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-navy mb-3">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      
                      <p className="text-sm text-royal-blue font-medium italic">
                        {feature.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* API Access Callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="mt-16 bg-gradient-to-r from-navy to-royal-blue rounded-2xl p-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Enterprise API Access
                </h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  Integrate HOPE's AI intelligence into your telehealth platform, insurance workflows, 
                  or pharmaceutical research. Our API provides access to health insights and risk models 
                  while maintaining strict privacy standards.
                </p>
                <div className="bg-blue-800/50 rounded-lg p-4 border border-blue-600">
                  <p className="text-blue-200 text-sm font-medium">
                    <strong>Privacy First:</strong> API access includes model intelligence and knowledge, 
                    never raw patient health information (PHI). All data remains secure and compliant.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Risk Assessment</span>
                      <span className="text-white font-mono text-sm">GET /api/risk</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Health Insights</span>
                      <span className="text-white font-mono text-sm">POST /api/insights</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-200">Recommendations</span>
                      <span className="text-white font-mono text-sm">GET /api/recommendations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}