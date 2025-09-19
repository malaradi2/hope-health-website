'use client'

import { motion } from 'framer-motion'
import { Shield, Database, Zap, Globe, Lock, Eye, RotateCcw, Layers } from 'lucide-react'
import { copy } from '@/lib/copy'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

export default function Technology() {
  const techFeatures = [
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Healthcare-grade security and compliance"
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Data protected in transit and at rest"
    },
    {
      icon: Layers,
      title: "Multimodal Analysis",
      description: "ECG, labs, vitals, symptoms, wearables"
    },
    {
      icon: RotateCcw,
      title: "Continuous Learning",
      description: "AI models improve with feedback loops"
    },
    {
      icon: Database,
      title: "Secure Storage",
      description: "Enterprise-grade cloud infrastructure"
    },
    {
      icon: Eye,
      title: "Audit Logging",
      description: "Complete transparency and traceability"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Instant insights as data arrives"
    },
    {
      icon: Globe,
      title: "Scalable Platform",
      description: "Consumer and enterprise ready"
    }
  ]

  return (
    <section className="py-24 bg-off-white">
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
            {copy.technology.title}
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            {copy.technology.subtitle}
          </motion.p>
          <motion.p
            variants={fadeUpVariants}
            className="text-sm text-royal-blue font-medium italic"
          >
            {copy.technology.expertNote}
          </motion.p>
        </motion.div>

        {/* Tech Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {techFeatures.map((feature, index) => {
            const Icon = feature.icon
            
            return (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                className="bg-white p-6 rounded-xl shadow-sm border border-subtle-gray hover:shadow-md transition-shadow"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy to-royal-blue rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-white rounded-2xl p-8 shadow-lg border border-subtle-gray"
        >
          <motion.h3
            variants={fadeUpVariants}
            className="text-2xl font-bold text-navy mb-8 text-center"
          >
            Why Healthcare Providers Trust HOPE
          </motion.h3>
          
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {copy.technology.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-navy mb-8">Secure Architecture</h3>
          
          <div className="bg-gradient-to-r from-navy to-royal-blue rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-4 gap-6 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1">S3 Storage</h4>
                <p className="text-sm text-blue-200">Encrypted data lake</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1">SageMaker</h4>
                <p className="text-sm text-blue-200">ML training & inference</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1">API Gateway</h4>
                <p className="text-sm text-blue-200">Secure endpoints</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1">Compliance</h4>
                <p className="text-sm text-blue-200">HIPAA & audit ready</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}