'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { User, Stethoscope, ArrowRight } from 'lucide-react';
import { HopeLogo } from '../../components/HopeLogo';
import { useAppStore } from '../../store/useAppStore';
import { createMockUser } from '../../lib/mock';

export default function AuthPage() {
  const router = useRouter();
  const { setUser, setRole } = useAppStore();

  const handleRoleSelect = (role: 'user' | 'doctor') => {
    const mockUser = createMockUser(role);
    setUser(mockUser);
    setRole(role);

    if (role === 'user') {
      router.push('/user');
    } else {
      router.push('/doctor');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-teal-400/10 to-blue-600/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl mx-auto px-6"
      >
        {/* Header */}
        <motion.div variants={cardVariants} className="text-center mb-12">
          <HopeLogo size="lg" className="mb-4" />
          <h1 className="text-2xl font-semibold text-gray-200 mb-2">
            Welcome to HOPE
          </h1>
          <p className="text-gray-400">
            Choose your role to continue
          </p>
        </motion.div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* User Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="hope-card p-8 cursor-pointer group"
            onClick={() => handleRoleSelect('user')}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-teal-400/20 to-blue-600/20 rounded-2xl flex items-center justify-center group-hover:from-teal-400/30 group-hover:to-blue-600/30 transition-all duration-200">
                <User className="w-8 h-8 text-teal-400" />
              </div>

              <h2 className="text-xl font-semibold text-white mb-3">
                Continue as User
              </h2>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Access your health dashboard, track metrics, get insights, and manage your wellness journey with AI-powered guidance.
              </p>

              <div className="space-y-2 text-xs text-gray-500 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                  <span>Live health metrics</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <span>AI health insights</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  <span>Medication tracking</span>
                </div>
              </div>

              <div className="flex items-center justify-center text-teal-400 group-hover:translate-x-1 transition-transform duration-200">
                <span className="text-sm font-medium">Get Started</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </motion.div>

          {/* Doctor Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="hope-card p-8 cursor-pointer group"
            onClick={() => handleRoleSelect('doctor')}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-200">
                <Stethoscope className="w-8 h-8 text-blue-400" />
              </div>

              <h2 className="text-xl font-semibold text-white mb-3">
                Continue as Doctor
              </h2>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Monitor patients, review health data, approve recommendations, and manage alerts with comprehensive clinical tools.
              </p>

              <div className="space-y-2 text-xs text-gray-500 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <span>Patient monitoring</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  <span>Clinical alerts</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                  <span>Review queue</span>
                </div>
              </div>

              <div className="flex items-center justify-center text-blue-400 group-hover:translate-x-1 transition-transform duration-200">
                <span className="text-sm font-medium">Access Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.div
          variants={cardVariants}
          className="text-center mt-12"
        >
          <p className="text-xs text-gray-500">
            This is a prototype demonstration. No real health data is collected or processed.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}