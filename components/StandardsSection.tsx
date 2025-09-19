'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Lock, Eye, Database, Zap } from 'lucide-react'

export default function StandardsSection() {
  const standards = [
    {
      icon: Shield,
      title: "FDA Class II",
      subtitle: "Medical Device Standards",
      description: "Built on FDA-approved cardiac monitoring protocols used in clinical settings.",
      color: "neon"
    },
    {
      icon: Award,
      title: "HIPAA Compliant",
      subtitle: "Healthcare Privacy",
      description: "End-to-end encryption and healthcare-grade data protection standards.",
      color: "electric"
    },
    {
      icon: Lock,
      title: "SOC 2 Certified",
      subtitle: "Security Framework",
      description: "Rigorous security controls and audit procedures for sensitive health data.",
      color: "plasma"
    },
    {
      icon: Eye,
      title: "Clinical Validation",
      subtitle: "Evidence-Based",
      description: "Algorithms validated through peer-reviewed clinical studies and trials.",
      color: "gold"
    },
    {
      icon: Database,
      title: "Data Anonymization",
      subtitle: "Privacy by Design",
      description: "Advanced de-identification protocols protect individual patient privacy.",
      color: "crimson"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      subtitle: "Edge Computing",
      description: "On-device processing minimizes data transmission and latency.",
      color: "electric"
    }
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-midnight to-void relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-6 grid-rows-4 h-full w-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-electric/20"
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 4, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-midnight/80 backdrop-blur-sm border border-electric/20 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
            <span className="font-mono text-sm text-silver">Medical Grade • Certified • Compliant</span>
          </div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-platinum mb-8 leading-tight">
            Healthcare-Grade
            <br />
            <span className="bg-gradient-to-r from-neon via-electric to-plasma bg-clip-text text-transparent">
              Standards
            </span>
          </h2>
          
          <p className="font-body text-xl text-silver/70 max-w-3xl mx-auto leading-relaxed">
            HOPE meets the most rigorous medical, security, and privacy standards in healthcare technology. 
            Your health data is protected by the same protocols used in hospitals and clinics.
          </p>
        </motion.div>

        {/* Standards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {standards.map((standard, index) => {
            const Icon = standard.icon
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gradient-to-br from-midnight/80 to-slate/50 backdrop-blur-sm border border-silver/10 rounded-2xl p-8 hover:border-electric/30 transition-all duration-500"
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${standard.color} to-${standard.color}/60 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-void" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-platinum mb-2">
                  {standard.title}
                </h3>
                
                <p className="font-mono text-sm text-electric uppercase tracking-wider mb-4">
                  {standard.subtitle}
                </p>
                
                <p className="font-body text-silver/80 leading-relaxed">
                  {standard.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Certification Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="bg-midnight/60 backdrop-blur-sm border border-silver/20 rounded-xl px-6 py-4 flex items-center gap-4">
              <Shield className="w-8 h-8 text-neon" />
              <div className="text-left">
                <div className="font-mono text-sm text-silver">FDA</div>
                <div className="font-mono text-xs text-silver/60">Class II Medical</div>
              </div>
            </div>
            
            <div className="bg-midnight/60 backdrop-blur-sm border border-silver/20 rounded-xl px-6 py-4 flex items-center gap-4">
              <Award className="w-8 h-8 text-electric" />
              <div className="text-left">
                <div className="font-mono text-sm text-silver">SOC 2</div>
                <div className="font-mono text-xs text-silver/60">Type II Certified</div>
              </div>
            </div>
            
            <div className="bg-midnight/60 backdrop-blur-sm border border-silver/20 rounded-xl px-6 py-4 flex items-center gap-4">
              <Lock className="w-8 h-8 text-plasma" />
              <div className="text-left">
                <div className="font-mono text-sm text-silver">HIPAA</div>
                <div className="font-mono text-xs text-silver/60">Compliant</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}