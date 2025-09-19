'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Image,
  FileText,
  File,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  ArrowLeft
} from 'lucide-react';

import { HopeLogo } from '../../../components/HopeLogo';
import { Dropzone } from '../../../components/Dropzone';
import { useAppStore } from '../../../store/useAppStore';
import { UploadItem, UploadStatus } from '../../../lib/types';
import { formatDate, formatTime, generateId } from '../../../lib/utils';

export default function UploadsPage() {
  const router = useRouter();
  const { currentUser, uploads, addUpload, updateUploadStatus } = useAppStore();
  const [selectedUpload, setSelectedUpload] = useState<UploadItem | null>(null);

  if (!currentUser) {
    router.push('/auth');
    return null;
  }

  const handleFileDrop = async (files: File[]) => {
    for (const file of files) {
      const fileType = file.type.startsWith('image/') ? 'photo' as const :
                      file.type === 'application/pdf' ? 'lab' as const :
                      file.name.toLowerCase().includes('ecg') ? 'ecg' as const :
                      'photo' as const;

      const newUpload: UploadItem = {
        id: generateId(),
        fileName: file.name,
        fileType,
        status: 'uploaded' as UploadStatus,
        uploadedAt: new Date(),
        userId: currentUser.id,
      };

      addUpload(newUpload);

      // Simulate processing
      setTimeout(() => {
        updateUploadStatus(newUpload.id, 'processing');
      }, 1000);

      setTimeout(() => {
        const extractedData = fileType === 'ecg'
          ? { heartRate: 78, rhythm: 'Normal sinus rhythm', pr: 120, qrs: 90, qt: 380 }
          : fileType === 'lab'
          ? { cholesterol: 180, hdl: 55, ldl: 110, glucose: 95, hba1c: 5.4 }
          : { metadata: 'Image processed successfully' };

        updateUploadStatus(newUpload.id, 'ready', extractedData);
      }, 3000);
    }
  };

  const getStatusColor = (status: UploadStatus) => {
    switch (status) {
      case 'uploaded': return 'text-blue-400 bg-blue-500/20';
      case 'processing': return 'text-amber-400 bg-amber-500/20';
      case 'ready': return 'text-teal-400 bg-teal-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: UploadStatus) => {
    switch (status) {
      case 'uploaded': return Upload;
      case 'processing': return Clock;
      case 'ready': return CheckCircle;
      case 'error': return AlertCircle;
      default: return File;
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'ecg':
      case 'photo': return Image;
      case 'lab': return FileText;
      default: return File;
    }
  };

  const getFileTypeLabel = (fileType: string) => {
    switch (fileType) {
      case 'ecg': return 'ECG Reading';
      case 'photo': return 'Photo';
      case 'lab': return 'Lab Results';
      default: return 'Document';
    }
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
                <h1 className="text-xl font-semibold text-white">Upload Health Data</h1>
                <p className="text-sm text-gray-400">Upload ECG readings, lab results, and photos</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-white">{currentUser.name}</p>
              <p className="text-xs text-gray-400">User Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Dropzone */}
              <div className="hope-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Upload New Files</h2>
                <Dropzone
                  onDrop={handleFileDrop}
                  acceptedTypes={['image/*', '.pdf', '.jpg', '.png', '.jpeg']}
                  maxSize={10}
                  multiple={true}
                />

                <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-amber-400 font-medium mb-1">Important Notice</p>
                      <p className="text-amber-300/80">
                        This is a prototype. No real health data is processed or stored.
                        Uploaded files are only simulated for demonstration purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Uploads */}
              <div className="hope-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Recent Uploads</h2>
                {uploads.length === 0 ? (
                  <div className="text-center py-12">
                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No uploads yet</p>
                    <p className="text-sm text-gray-500 mt-1">Upload your first file to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {uploads.map((upload) => {
                      const StatusIcon = getStatusIcon(upload.status);
                      const FileIcon = getFileIcon(upload.fileType);

                      return (
                        <motion.div
                          key={upload.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                          onClick={() => setSelectedUpload(upload)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                              <FileIcon className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-white truncate">
                                {upload.fileName}
                              </h3>
                              <p className="text-xs text-gray-400">
                                {getFileTypeLabel(upload.fileType)} • {formatDate(upload.uploadedAt)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(upload.status)}`}>
                              <StatusIcon className="w-3 h-3" />
                              <span className="capitalize">{upload.status}</span>
                            </div>
                            <button className="p-1 text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upload Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hope-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Upload Guidelines</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Image className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">ECG Images</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Clear photos of ECG strips or smartwatch recordings
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Lab Results</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF reports from blood work, cholesterol panels, etc.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Image className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Medical Photos</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Skin conditions, wound healing progress, etc.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Processing Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hope-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">AI Processing</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-teal-400">1</span>
                  </div>
                  <div>
                    <p className="text-sm text-white">Upload & Validation</p>
                    <p className="text-xs text-gray-400">File safety and format checks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-400">2</span>
                  </div>
                  <div>
                    <p className="text-sm text-white">AI Analysis</p>
                    <p className="text-xs text-gray-400">Extract key health metrics</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-400">3</span>
                  </div>
                  <div>
                    <p className="text-sm text-white">Doctor Review</p>
                    <p className="text-xs text-gray-400">Clinical validation and approval</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* File Details */}
            {selectedUpload && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hope-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">File Details</h3>
                  <button
                    onClick={() => setSelectedUpload(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">File Name</p>
                    <p className="text-sm text-white font-medium">{selectedUpload.fileName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Type</p>
                    <p className="text-sm text-white">{getFileTypeLabel(selectedUpload.fileType)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Uploaded</p>
                    <p className="text-sm text-white">{formatTime(selectedUpload.uploadedAt)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedUpload.status)}`}>
                      {React.createElement(getStatusIcon(selectedUpload.status), { className: "w-3 h-3" })}
                      <span className="capitalize">{selectedUpload.status}</span>
                    </div>
                  </div>

                  {selectedUpload.extractedData && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Extracted Data</p>
                      <div className="bg-gray-800 rounded p-3 space-y-1">
                        {Object.entries(selectedUpload.extractedData).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-xs">
                            <span className="text-gray-400 capitalize">{key}:</span>
                            <span className="text-white">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedUpload.notes && (
                    <div>
                      <p className="text-sm text-gray-400">Notes</p>
                      <p className="text-sm text-white">{selectedUpload.notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}