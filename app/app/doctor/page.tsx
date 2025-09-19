'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Users,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Activity,
  Heart
} from 'lucide-react';

import { HopeLogo } from '../../components/HopeLogo';
import { RiskGauge } from '../../components/RiskGauge';
import { AdviceItem } from '../../components/AdviceItem';
import { useAppStore } from '../../store/useAppStore';
import { formatDate, formatTime, getRiskColor } from '../../lib/utils';
import { PatientSummary, PatientAlert, UploadItem, AdviceItem as AdviceItemType } from '../../lib/types';

type TabType = 'patients' | 'alerts' | 'review';

export default function DoctorDashboard() {
  const router = useRouter();
  const {
    currentUser,
    patients,
    alerts,
    reviewQueue,
    adviceItems,
    uploads,
    acknowledgeAlert,
    resolveAlert,
    approveAdviceItem,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<TabType>('patients');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary | null>(null);

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth');
      return;
    }

    if (currentUser.role !== 'doctor') {
      router.push('/user');
      return;
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'doctor') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="hope-live-pulse w-8 h-8 bg-teal-400 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const filteredPatients = patients.filter(patient =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.flags.some(flag => flag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const unresolvedAlerts = alerts.filter(alert => !alert.resolved);
  const pendingReviews = reviewQueue.length;

  const handleApproveAdvice = (id: string) => {
    approveAdviceItem(id, {
      by: currentUser.id,
      reviewerName: currentUser.name
    });
  };

  const handleAcknowledgeAlert = (id: string) => {
    acknowledgeAlert(id, currentUser.id);
  };

  const handleResolveAlert = (id: string) => {
    resolveAlert(id, currentUser.id);
  };

  const exportPatientSummary = (patient: PatientSummary) => {
    const data = {
      patient: patient.patientName,
      age: patient.age,
      riskScore: patient.riskScore.overall,
      riskLevel: patient.riskScore.level,
      keyMetrics: patient.keyMetrics,
      summary: patient.summary,
      flags: patient.flags,
      lastSync: patient.lastSync,
      exportedAt: new Date(),
      exportedBy: currentUser.name,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patient.patientName.replace(/\s+/g, '_')}_summary_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { key: 'patients' as TabType, label: 'Patients', icon: Users, count: patients.length },
    { key: 'alerts' as TabType, label: 'Alerts', icon: AlertTriangle, count: unresolvedAlerts.length },
    { key: 'review' as TabType, label: 'Review Queue', icon: FileText, count: pendingReviews },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <HopeLogo size="sm" />
              <div>
                <h1 className="text-xl font-semibold text-white">Doctor Dashboard</h1>
                <p className="text-sm text-gray-400">Patient monitoring and clinical review</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{currentUser.name}</p>
                <p className="text-xs text-gray-400">Clinical Dashboard</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {currentUser.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="hope-card p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <Users className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{patients.length}</p>
                <p className="text-sm text-gray-400">Active Patients</p>
              </div>
            </div>
          </div>

          <div className="hope-card p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{unresolvedAlerts.length}</p>
                <p className="text-sm text-gray-400">Active Alerts</p>
              </div>
            </div>
          </div>

          <div className="hope-card p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingReviews}</p>
                <p className="text-sm text-gray-400">Pending Reviews</p>
              </div>
            </div>
          </div>

          <div className="hope-card p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {patients.filter(p => p.riskScore.level === 'high').length}
                </p>
                <p className="text-sm text-gray-400">High Risk</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-teal-500 text-teal-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      activeTab === tab.key
                        ? 'bg-teal-500/20 text-teal-400'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Patients Tab */}
            {activeTab === 'patients' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Search and Filter */}
                <div className="hope-card p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search patients by name or flags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-gray-600 transition-colors">
                      <Filter className="w-5 h-5" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                {/* Patients List */}
                <div className="space-y-4">
                  {filteredPatients.map((patient) => (
                    <motion.div
                      key={patient.patientId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hope-card p-6 cursor-pointer hover:border-gray-600 transition-colors"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold text-white">
                              {patient.patientName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{patient.patientName}</h3>
                            <p className="text-sm text-gray-400">Age {patient.age} • Last sync: {formatTime(patient.lastSync)}</p>
                            {patient.flags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {patient.flags.map((flag, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-400"
                                  >
                                    {flag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="flex items-center space-x-2">
                              <Heart className="w-4 h-4 text-red-400" />
                              <span className="text-lg font-semibold text-white">{patient.keyMetrics.restingHR}</span>
                              <span className="text-sm text-gray-400">bpm</span>
                            </div>
                            <p className="text-xs text-gray-500">Resting HR</p>
                          </div>

                          <div className="text-center">
                            <div className="flex items-center space-x-2">
                              <Activity className="w-4 h-4 text-teal-400" />
                              <span className="text-lg font-semibold text-white">{patient.keyMetrics.hrv}</span>
                              <span className="text-sm text-gray-400">ms</span>
                            </div>
                            <p className="text-xs text-gray-500">HRV</p>
                          </div>

                          <RiskGauge riskScore={patient.riskScore} size="sm" />

                          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Alerts Tab */}
            {activeTab === 'alerts' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {unresolvedAlerts.length === 0 ? (
                  <div className="hope-card p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">All Clear!</h3>
                    <p className="text-gray-400">No active alerts requiring attention.</p>
                  </div>
                ) : (
                  unresolvedAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hope-card p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${
                            alert.severity === 'high' ? 'bg-red-500/20' :
                            alert.severity === 'medium' ? 'bg-amber-500/20' : 'bg-blue-500/20'
                          }`}>
                            <AlertTriangle className={`w-6 h-6 ${
                              alert.severity === 'high' ? 'text-red-400' :
                              alert.severity === 'medium' ? 'text-amber-400' : 'text-blue-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">{alert.patientName}</h3>
                            <p className="text-sm text-gray-300 mb-2">{alert.message}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-400">
                              <span>{formatTime(alert.createdAt)}</span>
                              <span>•</span>
                              <span>Value: {alert.value} (Threshold: {alert.threshold})</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {!alert.acknowledged && (
                            <button
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                              className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                            >
                              Acknowledge
                            </button>
                          )}
                          <button
                            onClick={() => handleResolveAlert(alert.id)}
                            className="px-3 py-1 text-xs bg-teal-500/20 text-teal-400 rounded hover:bg-teal-500/30 transition-colors"
                          >
                            Resolve
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {/* Review Queue Tab */}
            {activeTab === 'review' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {pendingReviews === 0 ? (
                  <div className="hope-card p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">All Caught Up!</h3>
                    <p className="text-gray-400">No items pending review.</p>
                  </div>
                ) : (
                  <>
                    {/* Advice Items */}
                    {adviceItems.filter(advice => advice.approvalStatus !== 'approved').length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Advice Items Awaiting Approval</h3>
                        <div className="space-y-4">
                          {adviceItems.filter(advice => advice.approvalStatus !== 'approved').map((advice) => (
                            <AdviceItem
                              key={advice.id}
                              advice={advice}
                              showApproval={true}
                              onApprove={handleApproveAdvice}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upload Items */}
                    {uploads.filter(upload => upload.status === 'ready').length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">New Uploads Ready for Review</h3>
                        <div className="space-y-4">
                          {uploads.filter(upload => upload.status === 'ready').map((upload) => (
                            <div key={upload.id} className="hope-card p-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-lg font-semibold text-white">{upload.fileName}</h4>
                                  <p className="text-sm text-gray-400 mb-2">
                                    {upload.fileType.toUpperCase()} • Uploaded {formatTime(upload.uploadedAt)}
                                  </p>
                                  {upload.extractedData && (
                                    <div className="bg-gray-800 rounded p-3 mt-3">
                                      <p className="text-sm text-gray-400 mb-1">Extracted Data:</p>
                                      <div className="space-y-1">
                                        {Object.entries(upload.extractedData).map(([key, value]) => (
                                          <div key={key} className="flex justify-between text-sm">
                                            <span className="text-gray-400 capitalize">{key}:</span>
                                            <span className="text-white">{String(value)}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex space-x-2">
                                  <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors">
                                    Review
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hope-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-teal-400" />
                    <span className="text-sm text-white">Export All Data</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-white">Generate Report</span>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Patient Detail */}
            {selectedPatient && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hope-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Patient Details</h3>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Patient</p>
                    <p className="text-lg font-semibold text-white">{selectedPatient.patientName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Age</p>
                    <p className="text-white">{selectedPatient.age} years</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Risk Assessment</p>
                    <RiskGauge riskScore={selectedPatient.riskScore} size="sm" showDetails={false} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Clinical Summary</p>
                    <div className="bg-gray-800 rounded p-3">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {selectedPatient.summary}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => exportPatientSummary(selectedPatient)}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Summary</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}