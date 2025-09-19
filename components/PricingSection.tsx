'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Building } from 'lucide-react'

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Personal",
      icon: Zap,
      price: isAnnual ? 12 : 15,
      period: isAnnual ? "/month (billed annually)" : "/month",
      description: "Essential cardiac monitoring for individuals",
      features: [
        "Basic heart rate monitoring",
        "Risk assessment alerts", 
        "Monthly health reports",
        "Consumer device integration",
        "Standard support"
      ],
      cta: "Start Monitoring",
      popular: false,
      color: "electric"
    },
    {
      name: "Clinical",
      icon: Star,
      price: isAnnual ? 39 : 49,
      period: isAnnual ? "/month (billed annually)" : "/month",
      description: "Advanced analytics for health professionals",
      features: [
        "Everything in Personal",
        "Advanced predictive modeling",
        "30-day health forecasting",
        "Clinical-grade insights",
        "Priority support",
        "API access (limited)",
        "Multi-patient dashboard"
      ],
      cta: "Go Clinical",
      popular: true,
      color: "plasma"
    },
    {
      name: "Enterprise",
      icon: Building,
      price: "Custom",
      period: "",
      description: "Full platform access for healthcare organizations",
      features: [
        "Everything in Clinical",
        "Unlimited API access",
        "White-label deployment",
        "Custom integrations",
        "Dedicated support team",
        "SLA guarantees",
        "On-premise options",
        "Bulk licensing discounts"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "gold"
    }
  ]

  const handlePlanSelect = (planName: string) => {
    if (planName === 'Enterprise') {
      window.open('mailto:enterprise@hope-health.com?subject=Enterprise Pricing Inquiry', '_blank')
    } else {
      const element = document.getElementById('early-access')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="py-32 bg-gradient-to-b from-slate to-void relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-electric/20"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
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
            <Crown className="w-4 h-4 text-gold" />
            <span className="font-mono text-sm text-silver">Flexible Plans • No Setup Fees</span>
          </div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-platinum mb-8 leading-tight">
            Clinical-Grade
            <br />
            <span className="bg-gradient-to-r from-electric via-plasma to-neon bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          
          <p className="font-body text-xl text-silver/70 max-w-3xl mx-auto leading-relaxed mb-12">
            Choose the plan that fits your needs. From personal monitoring to enterprise deployment, 
            HOPE scales with your requirements.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-body font-medium ${!isAnnual ? 'text-platinum' : 'text-silver/60'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                isAnnual ? 'bg-electric' : 'bg-silver/20'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 rounded-full bg-platinum transition-transform ${
                isAnnual ? 'transform translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`font-body font-medium ${isAnnual ? 'text-platinum' : 'text-silver/60'}`}>
              Annual
            </span>
            {isAnnual && (
              <div className="bg-gradient-to-r from-neon to-electric text-void px-3 py-1 rounded-full text-sm font-mono font-bold">
                SAVE 20%
              </div>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group ${
                  plan.popular ? 'lg:scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-plasma to-electric text-void px-6 py-2 rounded-full text-sm font-mono font-bold flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className={`h-full bg-gradient-to-br from-midnight/90 to-slate/50 backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 ${
                  plan.popular 
                    ? 'border-plasma/40 shadow-lg shadow-plasma/10' 
                    : 'border-silver/10 hover:border-electric/30'
                }`}>
                  
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br from-${plan.color} to-${plan.color}/60 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-void" />
                    </div>
                    
                    <h3 className="font-display text-2xl font-bold text-platinum mb-2">
                      {plan.name}
                    </h3>
                    
                    <p className="font-body text-silver/70 mb-6">
                      {plan.description}
                    </p>
                    
                    <div className="flex items-baseline justify-center gap-1">
                      {plan.price !== 'Custom' ? (
                        <>
                          <span className="text-5xl font-display font-bold text-platinum">
                            ${plan.price}
                          </span>
                          <span className="text-silver/60 font-body">
                            {plan.period}
                          </span>
                        </>
                      ) : (
                        <span className="text-5xl font-display font-bold text-platinum">
                          {plan.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          plan.popular ? 'bg-plasma' : 'bg-neon'
                        }`}>
                          <Check className="w-3 h-3 text-void" />
                        </div>
                        <span className="font-body text-silver/80 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelect(plan.name)}
                    className={`w-full py-4 rounded-xl font-display font-semibold text-lg transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-plasma to-electric text-void hover:shadow-lg hover:shadow-plasma/20 hover:scale-105'
                        : 'border border-silver/20 text-silver hover:border-electric hover:text-electric hover:bg-electric/5'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Enterprise Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-midnight/80 to-slate/60 backdrop-blur-xl border border-silver/10 rounded-3xl p-8">
            <h3 className="font-display text-3xl font-bold text-platinum mb-6">
              Enterprise Solutions
            </h3>
            <p className="font-body text-silver/80 mb-8 max-w-2xl mx-auto">
              Custom deployment options for healthcare systems, research institutions, 
              and large organizations requiring specialized configurations.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-mono text-silver/60">
              <span>• Volume discounts available</span>
              <span>• Custom SLA agreements</span>
              <span>• Dedicated support team</span>
              <span>• On-premise deployment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}