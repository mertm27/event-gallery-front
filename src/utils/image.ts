import Compressor from 'compressorjs';
import type { ImageMimeType, ImageDimensions, CompressionOptions } from '../types';

export const SUPPORTED_MIME_TYPES: ImageMimeType[] = ['image/jpeg', 'image/png', 'image/webp'];

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
export const MAX_FILES_PER_BATCH = 20;

export const DEFAULT_COMPRESSION_OPTIONS: CompressionOptions = {
  quality: 0.8,
  maxWidth: 3000,
  maxHeight: 3000,
};

export function isValidImageFile(file: File): boolean {
  return SUPPORTED_MIME_TYPES.includes(file.type as ImageMimeType);
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!isValidImageFile(file)) {
    return {
      valid: false,
      error: 'Please select a valid image file (JPEG, PNG, or WebP)',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than ${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB`,
    };
  }

  return { valid: true };
}

export function getImageDimensions(file: File): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

export function compressImage(
  file: File,
  options: Partial<CompressionOptions> = {}
): Promise<Blob> {
  const opts = { ...DEFAULT_COMPRESSION_OPTIONS, ...options };
  
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: opts.quality,
      maxWidth: opts.maxWidth,
      maxHeight: opts.maxHeight,
      success: (result) => resolve(result),
      error: (error) => reject(error),
    });
  });
}

export function shouldCompress(file: File, threshold: number = 5 * 1024 * 1024): boolean {
  return file.size > threshold;
}

export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to create preview'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
