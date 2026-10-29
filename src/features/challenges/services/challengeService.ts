import { httpClient } from '@/features/common/http';
import type {
  PaginatedChallengesResponse,
  ChallengeDetailResponse,
} from '../domain/challenge';

export const challengeService = {

  getAll: async (page = 1, limit = 10): Promise<PaginatedChallengesResponse> => {
    return httpClient<PaginatedChallengesResponse>(`/challenges?page=${page}&limit=${limit}`);
  },


  getById: async (id: string): Promise<ChallengeDetailResponse> => {
    return httpClient<ChallengeDetailResponse>(`/challenges/${encodeURIComponent(id)}`);
  },
};

