/**
 * INP (Interaction to Next Paint) Optimization Utilities
 * 
 * Optimizes responsiveness metrics:
 * - Input delay: <50ms (move heavy work off main thread)
 * - Processing duration: <50ms (optimize state updates)
 * - Presentation delay: <100ms (optimize paint operations)
 * 
 * Target: 200ms total INP (from current 296ms)
 */

import { useCallback, useRef, useEffect } from 'react';

/**
 * Debounced event handler to reduce input delay
 * Delays event processing to allow other critical tasks to complete first
 */
export function useDebounced<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 50
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounced = useCallback((...args: unknown[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debounced as T;
}

/**
 * Throttled event handler to reduce processing duration
 * Ensures handler doesn't run more frequently than specified interval
 */
export function useThrottled<T extends (...args: unknown[]) => void>(
  callback: T,
  interval: number = 16
): T {
  const lastCallRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttled = useCallback((...args: unknown[]) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallRef.current;

    if (timeSinceLastCall >= interval) {
      lastCallRef.current = now;
      callback(...args);
    } else {
      // Schedule callback for later if not enough time has passed
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        lastCallRef.current = Date.now();
        callback(...args);
      }, interval - timeSinceLastCall);
    }
  }, [callback, interval]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttled as T;
}

/**
 * Schedule work on idle callback to reduce presentation delay
 * Uses requestIdleCallback when available, falls back to setTimeout
 */
export function useIdleCallback(
  callback: () => void,
  options: { timeout?: number } = {}
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const scheduleWork = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          callbackRef.current();
        }, { timeout: options.timeout ?? 2000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          callbackRef.current();
        }, 0);
      }
    };

    scheduleWork();
  }, [options.timeout]);
}

/**
 * Performance-optimized click handler
 * Reduces input delay by deferring non-critical work
 */
export function useOptimizedClick<T extends HTMLElement = HTMLElement>(
  callback: (event: React.MouseEvent<T>) => void,
  deferNonCritical: boolean = true
) {
  return useCallback((event: React.MouseEvent<T>) => {
    if (deferNonCritical) {
      // Defer non-critical work
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          callback(event);
        });
      } else {
        // Fallback: schedule on next frame
        requestAnimationFrame(() => {
          callback(event);
        });
      }
    } else {
      callback(event);
    }
  }, [callback, deferNonCritical]);
}

/**
 * Monitor INP metric
 * Reports when INP exceeds threshold
 */
export function useINPMonitor(threshold: number = 200) {
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const { duration, name } = entry;
          if (duration > threshold) {
            console.warn(`[INP Warning] Slow interaction detected:`, {
              name,
              duration: `${duration.toFixed(2)}ms`,
              threshold: `${threshold}ms`
            });
          }
        }
      });

      // Use type assertion for better browser compatibility
      const observerInit = { type: 'event', durationThreshold: threshold } as PerformanceObserverInit & { durationThreshold?: number };
      observer.observe(observerInit);

      return () => observer.disconnect();
    } catch (error) {
      console.error('[INP Monitor] Error:', error);
    }
  }, [threshold]);
}

/**
 * Optimize long-running JavaScript
 * Breaks work into smaller chunks to avoid blocking main thread
 */
export async function scheduleWork(
  work: () => void,
  options: { chunkSize?: number; delay?: number } = {}
): Promise<void> {
  const { chunkSize = 5, delay = 0 } = options;

  return new Promise((resolve) => {
    let workCount = 0;

    const processChunk = () => {
      const startTime = performance.now();

      try {
        work();
        workCount++;

        const endTime = performance.now();
        const duration = endTime - startTime;

        // If we've done enough work or it took too long, yield to browser
        if (workCount >= chunkSize || duration > 50) {
          const schedulerApi = (globalThis as unknown as { scheduler?: { yield?: () => Promise<void> } }).scheduler;
          if (schedulerApi && 'yield' in schedulerApi) {
            // Use Scheduler API if available (Chrome 94+)
            schedulerApi.yield?.().then(processChunk);
          } else {
            // Fallback to MessageChannel for faster yields
            const channel = new MessageChannel();
            channel.port2.onmessage = processChunk;
            channel.port1.postMessage(null);
          }
        } else {
          // Continue immediately
          processChunk();
        }
      } catch (error) {
        console.error('[Schedule Work] Error:', error);
        resolve();
      }
    };

    if (delay > 0) {
      setTimeout(processChunk, delay);
    } else {
      processChunk();
    }
  });
}

/**
 * Defer non-critical updates
 * Keeps UI responsive during heavy updates
 */
export function useDeferredCallback(callback: () => void): () => void {
  return useCallback(() => {
    // Defer to next frame to avoid blocking interactions
    requestAnimationFrame(() => {
      callback();
    });
  }, [callback]);
}

/**
 * Event delegation helper to reduce memory and input delay
 * Groups multiple event listeners into single delegated listener
 */
export function useDelegatedEvent(
  selector: string,
  eventType: string,
  handler: (event: Event) => void,
  containerRef?: React.RefObject<HTMLElement>
) {
  useEffect(() => {
    const container = containerRef?.current ?? document;

    const delegatedHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.matches(selector)) {
        handler(event);
      }
    };

    container.addEventListener(eventType, delegatedHandler, { passive: true });

    return () => {
      container.removeEventListener(eventType, delegatedHandler);
    };
  }, [selector, eventType, handler, containerRef]);
}
