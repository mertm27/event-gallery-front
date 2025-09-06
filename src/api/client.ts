import type {
  InviteToken,
  EventInfo,
  PhotoMeta,
  ListPhotosRequest,
  ListPhotosResponse,
  BeginUploadRequest,
  BeginUploadResponse,
  CompleteUploadRequest,
} from '../types';

// Mock data storage
const mockEvents = new Map<InviteToken, EventInfo>();
const mockPhotos = new Map<InviteToken, PhotoMeta[]>();

// Initialize with some sample data
const sampleToken: InviteToken = 'wedding2025';
const sampleEvent: EventInfo = {
  token: sampleToken,
  title: 'Mert & Ajshe — 14.09.2025',
  coverUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
  createdAt: '2025-01-01T00:00:00Z',
};

const samplePhotos: PhotoMeta[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
    width: 800,
    height: 600,
    uploaderName: 'Sarah',
    caption: 'Beautiful ceremony!',
    createdAt: '2025-01-01T10:00:00Z',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop',
    width: 800,
    height: 600,
    uploaderName: 'Mike',
    caption: 'The happy couple!',
    createdAt: '2025-01-01T10:30:00Z',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    width: 800,
    height: 600,
    uploaderName: 'Emma',
    createdAt: '2025-01-01T11:00:00Z',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
    width: 800,
    height: 600,
    uploaderName: 'John',
    caption: 'Reception party!',
    createdAt: '2025-01-01T12:00:00Z',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop',
    width: 800,
    height: 1200,
    uploaderName: 'Lisa',
    caption: 'First dance',
    createdAt: '2025-01-01T12:30:00Z',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&h=800&fit=crop',
    width: 1200,
    height: 800,
    uploaderName: 'Tom',
    createdAt: '2025-01-01T13:00:00Z',
  },
];

// Initialize mock data
mockEvents.set(sampleToken, sampleEvent);
mockPhotos.set(sampleToken, samplePhotos);

// Add fallback for common variations
mockEvents.set('wedding202', sampleEvent);
mockPhotos.set('wedding202', samplePhotos);

// Helper function to simulate network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to generate random hex string
const randHex = (length: number) => {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Helper function to generate object key
const generateObjectKey = (token: InviteToken, fileName: string) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const timestamp = Date.now();
  const randomHex = randHex(16);
  const extension = fileName.split('.').pop() || 'jpg';
  return `photos/${token}/${year}/${month}/${day}/${timestamp}-${randomHex}.${extension}`;
};

export const api = {
  async getEventInfo(token: InviteToken): Promise<EventInfo> {
    await sleep(400);
    
    // Make token case-insensitive
    const normalizedToken = token.toLowerCase();
    const event = mockEvents.get(normalizedToken);
    if (!event) {
      throw new Error('Event not found');
    }
    
    return event;
  },

  async listPhotos(req: ListPhotosRequest): Promise<ListPhotosResponse> {
    await sleep(400);
    
    // Make token case-insensitive
    const normalizedToken = req.token.toLowerCase();
    const photos = mockPhotos.get(normalizedToken) || [];
    const limit = req.limit || 50;
    const cursor = req.cursor;
    
    let startIndex = 0;
    if (cursor) {
      const cursorIndex = photos.findIndex(photo => photo.id === cursor);
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }
    
    const endIndex = startIndex + limit;
    const items = photos.slice(startIndex, endIndex);
    const nextCursor = endIndex < photos.length ? items[items.length - 1]?.id : undefined;
    
    return {
      items,
      nextCursor,
    };
  },

  async beginUpload(req: BeginUploadRequest): Promise<BeginUploadResponse> {
    await sleep(400);
    
    const uploads = req.files.map(file => {
      const tempId = randHex(8);
      const objectKey = generateObjectKey(req.token, file.fileName);
      const uploadUrl = `https://mock-upload.example.com/${objectKey}`;
      
      return {
        tempId,
        uploadUrl,
        objectKey,
      };
    });
    
    return { uploads };
  },

  async completeUpload(req: CompleteUploadRequest): Promise<{ ok: true }> {
    await sleep(400);
    
    const photos = mockPhotos.get(req.token) || [];
    const newPhotos: PhotoMeta[] = req.completed.map((item, index) => {
      const id = randHex(12);
      const now = new Date().toISOString();
      
      return {
        id,
        url: `https://images.unsplash.com/photo-${1511285560929 + index}?w=800&h=600&fit=crop`,
        width: item.width || 800,
        height: item.height || 600,
        uploaderName: 'Guest', // This would come from the request in a real implementation
        caption: item.caption,
        createdAt: now,
      };
    });
    
    // Add new photos to the beginning of the array
    mockPhotos.set(req.token, [...newPhotos, ...photos]);
    
    return { ok: true };
  },
};
