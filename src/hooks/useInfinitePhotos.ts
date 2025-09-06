import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { queryKeys } from '../api/queryKeys';
import type { InviteToken } from '../types';

export function useInfinitePhotos(token: InviteToken) {
  return useInfiniteQuery({
    queryKey: queryKeys.allPhotos(token),
    queryFn: ({ pageParam }) =>
      api.listPhotos({
        token,
        cursor: pageParam,
        limit: 20,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined as string | undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
