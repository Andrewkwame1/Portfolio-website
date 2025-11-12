/**
 * Navigation Optimizer - High-performance navigation utilities
 * Uses efficient data structures and algorithms for optimal navigation performance
 * 
 * Optimizations:
 * 1. O(1) section lookup using Map instead of array iteration
 * 2. Binary search for active section detection
 * 3. Memoized section positions with manual cache invalidation
 * 4. RequestAnimationFrame for smooth scrolling
 * 5. Set-based duplicate detection
 */

import type { SectionId, NavigationItem } from '../types';

/**
 * High-performance section registry using Map for O(1) lookups
 * Replaces array.find() pattern which is O(n)
 */
export class SectionRegistry {
  private readonly sectionMap: Map<SectionId, NavigationItem>;
  private readonly sectionIds: ReadonlyArray<SectionId>;

  constructor(navigationItems: readonly NavigationItem[]) {
    this.sectionMap = new Map(navigationItems.map(item => [item.id, item]));
    this.sectionIds = Array.from(this.sectionMap.keys());
  }

  /**
   * Get section by ID - O(1) complexity
   */
  getSectionById(id: SectionId): NavigationItem | undefined {
    return this.sectionMap.get(id);
  }

  /**
   * Check if section exists - O(1) complexity
   */
  hasSection(id: SectionId): boolean {
    return this.sectionMap.has(id);
  }

  /**
   * Get all section IDs in order
   */
  getAllSectionIds(): ReadonlyArray<SectionId> {
    return this.sectionIds;
  }

  /**
   * Validate section ID
   */
  isValidSectionId(id: string): id is SectionId {
    return this.sectionMap.has(id as SectionId);
  }
}

/**
 * Cached section position tracker
 * Stores computed offsets to avoid repeated DOM queries
 */
export class SectionPositionCache {
  private cache: Map<SectionId, { top: number; height: number }> = new Map();
  private isDirty = true;

  /**
   * Get cached position for section - O(1)
   */
  getPosition(sectionId: SectionId): { top: number; height: number } | null {
    return this.cache.get(sectionId) || null;
  }

  /**
   * Update single section position
   */
  updatePosition(sectionId: SectionId, element: HTMLElement): void {
    this.cache.set(sectionId, {
      top: element.offsetTop,
      height: element.offsetHeight
    });
  }

  /**
   * Rebuild entire cache from DOM - should be called on resize
   * O(n) where n = number of sections
   */
  rebuild(sectionIds: ReadonlyArray<SectionId>): void {
    this.cache.clear();
    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        this.updatePosition(sectionId, element);
      }
    }
    this.isDirty = false;
  }

  /**
   * Mark cache as dirty (invalidate)
   */
  invalidate(): void {
    this.isDirty = true;
  }

  /**
   * Check if cache needs rebuilding
   */
  needsRebuild(): boolean {
    return this.isDirty || this.cache.size === 0;
  }

  /**
   * Clear cache
   */
  clear(): void {
    this.cache.clear();
    this.invalidate();
  }
}

/**
 * Active section detector using binary search
 * Efficiently finds the active section based on scroll position
 * Time complexity: O(log n) instead of O(n)
 */
export class ActiveSectionDetector {
  /**
   * Detect active section using binary search
   * O(log n) complexity - much faster than linear iteration
   * 
   * @param scrollPosition Current scroll position
   * @param scrollOffset Header height offset
   * @param sectionIds Array of section IDs in order
   * @param getPosition Function to get section position
   */
  detectActiveSection(
    scrollPosition: number,
    scrollOffset: number,
    sectionIds: ReadonlyArray<SectionId>,
    getPosition: (id: SectionId) => { top: number; height: number } | null
  ): SectionId | null {
    if (sectionIds.length === 0) return null;

    const adjustedPosition = scrollPosition + scrollOffset;

    // Binary search implementation
    let left = 0;
    let right = sectionIds.length - 1;
    let result: SectionId | null = null;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const sectionId = sectionIds[mid];
      const position = getPosition(sectionId);

      if (!position) {
        // If position not found, skip
        left = mid + 1;
        continue;
      }

      const { top, height } = position;

      if (adjustedPosition >= top && adjustedPosition < top + height) {
        // Found exact match
        return sectionId;
      }

      if (adjustedPosition < top) {
        right = mid - 1;
      } else {
        result = sectionId;
        left = mid + 1;
      }
    }

    return result;
  }

  /**
   * Detect active section using linear scan
   * Use this as fallback or when caching is not available
   * O(n) complexity
   */
  detectActiveSectionLinear(
    scrollPosition: number,
    scrollOffset: number,
    sectionIds: ReadonlyArray<SectionId>,
    getPosition: (id: SectionId) => { top: number; height: number } | null
  ): SectionId | null {
    const adjustedPosition = scrollPosition + scrollOffset;

    for (const sectionId of sectionIds) {
      const position = getPosition(sectionId);
      if (position) {
        const { top, height } = position;
        if (adjustedPosition >= top && adjustedPosition < top + height) {
          return sectionId;
        }
      }
    }

    return null;
  }
}

/**
 * Smooth scroll manager with RAF optimization
 * Uses RequestAnimationFrame for performance
 */
export class SmoothScrollManager {
  private currentScroll = 0;
  private targetScroll = 0;
  private animationFrameId: number | null = null;
  private readonly easing = this.easeInOutCubic;

  /**
   * Cubic easing function for smooth animation
   */
  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /**
   * Perform smooth scroll to position
   */
  scrollToPosition(targetPosition: number, duration: number = 800): void {
    this.targetScroll = targetPosition;
    this.currentScroll = window.scrollY;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = this.easing(progress);
      const newScroll = this.currentScroll + (this.targetScroll - this.currentScroll) * easedProgress;

      window.scrollTo(0, newScroll);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.animationFrameId = null;
      }
    };

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(animate);
  }

  /**
   * Cancel ongoing scroll animation
   */
  cancelScroll(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

/**
 * Navigation validation utility
 * Ensures navigation data integrity
 */
export class NavigationValidator {
  /**
   * Validate navigation items
   * Checks for:
   * - Duplicate IDs (using Set for O(1) lookups)
   * - Valid section IDs
   * - Non-empty labels
   */
  static validateNavigationItems(items: readonly NavigationItem[]): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const seenIds = new Set<SectionId>();

    for (const item of items) {
      // Check for duplicates - O(1)
      if (seenIds.has(item.id)) {
        errors.push(`Duplicate navigation item ID: ${item.id}`);
      }
      seenIds.add(item.id);

      // Check for empty label
      if (!item.label || item.label.trim().length === 0) {
        errors.push(`Navigation item ${item.id} has empty label`);
      }

      // Check for valid section ID
      if (!this.isValidSectionId(item.id)) {
        errors.push(`Navigation item has invalid section ID: ${item.id}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if string is valid SectionId
   */
  private static isValidSectionId(id: string): boolean {
    const validIds = ['hero', 'about', 'experience', 'projects', 'education', 'skills', 'contact'];
    return validIds.includes(id);
  }
}

/**
 * Composite navigation service combining all optimizations
 */
export class NavigationService {
  private registry: SectionRegistry;
  private positionCache: SectionPositionCache;
  private detector: ActiveSectionDetector;
  private scrollManager: SmoothScrollManager;

  constructor(navigationItems: readonly NavigationItem[]) {
    // Validate items before processing
    const validation = NavigationValidator.validateNavigationItems(navigationItems);
    if (!validation.valid) {
      console.warn('Navigation validation errors:', validation.errors);
    }

    this.registry = new SectionRegistry(navigationItems);
    this.positionCache = new SectionPositionCache();
    this.detector = new ActiveSectionDetector();
    this.scrollManager = new SmoothScrollManager();
  }

  /**
   * Initialize cache with all section positions
   */
  initializeCache(): void {
    this.positionCache.rebuild(this.registry.getAllSectionIds());
  }

  /**
   * Get active section - uses binary search for O(log n) performance
   */
  getActiveSection(scrollPosition: number, scrollOffset: number): SectionId | null {
    if (this.positionCache.needsRebuild()) {
      this.initializeCache();
    }

    return this.detector.detectActiveSection(
      scrollPosition,
      scrollOffset,
      this.registry.getAllSectionIds(),
      (id) => this.positionCache.getPosition(id)
    );
  }

  /**
   * Scroll to section with smooth animation
   */
  scrollToSection(sectionId: SectionId, scrollOffset: number): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - scrollOffset;
      this.scrollManager.scrollToPosition(offsetTop);
    }
  }

  /**
   * Get section by ID - O(1)
   */
  getSection(id: SectionId): NavigationItem | undefined {
    return this.registry.getSectionById(id);
  }

  /**
   * Get all sections in order
   */
  getAllSections(): ReadonlyArray<SectionId> {
    return this.registry.getAllSectionIds();
  }

  /**
   * Invalidate cache on window resize
   */
  invalidateCache(): void {
    this.positionCache.invalidate();
  }

  /**
   * Cancel smooth scroll
   */
  cancelScroll(): void {
    this.scrollManager.cancelScroll();
  }
}
