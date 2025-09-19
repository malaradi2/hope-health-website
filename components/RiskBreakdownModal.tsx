'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Heart,
  AlertTriangle,
  Info,
  TrendingUp,
  Activity,
  Brain,
  Stethoscope,
  MapPin,
  Phone,
  ExternalLink
} from 'lucide-react';
import { RiskScore } from '../lib/types';
import { DoctorProfileModal } from './DoctorProfileModal';

interface HeartDiseaseRisk {
  name: string;
  percentage: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  symptoms: string[];
  prevention: string[];
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  distance: string;
  phone: string;
  address: string;
  acceptingPatients: boolean;
}

interface RiskBreakdownModalProps {
  riskScore: RiskScore;
  isOpen: boolean;
  onClose: () => void;
}

const heartDiseaseRisks: HeartDiseaseRisk[] = [
  {
    name: 'Coronary Artery Disease',
    percentage: 34,
    riskLevel: 'high',
    description: 'Blockage of arteries supplying the heart muscle, potentially leading to heart attacks.',
    symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue', 'Heart palpitations'],
    prevention: ['Regular exercise', 'Heart-healthy diet', 'Quit smoking', 'Manage stress'],
    icon: Heart,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10'
  },
  {
    name: 'Hypertension',
    percentage: 28,
    riskLevel: 'medium',
    description: 'High blood pressure that can damage arteries and organs over time.',
    symptoms: ['Headaches', 'Dizziness', 'Blurred vision', 'Chest pain'],
    prevention: ['Reduce sodium intake', 'Maintain healthy weight', 'Regular monitoring', 'Limit alcohol'],
    icon: Activity,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  },
  {
    name: 'Atrial Fibrillation',
    percentage: 22,
    riskLevel: 'medium',
    description: 'Irregular heartbeat that can increase stroke and heart failure risk.',
    symptoms: ['Irregular pulse', 'Heart fluttering', 'Dizziness', 'Weakness'],
    prevention: ['Manage underlying conditions', 'Limit caffeine', 'Regular cardio', 'Stress reduction'],
    icon: TrendingUp,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  },
  {
    name: 'Heart Failure',
    percentage: 16,
    riskLevel: 'low',
    description: 'Condition where the heart cannot pump blood effectively throughout the body.',
    symptoms: ['Swelling in legs', 'Persistent cough', 'Rapid weight gain', 'Fatigue'],
    prevention: ['Control blood pressure', 'Manage diabetes', 'Regular exercise', 'Limit fluid intake'],
    icon: Brain,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10'
  }
];

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiology',
    rating: 4.9,
    distance: '0.8 miles',
    phone: '(555) 123-4567',
    address: '123 Medical Center Dr, City, ST 12345',
    acceptingPatients: true
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    specialty: 'Interventional Cardiology',
    rating: 4.8,
    distance: '1.2 miles',
    phone: '(555) 234-5678',
    address: '456 Heart Institute Blvd, City, ST 12345',
    acceptingPatients: true
  },
  {
    id: '3',
    name: 'Dr. Emily Thompson',
    specialty: 'Preventive Cardiology',
    rating: 4.7,
    distance: '2.1 miles',
    phone: '(555) 345-6789',
    address: '789 Wellness Center Ave, City, ST 12345',
    acceptingPatients: false
  }
];

export const RiskBreakdownModal: React.FC<RiskBreakdownModalProps> = ({
  riskScore,
  isOpen,
  onClose
}) => {
  const [selectedDisease, setSelectedDisease] = useState<HeartDiseaseRisk | null>(null);
  const [showDoctors, setShowDoctors] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);

  if (!isOpen) return null;

  const getRiskLevelColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'low': return 'text-teal-400 bg-teal-500/20 border-teal-500/30';
    }
  };

  const handleDiseaseClick = (disease: HeartDiseaseRisk) => {
    setSelectedDisease(disease);
    setShowDoctors(false);
  };

  const handleFindDoctors = (disease: HeartDiseaseRisk) => {
    setSelectedDisease(disease);
    setShowDoctors(true);
  };

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorProfile(true);
  };

  const handleCloseDoctorProfile = () => {
    setShowDoctorProfile(false);
    setSelectedDoctor(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/50 modal-overlay flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="hope-card w-full max-w-4xl max-h-[95vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-red-500/10 to-amber-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-amber-500/20 border border-red-500/30 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Heart Disease Risk Breakdown</h2>
                  <p className="text-gray-400">
                    Overall Risk Score: <span className="text-red-400 font-semibold">{riskScore.overall}%</span>
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scroll-smooth modal-content">
            {!selectedDisease ? (
              /* Risk Overview */
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Specific Heart Disease Risks</h3>
                  <p className="text-gray-400 text-sm">
                    Based on your current health metrics, family history, and lifestyle factors
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {heartDiseaseRisks.map((disease, index) => {
                    const Icon = disease.icon;
                    return (
                      <motion.button
                        key={disease.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleDiseaseClick(disease)}
                        className={`${disease.bgColor} border border-opacity-30 rounded-lg p-6 text-left hover:scale-105 transition-all duration-300 ease-out group`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-6 h-6 ${disease.color}`} />
                            <div>
                              <h4 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors duration-300">
                                {disease.name}
                              </h4>
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(disease.riskLevel)}`}>
                                {disease.riskLevel.toUpperCase()} RISK
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${disease.color}`}>
                              {disease.percentage}%
                            </div>
                            <div className="text-xs text-gray-400">risk factor</div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                          {disease.description}
                        </p>

                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <Info className="w-3 h-3" />
                          <span>Click for detailed information and doctor recommendations</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Risk Factors Summary */}
                <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-2">Key Contributing Factors</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Heart rate factors ({riskScore.factors.heartRate > 50 ? 'Elevated' : 'Normal'})</li>
                        <li>• HRV assessment ({riskScore.factors.hrv > 50 ? 'Concerning' : 'Normal'})</li>
                        <li>• Sleep quality ({riskScore.factors.sleep > 50 ? 'Poor' : 'Good'})</li>
                        <li>• Activity level ({riskScore.factors.activity > 50 ? 'Low' : 'Adequate'})</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : showDoctors ? (
              /* Doctor Recommendations */
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => setShowDoctors(false)}
                      className="text-teal-400 hover:text-teal-300 text-sm"
                    >
                      ← Back to {selectedDisease.name}
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Recommended Specialists</h3>
                  <p className="text-gray-400 text-sm">
                    Cardiologists in your area specializing in {selectedDisease.name.toLowerCase()}
                  </p>
                </div>

                <div className="space-y-4">
                  {mockDoctors.map((doctor, index) => (
                    <motion.button
                      key={doctor.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleDoctorClick(doctor)}
                      className={`hope-card p-6 w-full text-left hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 ease-out ${!doctor.acceptingPatients ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-500/30 flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-teal-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white">{doctor.name}</h4>
                            <p className="text-teal-400 text-sm mb-1">{doctor.specialty}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <span>⭐ {doctor.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{doctor.distance}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-400 mt-1">
                              <Phone className="w-3 h-3" />
                              <span>{doctor.phone}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{doctor.address}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            doctor.acceptingPatients
                              ? 'text-teal-400 bg-teal-500/20 border-teal-500/30'
                              : 'text-gray-400 bg-gray-500/20 border-gray-500/30'
                          }`}>
                            {doctor.acceptingPatients ? 'Accepting Patients' : 'Not Accepting'}
                          </div>
                          {doctor.acceptingPatients && (
                            <button className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm flex items-center space-x-1">
                              <span>Schedule</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Click indicator */}
                      <div className="mt-4 text-center">
                        <div className="inline-flex items-center space-x-2 text-sm text-teal-400">
                          <ExternalLink className="w-4 h-4" />
                          <span>Click to view detailed profile and reviews</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              /* Disease Details */
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => setSelectedDisease(null)}
                      className="text-teal-400 hover:text-teal-300 text-sm"
                    >
                      ← Back to Risk Overview
                    </button>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <selectedDisease.icon className={`w-8 h-8 ${selectedDisease.color}`} />
                      <div>
                        <h3 className="text-2xl font-bold text-white">{selectedDisease.name}</h3>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mt-2 ${getRiskLevelColor(selectedDisease.riskLevel)}`}>
                          {selectedDisease.riskLevel.toUpperCase()} RISK - {selectedDisease.percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Description */}
                  <div className="hope-card p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">What is {selectedDisease.name}?</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{selectedDisease.description}</p>
                  </div>

                  {/* Risk Assessment */}
                  <div className={`${selectedDisease.bgColor} border border-opacity-30 rounded-lg p-6`}>
                    <h4 className="text-lg font-semibold text-white mb-3">Your Risk Level</h4>
                    <div className={`text-3xl font-bold ${selectedDisease.color} mb-2`}>
                      {selectedDisease.percentage}%
                    </div>
                    <p className="text-gray-300 text-sm">
                      {selectedDisease.riskLevel === 'high'
                        ? 'This indicates elevated risk requiring prompt medical attention and lifestyle modifications.'
                        : selectedDisease.riskLevel === 'medium'
                        ? 'Moderate risk level. Prevention strategies and regular monitoring recommended.'
                        : 'Lower risk level. Continue current health practices and routine screenings.'
                      }
                    </p>
                  </div>

                  {/* Symptoms */}
                  <div className="hope-card p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Common Symptoms</h4>
                    <ul className="space-y-2">
                      {selectedDisease.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention */}
                  <div className="hope-card p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Prevention Strategies</h4>
                    <ul className="space-y-2">
                      {selectedDisease.prevention.map((strategy, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleFindDoctors(selectedDisease)}
                    className="flex-1 py-3 px-6 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
                  >
                    Find Specialists Near You
                  </button>
                  <button className="flex-1 py-3 px-6 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors font-medium">
                    Get Personalized Plan
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 bg-amber-500/5">
            <div className="flex items-center space-x-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <p className="text-amber-300/80">
                This assessment is for informational purposes only. Consult healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Doctor Profile Modal */}
        <DoctorProfileModal
          doctor={selectedDoctor as any}
          userCondition={selectedDisease?.name || 'Coronary Artery Disease'}
          isOpen={showDoctorProfile}
          onClose={handleCloseDoctorProfile}
        />
      </motion.div>
    </AnimatePresence>
  );
};