'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Pill,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Edit3,
  Trash2,
  ArrowLeft,
  Bell,
  MessageSquare,
  Heart,
  Activity
} from 'lucide-react';

import { HopeLogo } from '../../../components/HopeLogo';
import { MedicationConsultation } from '../../../components/MedicationConsultation';
import { useAppStore } from '../../../store/useAppStore';
import { Medication, DoseLog, MedicationConsultation as ConsultationType } from '../../../lib/types';
import { formatTime, formatDate, generateId } from '../../../lib/utils';

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (medication: Omit<Medication, 'id' | 'adherence'>) => void;
}

const AddMedicationModal: React.FC<AddMedicationModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: 'Daily',
    notes: '',
    color: '#3B82F6'
  });

  const frequencies = ['Once daily', 'Twice daily', 'Three times daily', 'Four times daily', 'As needed'];
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage) return;

    onAdd({
      ...formData,
      startDate: new Date(),
      endDate: undefined,
    });

    setFormData({
      name: '',
      dosage: '',
      frequency: 'Daily',
      notes: '',
      color: '#3B82F6'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="hope-card p-6 w-full max-w-md mx-4"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Add New Medication</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Medication Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none"
              placeholder="e.g., Lisinopril"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Dosage
            </label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none"
              placeholder="e.g., 10mg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-teal-500 focus:outline-none"
            >
              {frequencies.map(freq => (
                <option key={freq} value={freq}>{freq}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color
            </label>
            <div className="flex space-x-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.color === color
                      ? 'border-white scale-110'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none h-20 resize-none"
              placeholder="e.g., Take with food"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Add Medication
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function MedicationsPage() {
  const router = useRouter();
  const { currentUser, medications, addMedication, logDose, addAdviceItem } = useAppStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [showConsultation, setShowConsultation] = useState(false);
  const [consultationMed, setConsultationMed] = useState<Medication | null>(null);

  if (!currentUser) {
    router.push('/auth');
    return null;
  }

  const handleAddMedication = (medicationData: Omit<Medication, 'id' | 'adherence'>) => {
    const newMedication: Medication = {
      ...medicationData,
      id: generateId(),
      adherence: []
    };
    addMedication(newMedication);
  };

  const handleDoseLog = (medicationId: string, taken: boolean) => {
    const now = new Date();
    const doseLog: DoseLog = {
      medicationId,
      scheduledTime: now,
      takenTime: taken ? now : undefined,
      taken,
    };
    logDose(doseLog);
  };

  const handleOpenConsultation = (medication: Medication) => {
    setConsultationMed(medication);
    setShowConsultation(true);
  };

  const handleConsultationSubmit = (consultation: ConsultationType) => {
    if (!currentUser) return;

    // Create an advice item based on the consultation
    const advice = {
      id: generateId(),
      text: consultation.agentResponse,
      summary: `Medication consultation: ${consultation.recommendation.replace(/_/g, ' ')}`,
      tags: ['medication', 'consultation'],
      category: 'Medication Management',
      createdAt: new Date(),
      userId: currentUser.id,
      approvalStatus: consultation.doctorNotified ? 'under_review' as const : 'pending_review' as const,
      reviewHistory: [],
      urgencyLevel: consultation.followUpRequired ? 'high' as const : 'medium' as const,
      confidence: 88,
      evidenceLevel: 'moderate' as const,
      medicationRelated: consultation.medicationId,
    };

    addAdviceItem(advice);

    // In a real app, we would save the consultation to the medication record
    // For now, we'll show it was submitted successfully
    setShowConsultation(false);
    setConsultationMed(null);
  };

  const getAdherenceRate = (medication: Medication) => {
    const last7Days = medication.adherence.filter(dose =>
      dose.scheduledTime.getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
    );
    if (last7Days.length === 0) return 0;
    return Math.round((last7Days.filter(dose => dose.taken).length / last7Days.length) * 100);
  };

  const getTodayDoses = (medication: Medication) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return medication.adherence.filter(dose =>
      dose.scheduledTime.getTime() >= today.getTime()
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/user')}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <HopeLogo size="sm" />
              <div>
                <h1 className="text-xl font-semibold text-white">Medications</h1>
                <p className="text-sm text-gray-400">Track your medications and adherence</p>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Medication</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-amber-400 font-medium mb-1">Medical Disclaimer</p>
              <p className="text-amber-300/80">
                Medication information is for tracking purposes only. Always confirm dosage, timing,
                and interactions with your healthcare provider. Never modify your medications without medical supervision.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Medications List */}
          <div className="lg:col-span-2">
            {medications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hope-card p-12 text-center"
              >
                <Pill className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No medications added</h3>
                <p className="text-gray-400 mb-6">
                  Start by adding your current medications to track adherence and set reminders.
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Medication</span>
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {medications.map((medication, index) => {
                  const adherenceRate = getAdherenceRate(medication);
                  const todayDoses = getTodayDoses(medication);

                  return (
                    <motion.div
                      key={medication.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hope-card p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div
                            className="w-4 h-4 rounded-full mt-1"
                            style={{ backgroundColor: medication.color }}
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {medication.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {medication.dosage} • {medication.frequency}
                            </p>
                            {medication.notes && (
                              <p className="text-xs text-gray-500 mt-1">{medication.notes}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">
                              {adherenceRate}%
                            </p>
                            <p className="text-xs text-gray-400">7-day adherence</p>
                          </div>
                          <div
                            className={`w-2 h-8 rounded-full ${
                              adherenceRate >= 90 ? 'bg-teal-500' :
                              adherenceRate >= 70 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Today's doses */}
                      <div className="border-t border-gray-700 pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-300">Today's Doses</h4>
                          <span className="text-xs text-gray-500">
                            {todayDoses.filter(d => d.taken).length} of {Math.max(1, todayDoses.length)} taken
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {Array.from({ length: Math.max(1, todayDoses.length || 1) }, (_, i) => {
                            const dose = todayDoses[i];
                            const taken = dose?.taken || false;

                            return (
                              <button
                                key={i}
                                onClick={() => handleDoseLog(medication.id, !taken)}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${
                                  taken
                                    ? 'bg-teal-500 border-teal-500 text-white'
                                    : 'border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white'
                                }`}
                              >
                                {taken ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                              </button>
                            );
                          })}
                          <button
                            onClick={() => handleDoseLog(medication.id, true)}
                            className="ml-4 px-3 py-1 text-xs bg-teal-500/20 text-teal-400 rounded-full hover:bg-teal-500/30 transition-colors"
                          >
                            Mark Taken
                          </button>
                        </div>
                      </div>

                      {/* Impact Tracking */}
                      {medication.impactTracking && (
                        <div className="border-t border-gray-700 pt-4 mt-4">
                          <h5 className="text-sm font-medium text-gray-300 mb-3">Physiological Impact</h5>
                          <div className="grid grid-cols-2 gap-4">
                            {medication.impactTracking.physiologicalChanges.heartRate && (
                              <div className="bg-gray-800/50 p-3 rounded-lg">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Heart className="w-4 h-4 text-red-400" />
                                  <span className="text-xs text-gray-400">Heart Rate</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-300">
                                    {medication.impactTracking.physiologicalChanges.heartRate.before}
                                  </span>
                                  <span className="text-xs text-gray-500">→</span>
                                  <span className="text-sm font-semibold text-teal-400">
                                    {medication.impactTracking.physiologicalChanges.heartRate.after}
                                  </span>
                                  <span className="text-xs text-teal-400">
                                    ({medication.impactTracking.physiologicalChanges.heartRate.change > 0 ? '+' : ''}{medication.impactTracking.physiologicalChanges.heartRate.change})
                                  </span>
                                </div>
                              </div>
                            )}

                            {medication.impactTracking.physiologicalChanges.bloodPressure && (
                              <div className="bg-gray-800/50 p-3 rounded-lg">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Activity className="w-4 h-4 text-blue-400" />
                                  <span className="text-xs text-gray-400">Blood Pressure</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-300">
                                    {medication.impactTracking.physiologicalChanges.bloodPressure.before.join('/')}
                                  </span>
                                  <span className="text-xs text-gray-500">→</span>
                                  <span className="text-sm font-semibold text-teal-400">
                                    {medication.impactTracking.physiologicalChanges.bloodPressure.after.join('/')}
                                  </span>
                                  <span className={`text-xs ${
                                    medication.impactTracking.physiologicalChanges.bloodPressure.change === 'improved' ? 'text-teal-400' :
                                    medication.impactTracking.physiologicalChanges.bloodPressure.change === 'worsened' ? 'text-red-400' : 'text-gray-400'
                                  }`}>
                                    ({medication.impactTracking.physiologicalChanges.bloodPressure.change})
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="mt-3 p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm text-teal-400 font-medium">
                                  Effectiveness: {medication.impactTracking.effectivenessScore}/10
                                </div>
                                {medication.impactTracking.recommendationGenerated && (
                                  <div className="text-xs text-gray-300 mt-1">
                                    {medication.impactTracking.recommendationGenerated}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Consultation Button */}
                      <div className="border-t border-gray-700 pt-4 mt-4">
                        <button
                          onClick={() => handleOpenConsultation(medication)}
                          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-purple-500/20 to-blue-600/20 border border-purple-500/30 text-purple-400 rounded-lg hover:from-purple-500/30 hover:to-blue-600/30 transition-all duration-200"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Consult AI about this medication</span>
                        </button>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-4">
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>Started {formatDate(medication.startDate)}</span>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedMed(medication)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hope-card p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="w-5 h-5 text-teal-400" />
                <h3 className="text-lg font-semibold text-white">Today's Schedule</h3>
              </div>

              {medications.length === 0 ? (
                <p className="text-gray-400 text-sm">No medications to display</p>
              ) : (
                <div className="space-y-3">
                  {medications.map(medication => {
                    const todayDoses = getTodayDoses(medication);
                    const nextDose = todayDoses.find(dose => !dose.taken);

                    return (
                      <div key={medication.id} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: medication.color }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{medication.name}</p>
                          <p className="text-xs text-gray-400">{medication.dosage}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">
                            {nextDose ? 'Next dose' : 'All taken'}
                          </p>
                          <p className="text-xs text-white">
                            {nextDose ? formatTime(nextDose.scheduledTime) : '✓'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Adherence Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hope-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Adherence Overview</h3>

              {medications.length === 0 ? (
                <p className="text-gray-400 text-sm">Add medications to track adherence</p>
              ) : (
                <div className="space-y-4">
                  {medications.map(medication => {
                    const adherenceRate = getAdherenceRate(medication);
                    return (
                      <div key={medication.id}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">{medication.name}</span>
                          <span className="text-sm font-medium text-white">{adherenceRate}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${
                              adherenceRate >= 90 ? 'bg-teal-500' :
                              adherenceRate >= 70 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${adherenceRate}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-500">
                      Based on last 7 days. Maintaining 90%+ adherence is recommended for optimal therapeutic benefits.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Medication Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hope-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2" />
                  <p className="text-sm text-gray-300">
                    Set consistent times for taking medications
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                  <p className="text-sm text-gray-300">
                    Use pill organizers for complex regimens
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                  <p className="text-sm text-gray-300">
                    Keep medications in their original containers
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Medication Modal */}
      <AddMedicationModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddMedication}
      />

      {/* Medication Consultation Modal */}
      {consultationMed && (
        <MedicationConsultation
          medication={consultationMed}
          isOpen={showConsultation}
          onClose={() => {
            setShowConsultation(false);
            setConsultationMed(null);
          }}
          onSubmit={handleConsultationSubmit}
        />
      )}
    </div>
  );
}