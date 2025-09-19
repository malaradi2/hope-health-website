'use client'

import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github, Mail } from 'lucide-react'
import { copy } from '@/lib/copy'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/hope-health', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/hope-health', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/hope-health', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@hope-health.com', label: 'Email' },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          {/* Company Info */}
          <motion.div variants={fadeUpVariants} className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{copy.footer.company}</h3>
            <p className="text-blue-200 leading-relaxed mb-6 max-w-md">
              Transforming health data into actionable insights with AI-powered analytics 
              that work alongside your healthcare providers.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={fadeUpVariants}>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {copy.footer.links.product.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      if (link === 'Features') scrollToSection('features')
                      else if (link === 'Pricing') scrollToSection('pricing')
                      else if (link === 'API') window.open('mailto:api@hope-health.com', '_blank')
                    }}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={fadeUpVariants}>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {copy.footer.links.company.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      if (link === 'Contact') window.open('mailto:hello@hope-health.com', '_blank')
                      else if (link === 'Careers') window.open('mailto:careers@hope-health.com', '_blank')
                      else if (link === 'About') scrollToSection('what-is-hope')
                    }}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-blue-200">
              © {currentYear} HOPE. All rights reserved.
            </div>
            
            <div className="flex space-x-6">
              {copy.footer.links.legal.map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    // In a real app, these would navigate to actual pages
                    window.open(`mailto:legal@hope-health.com?subject=${link} Inquiry`, '_blank')
                  }}
                  className="text-blue-200 hover:text-white transition-colors text-sm"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-6 text-blue-300 text-sm">
            <p>
              HOPE is a health insights platform designed to supplement, not replace, professional medical care. 
              All health insights require physician confirmation.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}