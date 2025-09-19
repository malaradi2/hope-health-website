'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Clock,
  Award,
  Users,
  Stethoscope,
  GraduationCap,
  Building,
  Heart,
  Filter,
  ThumbsUp,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface Review {
  id: string;
  patientName: string;
  condition: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
  treatmentResult: 'improved' | 'stable' | 'excellent';
}

interface DoctorDetails {
  id: string;
  name: string;
  title: string;
  specialty: string;
  subSpecialties: string[];
  rating: number;
  totalReviews: number;
  similarCaseReviews: number;
  distance: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  yearsExperience: number;
  education: string[];
  certifications: string[];
  hospitalAffiliations: string[];
  acceptingPatients: boolean;
  languages: string[];
  insuranceAccepted: string[];
  nextAvailable: string;
  profileImage?: string;
}

interface DoctorProfileModalProps {
  doctor: DoctorDetails | null;
  userCondition: string;
  isOpen: boolean;
  onClose: () => void;
}

const mockDoctorDetails: DoctorDetails = {
  id: '1',
  name: 'Dr. Sarah Chen',
  title: 'MD, FACC, FSCAI',
  specialty: 'Interventional Cardiology',
  subSpecialties: ['Coronary Artery Disease', 'Heart Failure', 'Cardiac Catheterization', 'Preventive Cardiology'],
  rating: 4.9,
  totalReviews: 247,
  similarCaseReviews: 89,
  distance: '0.8 miles',
  phone: '(555) 123-4567',
  email: 'sarah.chen@heartcenter.com',
  website: 'www.heartcenter.com/dr-chen',
  address: '123 Medical Center Dr, Suite 200, City, ST 12345',
  yearsExperience: 15,
  education: [
    'MD - Johns Hopkins School of Medicine',
    'Residency - Internal Medicine, Mayo Clinic',
    'Fellowship - Interventional Cardiology, Cleveland Clinic'
  ],
  certifications: [
    'American Board of Internal Medicine',
    'American Board of Cardiovascular Disease',
    'Fellow, American College of Cardiology (FACC)',
    'Fellow, Society for Cardiovascular Angiography and Interventions (FSCAI)'
  ],
  hospitalAffiliations: [
    'City General Hospital',
    'Heart Institute Medical Center',
    'Regional Medical Center'
  ],
  acceptingPatients: true,
  languages: ['English', 'Mandarin', 'Spanish'],
  insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealth', 'Medicare', 'Medicaid'],
  nextAvailable: 'Dec 18, 2024'
};

const similarCaseReviews: Review[] = [
  {
    id: '1',
    patientName: 'Michael R.',
    condition: 'Coronary Artery Disease',
    rating: 5,
    date: '2 weeks ago',
    title: 'Excellent care for my heart condition',
    content: 'Dr. Chen diagnosed my coronary artery disease early and developed a comprehensive treatment plan. Her explanation of the catheterization procedure was thorough and reassuring. Six months later, my symptoms have significantly improved.',
    helpful: 12,
    verified: true,
    treatmentResult: 'improved'
  },
  {
    id: '2',
    patientName: 'Jennifer L.',
    condition: 'Coronary Artery Disease',
    rating: 5,
    date: '1 month ago',
    title: 'Life-changing treatment',
    content: 'After struggling with chest pain for months, Dr. Chen quickly identified the blockages in my arteries. The stent placement procedure went smoothly, and I feel like I have my life back. Her follow-up care has been exceptional.',
    helpful: 18,
    verified: true,
    treatmentResult: 'excellent'
  },
  {
    id: '3',
    patientName: 'Robert K.',
    condition: 'Coronary Artery Disease',
    rating: 4,
    date: '3 months ago',
    title: 'Professional and caring',
    content: 'Dr. Chen took time to explain my condition and treatment options. The cardiac catheterization revealed significant blockages, and she performed angioplasty with excellent results. Very satisfied with the outcome.',
    helpful: 9,
    verified: true,
    treatmentResult: 'improved'
  },
  {
    id: '4',
    patientName: 'Mary T.',
    condition: 'Coronary Artery Disease',
    rating: 5,
    date: '2 months ago',
    title: 'Expertise you can trust',
    content: 'Dr. Chen\'s expertise in interventional cardiology is evident. She successfully treated my multiple vessel disease with precision. Her team is also fantastic. I would recommend her to anyone with heart problems.',
    helpful: 15,
    verified: true,
    treatmentResult: 'excellent'
  }
];

const generalReviews: Review[] = [
  {
    id: '5',
    patientName: 'David P.',
    condition: 'Hypertension',
    rating: 5,
    date: '1 week ago',
    title: 'Outstanding blood pressure management',
    content: 'Dr. Chen helped me get my blood pressure under control with a personalized medication plan. She is thorough, patient, and truly cares about her patients\' wellbeing.',
    helpful: 8,
    verified: true,
    treatmentResult: 'improved'
  },
  {
    id: '6',
    patientName: 'Lisa M.',
    condition: 'Heart Palpitations',
    rating: 4,
    date: '2 weeks ago',
    title: 'Thorough evaluation',
    content: 'Dr. Chen conducted a comprehensive evaluation of my heart palpitations. The diagnostic workup was thorough and she explained everything clearly. Very professional experience.',
    helpful: 6,
    verified: true,
    treatmentResult: 'stable'
  },
  {
    id: '7',
    patientName: 'James W.',
    condition: 'Preventive Cardiology',
    rating: 5,
    date: '3 weeks ago',
    title: 'Excellent preventive care',
    content: 'Dr. Chen provides exceptional preventive cardiology services. She developed a comprehensive plan to reduce my cardiovascular risk factors. Her approach is evidence-based and personalized.',
    helpful: 11,
    verified: true,
    treatmentResult: 'improved'
  },
  {
    id: '8',
    patientName: 'Susan A.',
    condition: 'Chest Pain',
    rating: 4,
    date: '1 month ago',
    title: 'Compassionate care',
    content: 'Dr. Chen was very thorough in evaluating my chest pain concerns. Her bedside manner is excellent and she takes time to address all questions. I felt very comfortable under her care.',
    helpful: 7,
    verified: true,
    treatmentResult: 'stable'
  }
];

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor: doctorProp,
  userCondition,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'similar' | 'general'>('similar');
  const [selectedSection, setSelectedSection] = useState<'overview' | 'reviews' | 'schedule'>('overview');

  // Use mock data for now, but in real app would use doctorProp
  const doctor = mockDoctorDetails;

  if (!isOpen) return null;

  const currentReviews = activeTab === 'similar' ? similarCaseReviews : generalReviews;
  const averageRating = currentReviews.reduce((sum, review) => sum + review.rating, 0) / currentReviews.length;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-teal-400';
    if (rating >= 4) return 'text-blue-400';
    if (rating >= 3) return 'text-amber-400';
    return 'text-red-400';
  };

  const getTreatmentResultIcon = (result: string) => {
    switch (result) {
      case 'excellent': return <TrendingUp className="w-4 h-4 text-teal-400" />;
      case 'improved': return <CheckCircle className="w-4 h-4 text-blue-400" />;
      case 'stable': return <Heart className="w-4 h-4 text-amber-400" />;
      default: return null;
    }
  };

  const getTreatmentResultText = (result: string) => {
    switch (result) {
      case 'excellent': return 'Excellent Result';
      case 'improved': return 'Significant Improvement';
      case 'stable': return 'Condition Stabilized';
      default: return 'Treatment Ongoing';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[60] bg-black/50 modal-overlay flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="hope-card w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-teal-500/10 to-blue-600/10">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 border-2 border-teal-500/30 flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-teal-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{doctor.name}</h2>
                  <p className="text-teal-400 text-lg">{doctor.title}</p>
                  <p className="text-gray-400">{doctor.specialty}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-white font-semibold">{doctor.rating}</span>
                      <span className="text-gray-400">({doctor.totalReviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mt-6 bg-gray-800/50 rounded-lg p-1">
              {[
                { key: 'overview', label: 'Overview', icon: Users },
                { key: 'reviews', label: 'Reviews', icon: MessageCircle },
                { key: 'schedule', label: 'Schedule', icon: Calendar }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedSection(key as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ease-out ${
                    selectedSection === key
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scroll-smooth modal-content">
            {selectedSection === 'overview' && (
              <div className="p-6 space-y-6">
                {/* Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="hope-card p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="w-5 h-5 text-teal-400" />
                      <span className="font-semibold text-white">Experience</span>
                    </div>
                    <p className="text-2xl font-bold text-teal-400">{doctor.yearsExperience}</p>
                    <p className="text-gray-400 text-sm">Years in Practice</p>
                  </div>

                  <div className="hope-card p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="font-semibold text-white">Patients</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">{doctor.totalReviews}</p>
                    <p className="text-gray-400 text-sm">Total Reviews</p>
                  </div>

                  <div className="hope-card p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Heart className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold text-white">Similar Cases</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-400">{doctor.similarCaseReviews}</p>
                    <p className="text-gray-400 text-sm">Like Your Condition</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Specializations */}
                  <div className="hope-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Specializations</h3>
                    <div className="space-y-2">
                      {doctor.subSpecialties.map((specialty, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                          <span className="text-gray-300">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="hope-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Phone className="w-4 h-4 text-teal-400 mt-0.5" />
                        <div>
                          <p className="text-white">{doctor.phone}</p>
                          <p className="text-gray-400 text-sm">Primary Phone</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Mail className="w-4 h-4 text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-white">{doctor.email}</p>
                          <p className="text-gray-400 text-sm">Email</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Globe className="w-4 h-4 text-purple-400 mt-0.5" />
                        <div>
                          <p className="text-white">{doctor.website}</p>
                          <p className="text-gray-400 text-sm">Website</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-amber-400 mt-0.5" />
                        <div>
                          <p className="text-white">{doctor.address}</p>
                          <p className="text-gray-400 text-sm">Office Address</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="hope-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
                    <div className="space-y-3">
                      {doctor.education.map((edu, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <GraduationCap className="w-4 h-4 text-teal-400 mt-0.5" />
                          <span className="text-gray-300">{edu}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hospital Affiliations */}
                  <div className="hope-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Hospital Affiliations</h3>
                    <div className="space-y-2">
                      {doctor.hospitalAffiliations.map((hospital, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">{hospital}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="hope-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Certifications & Awards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {doctor.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="text-gray-300">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedSection === 'reviews' && (
              <div className="p-6">
                {/* Review Filter Tabs */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab('similar')}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        activeTab === 'similar'
                          ? 'bg-purple-500 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      Similar Cases ({similarCaseReviews.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('general')}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        activeTab === 'general'
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      All Reviews ({generalReviews.length})
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="text-lg font-semibold text-white">{averageRating.toFixed(1)}</span>
                    <span className="text-gray-400">({currentReviews.length} reviews)</span>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {currentReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hope-card p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-500/30 flex items-center justify-center">
                            <span className="text-teal-400 font-semibold">
                              {review.patientName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-3">
                              <h4 className="font-semibold text-white">{review.patientName}</h4>
                              {review.verified && (
                                <div className="flex items-center space-x-1 text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded-full">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Verified Patient</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{review.condition} • {review.date}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-amber-400 fill-current'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-xs">
                          {getTreatmentResultIcon(review.treatmentResult)}
                          <span className={getRatingColor(review.rating)}>
                            {getTreatmentResultText(review.treatmentResult)}
                          </span>
                        </div>
                      </div>

                      <h5 className="font-semibold text-white mb-2">{review.title}</h5>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{review.content}</p>

                      <div className="flex items-center justify-between text-sm">
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-teal-400 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>

                        {activeTab === 'similar' && (
                          <div className="flex items-center space-x-2 text-purple-400">
                            <Heart className="w-4 h-4" />
                            <span>Similar to your condition</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {selectedSection === 'schedule' && (
              <div className="p-6">
                <div className="hope-card p-6 text-center">
                  <Calendar className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Schedule Appointment</h3>
                  <p className="text-gray-400 mb-6">
                    Next available appointment: <span className="text-teal-400 font-semibold">{doctor.nextAvailable}</span>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="text-left">
                      <h4 className="font-semibold text-white mb-2">Insurance Accepted</h4>
                      <div className="space-y-1">
                        {doctor.insuranceAccepted.slice(0, 4).map((insurance, index) => (
                          <p key={index} className="text-gray-300 text-sm">• {insurance}</p>
                        ))}
                        {doctor.insuranceAccepted.length > 4 && (
                          <p className="text-teal-400 text-sm">+ {doctor.insuranceAccepted.length - 4} more</p>
                        )}
                      </div>
                    </div>

                    <div className="text-left">
                      <h4 className="font-semibold text-white mb-2">Languages</h4>
                      <div className="space-y-1">
                        {doctor.languages.map((language, index) => (
                          <p key={index} className="text-gray-300 text-sm">• {language}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 py-3 px-6 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium flex items-center justify-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Book Appointment</span>
                    </button>
                    <button className="flex-1 py-3 px-6 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors font-medium flex items-center justify-center space-x-2">
                      <Phone className="w-5 h-5" />
                      <span>Call Office</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};