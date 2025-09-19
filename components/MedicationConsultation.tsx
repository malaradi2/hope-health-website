'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Activity,
  Heart,
  Moon,
  Zap
} from 'lucide-react';
import { Medication, MedicationConsultation as ConsultationType } from '../lib/types';
import { generateId, formatTime } from '../lib/utils';

interface MedicationConsultationProps {
  medication: Medication;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (consultation: ConsultationType) => void;
}

export const MedicationConsultation: React.FC<MedicationConsultationProps> = ({
  medication,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    symptoms: [] as string[],
    sideEffects: [] as string[],
    effectiveness: 5,
    patientReport: '',
    specificConcerns: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const commonSymptoms = [
    'Dizziness', 'Nausea', 'Fatigue', 'Headache', 'Sleep issues',
    'Heart palpitations', 'Shortness of breath', 'Muscle weakness',
    'Mood changes', 'Appetite changes', 'Skin reactions', 'Other'
  ];

  const effectivenessLabels = {
    1: 'Not effective at all',
    2: 'Slightly effective',
    3: 'Somewhat effective',
    4: 'Moderately effective',
    5: 'Very effective',
    6: 'Extremely effective'
  };

  const generateAIResponse = (): ConsultationType => {
    const hasSerious = formData.sideEffects.some(effect =>
      ['Heart palpitations', 'Shortness of breath', 'Severe dizziness'].includes(effect)
    );

    const lowEffectiveness = formData.effectiveness <= 2;
    const hasMultipleSymptoms = formData.symptoms.length >= 3;

    let recommendation: ConsultationType['recommendation'];
    let agentResponse: string;
    let recommendationReason: string;

    if (hasSerious) {
      recommendation = 'consult_doctor';
      agentResponse = `Based on your report of ${formData.sideEffects.join(', ')}, I recommend immediate consultation with your healthcare provider. These symptoms may require medication adjustment or alternative treatment options.`;
      recommendationReason = 'Serious side effects reported that require clinical evaluation';
    } else if (lowEffectiveness && hasMultipleSymptoms) {
      recommendation = 'adjust_dose';
      agentResponse = `Your current ${medication.name} dosage may not be optimal. With an effectiveness rating of ${formData.effectiveness}/6 and multiple symptoms, a dosage adjustment could improve your outcomes. Your doctor should evaluate this.`;
      recommendationReason = 'Poor effectiveness combined with multiple symptoms suggests suboptimal dosing';
    } else if (formData.symptoms.length === 0 && formData.effectiveness >= 4) {
      recommendation = 'continue';
      agentResponse = `Your current ${medication.name} regimen appears to be working well with good effectiveness and no concerning symptoms. Continue as prescribed and maintain regular monitoring.`;
      recommendationReason = 'Good effectiveness with minimal side effects';
    } else {
      recommendation = 'consult_doctor';
      agentResponse = `Based on your symptoms and effectiveness rating, I recommend discussing your ${medication.name} therapy with your healthcare provider to ensure optimal treatment.`;
      recommendationReason = 'Mixed response profile requires clinical assessment';
    }

    return {
      id: generateId(),
      medicationId: medication.id,
      patientReport: `${formData.patientReport} ${formData.specificConcerns}`.trim(),
      symptoms: formData.symptoms,
      sideEffects: formData.sideEffects,
      effectiveness: formData.effectiveness,
      agentResponse,
      recommendation,
      recommendationReason,
      timestamp: new Date(),
      followUpRequired: hasSerious || lowEffectiveness,
      doctorNotified: hasSerious
    };
  };

  const handleSubmit = async () => {
    setIsProcessing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const consultation = generateAIResponse();
    onSubmit(consultation);

    setIsProcessing(false);
    onClose();

    // Reset form
    setStep(1);
    setFormData({
      symptoms: [],
      sideEffects: [],
      effectiveness: 5,
      patientReport: '',
      specificConcerns: ''
    });
  };

  const toggleSymptom = (symptom: string, type: 'symptoms' | 'sideEffects') => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(symptom)
        ? prev[type].filter(s => s !== symptom)
        : [...prev[type], symptom]
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="hope-card w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-purple-500/10 to-blue-600/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: medication.color }}
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Medication Consultation
                  </h3>
                  <p className="text-sm text-gray-400">
                    {medication.name} • {medication.dosage}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {!isProcessing ? (
              <>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">
                        How effective is this medication for you?
                      </h4>
                      <p className="text-sm text-gray-400 mb-4">
                        Rate how well {medication.name} is working for your condition
                      </p>

                      <div className="space-y-3">
                        {Object.entries(effectivenessLabels).map(([value, label]) => (
                          <button
                            key={value}
                            onClick={() => setFormData(prev => ({ ...prev, effectiveness: parseInt(value) }))}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${
                              formData.effectiveness === parseInt(value)
                                ? 'border-teal-500 bg-teal-500/10 text-teal-400'
                                : 'border-gray-700 hover:border-gray-600 text-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{label}</span>
                              <span className="text-2xl font-bold">{value}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setStep(2)}
                        className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">
                        Are you experiencing any symptoms or side effects?
                      </h4>
                      <p className="text-sm text-gray-400 mb-4">
                        Select all that apply since starting {medication.name}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {commonSymptoms.map((symptom) => (
                          <button
                            key={symptom}
                            onClick={() => toggleSymptom(symptom, 'sideEffects')}
                            className={`text-left p-3 rounded-lg border transition-all ${
                              formData.sideEffects.includes(symptom)
                                ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                                : 'border-gray-700 hover:border-gray-600 text-gray-300'
                            }`}
                          >
                            {symptom}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">
                        Tell us more about your experience
                      </h4>
                      <p className="text-sm text-gray-400 mb-4">
                        Describe how you've been feeling since taking {medication.name}
                      </p>

                      <textarea
                        value={formData.patientReport}
                        onChange={(e) => setFormData(prev => ({ ...prev, patientReport: e.target.value }))}
                        className="w-full h-32 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none resize-none"
                        placeholder="Describe your symptoms, energy levels, mood, or any changes you've noticed..."
                      />
                    </div>

                    <div>
                      <h5 className="text-md font-medium text-white mb-2">
                        Any specific concerns? (Optional)
                      </h5>
                      <textarea
                        value={formData.specificConcerns}
                        onChange={(e) => setFormData(prev => ({ ...prev, specificConcerns: e.target.value }))}
                        className="w-full h-24 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none resize-none"
                        placeholder="Questions about dosage, timing, interactions, etc..."
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setStep(2)}
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.patientReport.trim()}
                        className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Get AI Guidance
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Activity className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Analyzing Your Report
                </h3>
                <p className="text-gray-400 mb-4">
                  Processing your symptoms and medication response...
                </p>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 bg-amber-500/5">
            <div className="flex items-center space-x-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <p className="text-amber-300/80">
                AI guidance only • Serious concerns will be flagged for doctor review • Not medical diagnosis
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};