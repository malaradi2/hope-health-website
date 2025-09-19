'use client'

import { motion } from 'framer-motion'
import { 
  FileText, 
  MessageSquare, 
  Watch, 
  AlertTriangle, 
  Lightbulb, 
  BarChart3, 
  Stethoscope, 
  BookOpen 
} from 'lucide-react'
import { copy } from '@/lib/copy'
import { fadeUpVariants, staggerContainer, cardHover } from '@/lib/animations'

const featureIcons = [
  FileText, 
  MessageSquare, 
  Watch, 
  AlertTriangle, 
  Lightbulb, 
  BarChart3, 
  Stethoscope, 
  BookOpen
]

export default function FeaturesPatient() {
  return (
    <section id="features" className="py-24 bg-dark-gray">
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
            className="text-4xl md:text-5xl font-bold text-charcoal mb-6"
          >
            {copy.patientFeatures.title}
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            {copy.patientFeatures.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {copy.patientFeatures.features.map((feature, index) => {
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
                  className="bg-navy/20 backdrop-blur-sm p-6 rounded-xl border border-subtle-gray/20 hover:bg-navy/30 transition-all h-full"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-neon-green rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-charcoal mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-slate-400 leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Feature highlight callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="mt-16 bg-gradient-to-r from-navy to-accent-blue rounded-2xl p-8 text-center border border-accent-blue/30"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Important: HOPE is Your Health Assistant
            </h3>
            <p className="text-blue-100 leading-relaxed">
              HOPE provides insights and suggestions to help you understand your health better, 
              but it does not replace professional medical care. All recommendations should be 
              discussed with your healthcare provider for proper medical interpretation and guidance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}