import { useEffect, useCallback, useRef, useState } from 'react';
import type { SectionId, NavigationItem } from '../types';
import { NavigationService } from '../utils/navigationOptimizer';
import { SCROLL_OFFSET } from '../utils/constants';

/**
 * Custom hook for optimized navigation with O(log n) active section detection
 * 
 * Improvements over previous implementation:
 * 1. Binary search for active section (O(log n) vs O(n))
 * 2. Memoized position cache to avoid repeated DOM queries
 * 3. RequestAnimationFrame for smooth scrolling
 * 4. Automatic cache invalidation on window resize
 * 5. Proper cleanup of event listeners
 */
export const useOptimizedNavigation = (navigationItems: readonly NavigationItem[]) => {
  const serviceRef = useRef<NavigationService | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const rafIdRef = useRef<number | null>(null);
  const prevActiveRef = useRef<SectionId | null>(null);

  // Initialize navigation service
  useEffect(() => {
    serviceRef.current = new NavigationService(navigationItems);
    serviceRef.current.initializeCache();

    return () => {
      if (serviceRef.current) {
        serviceRef.current.cancelScroll();
      }
    };
  }, [navigationItems]);

  // Handle scroll with RAF for better performance
  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        if (serviceRef.current) {
          const section = serviceRef.current.getActiveSection(
            window.scrollY,
            SCROLL_OFFSET
          );

          if (section && prevActiveRef.current !== section) {
            prevActiveRef.current = section;
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Handle window resize to invalidate cache
  useEffect(() => {
    const handleResize = () => {
      if (serviceRef.current) {
        serviceRef.current.invalidateCache();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Optimized scroll to section
  const scrollToSection = useCallback((sectionId: SectionId) => {
    if (serviceRef.current) {
      serviceRef.current.scrollToSection(sectionId, SCROLL_OFFSET);
    }
  }, []);

  // Get section by ID
  const getSection = useCallback((id: SectionId) => {
    if (serviceRef.current) {
      return serviceRef.current.getSection(id);
    }
    return undefined;
  }, []);

  return {
    activeSection,
    scrollToSection,
    getSection,
  };
};
