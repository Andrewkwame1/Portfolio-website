/**
 * Advanced Performance Optimization Utilities
 * Implements efficient data structures and algorithms for portfolio performance
 */

import type { Skill, Experience } from '../types';


/**
 * Map-based cache for O(1) lookups instead of O(n) array searches
 * Significantly improves performance when searching by ID
 */
export class EntityCache<T extends { id: string }> {
  private cache = new Map<string, T>();

  constructor(entities: readonly T[]) {
    entities.forEach(entity => {
      this.cache.set(entity.id, entity);
    });
  }

  /**
   * O(1) lookup instead of O(n)
   */
  getById(id: string): T | undefined {
    return this.cache.get(id);
  }

  /**
   * Get all entities
   */
  getAll(): T[] {
    return Array.from(this.cache.values());
  }

  /**
   * Check if entity exists
   */
  has(id: string): boolean {
    return this.cache.has(id);
  }
}

/**
 * Multi-index cache for filtering by multiple criteria efficiently
 * Useful for skill categorization and filtering
 */
export class MultiIndexCache<T extends Record<string, unknown>> {
  private indices = new Map<string, Map<string | number | boolean, T[]>>();
  private entities: readonly T[];
  private indexKeys: readonly (keyof T)[];

  constructor(
    entities: readonly T[],
    indexKeys: readonly (keyof T)[]
  ) {
    this.entities = entities;
    this.indexKeys = indexKeys;
    this.buildIndices();
  }

  private buildIndices(): void {
    this.indexKeys.forEach(key => {
      const index = new Map<string | number | boolean, T[]>();

      this.entities.forEach(entity => {
        const value = entity[key];
        if (value !== undefined && value !== null) {
          const key_str = String(value);
          const existing = index.get(key_str) || [];
          index.set(key_str, [...existing, entity]);
        }
      });

      this.indices.set(String(key), index);
    });
  }

  /**
   * Fast filtering using pre-built indices
   * O(1) for index lookup + O(m) for result array copy where m is result count
   * vs O(n) for traditional filter
   */
  filterByIndex(key: keyof T, value: string | number | boolean): T[] {
    const index = this.indices.get(String(key));
    if (!index) return [];
    return index.get(value) || [];
  }

  /**
   * Get multiple criteria matches efficiently
   */
  filterByMultiple(criteria: Partial<T>): T[] {
    return this.entities.filter(entity =>
      Object.entries(criteria).every(
        ([key, value]) => entity[key as keyof T] === value
      )
    );
  }
}

/**
 * Memoization decorator for expensive computations
 * Caches results based on arguments using a Map (O(1) lookup)
 */
export function createMemoizer<T extends (...args: unknown[]) => unknown>(
  fn: T,
  resolveKey = (...args: unknown[]) => JSON.stringify(args)
) {
  const cache = new Map<string, unknown>();

  return ((...args: unknown[]) => {
    const key = resolveKey(...args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Efficient skill aggregation using reduce instead of multiple filters
 * Single pass O(n) instead of O(n * m) where m is number of categories
 */
export function aggregateSkillsByCategory(skills: readonly Skill[]) {
  return skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

/**
 * Sort experiences by date efficiently using native sort
 * Pre-computed startDate in data structure enables fast sorting
 */
export function sortExperiencesByDate(
  experiences: readonly Experience[],
  order: 'asc' | 'desc' = 'desc'
): Experience[] {
  const sorted = [...experiences];
  return sorted.sort((a, b) => {
    const dateA = a.startDate.getTime();
    const dateB = b.startDate.getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Binary search for finding experiences at a specific date range
 * O(log n) vs O(n) for linear search
 */
export function findExperiencesByDateRange(
  experiences: readonly Experience[],
  startDate: Date,
  endDate: Date
): Experience[] {
  const sorted = sortExperiencesByDate(experiences, 'asc');

  // Binary search for start position
  let left = 0, right = sorted.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (sorted[mid].startDate < startDate) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const startIdx = left;

  // Collect experiences within range
  const result: Experience[] = [];
  for (let i = startIdx; i < sorted.length; i++) {
    const exp = sorted[i];
    if (exp.startDate > endDate) break;

    const expEnd = exp.endDate || new Date();
    if (expEnd >= startDate) {
      result.push(exp);
    }
  }

  return result;
}

/**
 * Efficient skill searching (simplified version)
 * Maps skill names to skills for O(1) lookup
 */
export class SkillSearchIndex {
  private skillsByName = new Map<string, Skill>();
  private skillsByCategory = new Map<string, Skill[]>();

  constructor(skills: readonly Skill[]) {
    skills.forEach(skill => {
      const name = skill.name.toLowerCase();
      this.skillsByName.set(name, skill);

      const category = skill.category;
      if (!this.skillsByCategory.has(category)) {
        this.skillsByCategory.set(category, []);
      }
      (this.skillsByCategory.get(category) as Skill[]).push(skill);
    });
  }

  /**
   * Fast skill lookup by name
   */
  getByName(name: string): Skill | undefined {
    return this.skillsByName.get(name.toLowerCase());
  }

  /**
   * Get skills by category
   */
  getByCategory(category: string): Skill[] {
    return this.skillsByCategory.get(category) || [];
  }

  /**
   * Search skills by prefix
   */
  searchByPrefix(prefix: string): Skill[] {
    const lower = prefix.toLowerCase();
    const results: Skill[] = [];

    for (const [name, skill] of this.skillsByName) {
      if (name.startsWith(lower)) {
        results.push(skill);
      }
    }

    return results;
  }
}

/**
 * Batch processing utility for handling large lists efficiently
 * Prevents UI blocking by processing in chunks
 */
export async function processBatch<T>(
  items: T[],
  processor: (item: T) => void,
  batchSize = 100
): Promise<void> {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    batch.forEach(processor);

    // Yield to browser for UI updates
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}

/**
 * Lazy evaluation pattern for data transformation
 * Only computes values when accessed
 */
export class LazyValue<T> {
  private computed = false;
  private value: T | undefined;
  private compute: () => T;

  constructor(compute: () => T) {
    this.compute = compute;
  }

  get(): T {
    if (!this.computed) {
      this.value = this.compute();
      this.computed = true;
    }
    return this.value as T;
  }
}

/**
 * LRU (Least Recently Used) Cache for bounded memory usage
 * Prevents memory leaks from unlimited cache growth
 */
export class LRUCache<K, V> {
  private map = new Map<K, V>();
  private order: K[] = [];
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    if (!this.map.has(key)) return undefined;

    // Move to end (most recently used)
    this.order = this.order.filter(k => k !== key);
    this.order.push(key);

    return this.map.get(key);
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) {
      // Remove old occurrence
      this.order = this.order.filter(k => k !== key);
    } else if (this.map.size >= this.maxSize) {
      // Remove least recently used (first in order)
      const lruKey = this.order.shift();
      if (lruKey) {
        this.map.delete(lruKey);
      }
    }

    this.map.set(key, value);
    this.order.push(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  clear(): void {
    this.map.clear();
    this.order = [];
  }
}

/**
 * Efficient string matching with Knuth-Morris-Pratt (KMP) algorithm
 * O(n + m) vs O(n * m) for naive string search
 */
export function buildKMPTable(pattern: string): number[] {
  const m = pattern.length;
  const table = Array(m).fill(0);
  let j = 0;

  for (let i = 1; i < m; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = table[j - 1];
    }
    if (pattern[i] === pattern[j]) {
      j++;
    }
    table[i] = j;
  }

  return table;
}

export function kmpSearch(text: string, pattern: string): number[] {
  const positions: number[] = [];
  const n = text.length;
  const m = pattern.length;

  if (m === 0 || m > n) return positions;

  const table = buildKMPTable(pattern);
  let j = 0;

  for (let i = 0; i < n; i++) {
    while (j > 0 && text[i] !== pattern[j]) {
      j = table[j - 1];
    }
    if (text[i] === pattern[j]) {
      j++;
    }
    if (j === m) {
      positions.push(i - m + 1);
      j = table[j - 1];
    }
  }

  return positions;
}

/**
 * Efficient object comparison for React memo
 * Shallow comparison is faster than deep comparison
 */
export function shallowEqual<T extends Record<string, unknown>>(
  obj1: T,
  obj2: T
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}

/**
 * Efficient deep cloning using structuredClone when available
 */
export function deepClone<T>(obj: T): T {
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(obj);
  }

  // Fallback for older environments
  return JSON.parse(JSON.stringify(obj));
}
