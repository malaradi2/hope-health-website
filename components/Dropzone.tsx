'use client';

import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, Image, FileText, X, CheckCircle } from 'lucide-react';

interface DropzoneProps {
  onDrop: (files: File[]) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  multiple?: boolean;
  className?: string;
}

interface FilePreview {
  file: File;
  id: string;
  preview?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onDrop,
  acceptedTypes = ['image/*', '.pdf'],
  maxSize = 10,
  multiple = true,
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'completed'>('idle');

  const getFileType = (file: File) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'pdf';
    return 'file';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return Image;
      case 'pdf': return FileText;
      default: return File;
    }
  };

  const validateFile = (file: File) => {
    // Size validation
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Type validation
    const isValidType = acceptedTypes.some(type => {
      if (type.includes('/')) {
        return file.type.match(type.replace('*', '.*'));
      }
      return file.name.toLowerCase().endsWith(type);
    });

    if (!isValidType) {
      return `File type not accepted. Allowed: ${acceptedTypes.join(', ')}`;
    }

    return null;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    droppedFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      const newFiles: FilePreview[] = validFiles.map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      }));

      if (multiple) {
        setFiles(prev => [...prev, ...newFiles]);
      } else {
        setFiles(newFiles);
      }
    }

    if (errors.length > 0) {
      // In a real app, you'd show these errors to the user
      console.error('File validation errors:', errors);
    }
  }, [acceptedTypes, maxSize, multiple]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleDrop({ dataTransfer: { files: selectedFiles } } as any);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      // Revoke object URLs to prevent memory leaks
      prev.forEach(f => {
        if (f.preview && f.id === id) {
          URL.revokeObjectURL(f.preview);
        }
      });
      return updated;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploadStatus('uploading');

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    onDrop(files.map(f => f.file));
    setUploadStatus('completed');

    // Reset after successful upload
    setTimeout(() => {
      setFiles([]);
      setUploadStatus('idle');
    }, 1500);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Dropzone */}
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-teal-400 bg-teal-400/10'
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploadStatus === 'uploading'}
        />

        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragOver ? 1.1 : 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className={`p-4 rounded-full ${
            isDragOver ? 'bg-teal-400/20' : 'bg-gray-700'
          }`}>
            <Upload className={`w-8 h-8 ${
              isDragOver ? 'text-teal-400' : 'text-gray-400'
            }`} />
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-2">
              {isDragOver ? 'Drop files here' : 'Upload your files'}
            </h3>
            <p className="text-sm text-gray-400">
              Drag & drop or click to select files
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Accepted: {acceptedTypes.join(', ')} • Max {maxSize}MB
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* File previews */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 space-y-2"
        >
          {files.map((fileItem) => {
            const FileIcon = getFileIcon(getFileType(fileItem.file));
            return (
              <div
                key={fileItem.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  {fileItem.preview ? (
                    <img
                      src={fileItem.preview}
                      alt={fileItem.file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                      <FileIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {fileItem.file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(fileItem.file.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFile(fileItem.id)}
                  className="p-1 text-gray-400 hover:text-white"
                  disabled={uploadStatus === 'uploading'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          {/* Upload button */}
          <motion.button
            onClick={handleUpload}
            disabled={uploadStatus !== 'idle'}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              uploadStatus === 'idle'
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : uploadStatus === 'uploading'
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-teal-500 text-white'
            }`}
            whileHover={uploadStatus === 'idle' ? { scale: 1.02 } : {}}
            whileTap={uploadStatus === 'idle' ? { scale: 0.98 } : {}}
          >
            {uploadStatus === 'idle' && 'Upload Files'}
            {uploadStatus === 'uploading' && (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                <span>Uploading...</span>
              </div>
            )}
            {uploadStatus === 'completed' && (
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Uploaded!</span>
              </div>
            )}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};