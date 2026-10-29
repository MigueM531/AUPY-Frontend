'use client';

import { useState, useEffect, useCallback } from 'react';
import { challengeService } from '../services/challengeService';
import type { Challenge, PaginationMeta } from '../domain/challenge';
import { HttpError } from '@/features/common/http';

interface UseChallengesResult {
  challenges: Challenge[];
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useChallenges(page = 1, limit = 10): UseChallengesResult {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [triggerCount, setTriggerCount] = useState(0);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setTriggerCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    
    queueMicrotask(() => {
      if (isMounted) setIsLoading(true);
    });

    challengeService
      .getAll(page, limit)
      .then((response) => {
        if (!isMounted) return;
        setChallenges(response.data || []);
        setPagination(response.pagination || null);
        setError(null);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        if (err instanceof HttpError) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error inesperado al cargar los retos.');
        }
        setChallenges([]);
        setPagination(null);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [page, limit, triggerCount]);

  return {
    challenges,
    pagination,
    isLoading,
    error,
    refetch,
  };
}
