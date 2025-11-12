/**
 * Advanced Performance Hooks
 * Optimized React hooks for efficient rendering and data access
 */

import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import type { Skill, Experience } from '../types';
import {
  EntityCache,
  aggregateSkillsByCategory,
  sortExperiencesByDate,
  LRUCache,
} from '../utils/optimization';

/**
 * Hook for efficient cached entity lookups
 * Prevents O(n) searches on every render
 */
export function useEntityCache<T extends { id: string }>(
  entities: readonly T[]
): {
  getById: (id: string) => T | undefined;
  has: (id: string) => boolean;
} {
  const cache = useMemo(() => new EntityCache(entities), [entities]);

  return useMemo(
    () => ({
      getById: cache.getById.bind(cache),
      has: cache.has.bind(cache),
    }),
    [cache]
  );
}

/**
 * Hook for efficient skill filtering and categorization
 * Performs categorization only once and memoizes result
 */
export function useSkillCategories(skills: readonly Skill[]) {
  return useMemo(() => aggregateSkillsByCategory(skills), [skills]);
}

/**
 * Hook for efficiently sorting experiences by date
 * Memoizes sort operation to prevent unnecessary re-sorting
 */
export function useSortedExperiences(
  experiences: readonly Experience[],
  order: 'asc' | 'desc' = 'desc'
) {
  return useMemo(
    () => sortExperiencesByDate(experiences, order),
    [experiences, order]
  );
}

/**
 * Hook for LRU cache management
 * Useful for caching expensive computations with bounded memory
 */
export function useLRUCache<K, V>(
  maxSize = 100
): {
  get: (key: K) => V | undefined;
  set: (key: K, value: V) => void;
  has: (key: K) => boolean;
  clear: () => void;
} {
  const cache = useMemo(() => new LRUCache<K, V>(maxSize), [maxSize]);

  return useMemo(
    () => ({
      get: cache.get.bind(cache),
      set: cache.set.bind(cache),
      has: cache.has.bind(cache),
      clear: cache.clear.bind(cache),
    }),
    [cache]
  );
}

/**
 * Hook for debounced callbacks
 * Useful for form inputs and search operations
 */
export function useDebouncedCallback<T extends unknown[], R>(
  callback: (...args: T) => R,
  delay: number
): (...args: T) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

/**
 * Hook for throttled callbacks
 * Limits callback execution frequency (useful for scroll/resize)
 */
export function useThrottledCallback<T extends unknown[], R>(
  callback: (...args: T) => R,
  delay: number
): (...args: T) => void {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: T) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRun.current;

      if (timeSinceLastRun >= delay) {
        callback(...args);
        lastRun.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRun.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    },
    [callback, delay]
  );
}

/**
 * Hook for efficient pagination
 * Only renders a small window of items at a time
 */
export function usePagination<T>(
  items: readonly T[],
  itemsPerPage: number
): {
  currentPage: number;
  totalPages: number;
  currentItems: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
} {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  const currentItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [currentPage, items, itemsPerPage]);

  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(0, Math.min(page, totalPages - 1));
      setCurrentPage(validPage);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
  };
}

/**
 * Hook for efficient infinite scroll
 * Uses Intersection Observer for optimal performance
 */
export function useInfiniteScroll<T>(
  items: readonly T[],
  itemsPerPage: number,
  threshold = 0.1
): {
  displayItems: T[];
  setObserverTarget: (el: HTMLElement | null) => void;
} {
  const [displayCount, setDisplayCount] = useState(itemsPerPage);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) =>
            Math.min(prev + itemsPerPage, items.length)
          );
        }
      },
      { threshold }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items.length, itemsPerPage, threshold]);

  const displayItems = useMemo(
    () => items.slice(0, displayCount),
    [items, displayCount]
  );

  return {
    displayItems,
    setObserverTarget: (el) => {
      sentinelRef.current = el;
    },
  };
}

/**
 * Hook for efficient search with memoization
 * Results are cached based on search query
 */
export function useSearch<T>(
  items: readonly T[],
  searchFn: (item: T, query: string) => boolean,
  initialQuery = ''
): {
  query: string;
  results: T[];
  setQuery: (query: string) => void;
} {
  const [query, setQuery] = useState(initialQuery);
  const cache = useLRUCache<string, T[]>(50);

  const results = useMemo(() => {
    if (!query) return items as T[];

    const cached = cache.get(query);
    if (cached) return cached;

    const filtered = items.filter((item) => searchFn(item, query));
    cache.set(query, filtered);
    return filtered;
  }, [query, items, searchFn, cache]);

  return {
    query,
    results,
    setQuery,
  };
}

/**
 * Hook for managing async operations with efficient caching
 */
export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
): {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: E | null;
  retry: () => void;
} {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
    } catch (err) {
      setError(err as E);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    status,
    data,
    error,
    retry: execute,
  };
}

/**
 * Hook for batch updates
 * Reduces number of renders during multiple state updates
 */
export function useBatchedUpdates<T extends Record<string, unknown>>(
  initialState: T
): [T, (updates: Partial<T>) => void] {
  const [state, setState] = useState(initialState);
  const updateBatch = useCallback((updates: Partial<T>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  return [state, updateBatch];
}
