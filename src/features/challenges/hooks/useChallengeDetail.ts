'use client';

import { useState, useEffect, useCallback } from 'react';
import { challengeService } from '../services/challengeService';
import type { Challenge } from '../domain/challenge';
import { HttpError } from '@/features/common/http';

interface UseChallengeDetailResult {
  challenge: Challenge | null;
  isLoading: boolean;
  error: string | null;
  isNotFound: boolean;
  refetch: () => Promise<void>;
}

export function useChallengeDetail(id: string): UseChallengeDetailResult {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [triggerCount, setTriggerCount] = useState(0);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setTriggerCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!id) {
      queueMicrotask(() => {
        if (isMounted) {
          setIsNotFound(true);
          setIsLoading(false);
        }
      });
      return () => {
        isMounted = false;
      };
    }

    queueMicrotask(() => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
        setIsNotFound(false);
      }
    });

    challengeService
      .getById(id)
      .then((response) => {
        if (!isMounted) return;
        setChallenge(response.data);
        setError(null);
        setIsNotFound(false);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        if (err instanceof HttpError && err.status === 404) {
          setIsNotFound(true);
          setError(null);
        } else if (err instanceof HttpError) {
          setError(err.message);
          setIsNotFound(false);
        } else if (err instanceof Error) {
          setError(err.message);
          setIsNotFound(false);
        } else {
          setError('Error al obtener la información del reto.');
          setIsNotFound(false);
        }
        setChallenge(null);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, triggerCount]);

  return {
    challenge,
    isLoading,
    error,
    isNotFound,
    refetch,
  };
}
