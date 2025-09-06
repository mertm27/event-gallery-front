import type { InviteToken } from '../types';

export const queryKeys = {
  event: (token: InviteToken) => ['event', token] as const,
  photos: (token: InviteToken, cursor?: string) => ['photos', token, cursor] as const,
  allPhotos: (token: InviteToken) => ['photos', token] as const,
} as const;
