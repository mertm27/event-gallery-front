import { useState, useRef, useCallback } from 'react';
import { X, Upload, Camera, Image as ImageIcon, Trash2, Check } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { api } from '../api/client';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../api/queryKeys';
import {
  validateImageFile,
  compressImage,
  createImagePreview,
  formatFileSize,
  shouldCompress,
  getImageDimensions,
  MAX_FILES_PER_BATCH,
} from '../utils/image';
import type { UploadFile, InviteToken } from '../types';

interface UploadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  token: InviteToken;
}

export function UploadDrawer({ isOpen, onClose, token }: UploadDrawerProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { nickname, addToast } = useAppStore();
  const queryClient = useQueryClient();

  const handleFileSelect = useCallback(async (selectedFiles: FileList) => {
    const newFiles: UploadFile[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Validate file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        addToast({
          type: 'error',
          title: 'Invalid file',
          description: validation.error,
        });
        continue;
      }

      // Check file limit
      if (files.length + newFiles.length >= MAX_FILES_PER_BATCH) {
        addToast({
          type: 'error',
          title: 'Too many files',
          description: `Maximum ${MAX_FILES_PER_BATCH} files per upload`,
        });
        break;
      }

      try {
        const preview = await createImagePreview(file);
        const uploadFile: UploadFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
          caption: '',
          progress: 0,
          status: 'pending',
        };

        // Compress if needed
        if (shouldCompress(file)) {
          try {
            uploadFile.compressed = await compressImage(file);
          } catch (error) {
            console.warn('Failed to compress image:', error);
          }
        }

        newFiles.push(uploadFile);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Failed to process file',
          description: file.name,
        });
      }
    }

    setFiles(prev => [...prev, ...newFiles]);
  }, [files.length, addToast]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      handleFileSelect(selectedFiles);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const updateCaption = (id: string, caption: string) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, caption } : file
    ));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Prepare files for upload
      const filesToUpload = files.map(file => ({
        fileName: file.file.name,
        mimeType: file.file.type,
        size: file.compressed ? file.compressed.size : file.file.size,
      }));

      // Begin upload
      const beginResponse = await api.beginUpload({
        token,
        files: filesToUpload,
        uploaderName: nickname || undefined,
      });

      // Update files with upload info
      const updatedFiles = files.map((file, index) => {
        const upload = beginResponse.uploads[index];
        return {
          ...file,
          status: 'uploading' as const,
        };
      });
      setFiles(updatedFiles);

      // Simulate upload progress
      const totalFiles = files.length;
      let completedFiles = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const upload = beginResponse.uploads[i];
        
        try {
          // Simulate PUT request to upload URL
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
          
          // Update progress
          completedFiles++;
          const progress = (completedFiles / totalFiles) * 100;
          setUploadProgress(progress);
          
          // Update file status
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'completed' } : f
          ));
        } catch (error) {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { 
              ...f, 
              status: 'error', 
              error: 'Upload failed' 
            } : f
          ));
        }
      }

      // Complete upload
      const completed = await Promise.all(files.map(async (file, index) => {
        const upload = beginResponse.uploads[index];
        const dimensions = await getImageDimensions(file.file);
        return {
          objectKey: upload.objectKey,
          caption: file.caption || undefined,
          width: dimensions.width,
          height: dimensions.height,
        };
      }));

      await api.completeUpload({
        token,
        completed,
      });

      // Invalidate queries to refresh gallery
      queryClient.invalidateQueries({ queryKey: queryKeys.allPhotos(token) });

      addToast({
        type: 'success',
        title: 'Upload complete!',
        description: `${files.length} photo${files.length > 1 ? 's' : ''} uploaded successfully`,
      });

      // Close drawer and reset
      onClose();
      setFiles([]);
      setUploadProgress(0);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Upload failed',
        description: 'Please try again',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (isUploading) return;
    onClose();
    setFiles([]);
    setUploadProgress(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
      <div className="bg-white dark:bg-gray-900 rounded-t-2xl w-full max-h-[80vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Upload Photos
          </h2>
          <button
            onClick={handleClose}
            disabled={isUploading}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            aria-label="Close upload drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {files.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select photos to upload
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Choose photos from your camera or gallery
              </p>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Choose from Gallery
                </button>
                <button
                  onClick={() => {
                    const input = fileInputRef.current;
                    if (input) {
                      input.setAttribute('capture', 'environment');
                      input.click();
                    }
                  }}
                  className="btn btn-secondary"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {files.map((file) => (
                  <div key={file.id} className="relative">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={file.preview}
                        alt={file.file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* File info */}
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {file.file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.compressed?.size || file.file.size)}
                      </p>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="absolute top-2 right-2">
                      {file.status === 'completed' && (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {file.status === 'error' && (
                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                          <X className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {file.status === 'uploading' && (
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                    
                    {/* Remove button */}
                    {file.status === 'pending' && (
                      <button
                        onClick={() => removeFile(file.id)}
                        className="absolute top-2 left-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                        aria-label="Remove file"
                      >
                        <Trash2 className="w-3 h-3 text-white" />
                      </button>
                    )}
                    
                    {/* Caption input */}
                    {file.status === 'pending' && (
                      <input
                        type="text"
                        placeholder="Add a caption (optional)"
                        value={file.caption}
                        onChange={(e) => updateCaption(file.id, e.target.value)}
                        className="input w-full mt-2 text-sm"
                        maxLength={200}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Upload progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {files.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || files.length >= MAX_FILES_PER_BATCH}
                className="btn btn-secondary flex-1"
              >
                Add More
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading || files.every(f => f.status === 'completed')}
                className="btn btn-primary flex-1"
              >
                {isUploading ? 'Uploading...' : 'Upload Photos'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
