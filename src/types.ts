export type InviteToken = string;

export interface EventInfo {
  token: InviteToken;
  title: string;           // e.g., "Mert & Ajshe — 14.09.2025"
  coverUrl?: string;
  createdAt: string;
}

export interface PhotoMeta {
  id: string;              // opaque id (maps to encrypted/obfuscated filename key)
  url: string;             // CDN/public URL (mock now)
  width: number;
  height: number;
  uploaderName?: string;
  caption?: string;
  createdAt: string;
}

export interface ListPhotosRequest {
  token: InviteToken;
  cursor?: string;         // for pagination/infinite scroll
  limit?: number;          // default 50
}

export interface ListPhotosResponse {
  items: PhotoMeta[];
  nextCursor?: string;
}

export interface BeginUploadRequest {
  token: InviteToken;
  files: { fileName: string; mimeType: string; size: number }[];
  uploaderName?: string;
}

export interface BeginUploadResponse {
  uploads: {
    tempId: string;         // client maps local file → this temp upload
    uploadUrl: string;      // presigned URL (mock now)
    objectKey: string;      // server-side opaque key; becomes final file name
  }[];
}

export interface CompleteUploadRequest {
  token: InviteToken;
  completed: { objectKey: string; caption?: string; width?: number; height?: number }[];
}

// UI State Types
export interface UploadFile {
  id: string;
  file: File;
  preview: string;
  caption: string;
  compressed?: Blob;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

export interface AppState {
  nickname: string | null;
  setNickname: (nickname: string) => void;
  clearNickname: () => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

// Utility types
export type ImageMimeType = 'image/jpeg' | 'image/png' | 'image/webp';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface CompressionOptions {
  quality: number;
  maxWidth: number;
  maxHeight: number;
}
