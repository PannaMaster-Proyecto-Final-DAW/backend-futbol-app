import { createCache } from 'cache-manager';

/**
 * CacheService
 * Wrapper for cache-manager to provide a simple interface for caching.
 * By default, it uses an in-memory store.
 */
export class CacheService {
    private cache: any;

    constructor() {
        this.init();
    }

    private async init() {
        // In v7, createCache replaces caching('memory', ...)
        this.cache = createCache({
            ttl: 60 * 1000, // Default TTL in milliseconds (1 minute)
        });
    }



    /**
     * Get a value from the cache.
     * @param key Cache key
     * @returns The cached value or undefined if not found
     */
    async get<T>(key: string): Promise<T | undefined> {
        if (!this.cache) await this.init();
        return await this.cache.get(key);
    }

    /**
     * Set a value in the cache.
     * @param key Cache key
     * @param value Value to store
     * @param ttl Time to live in milliseconds (optional)
     */
    async set(key: string, value: any, ttl?: number): Promise<void> {
        if (!this.cache) await this.init();
        await this.cache.set(key, value, ttl);
    }

    /**
     * Delete a value from the cache.
     * @param key Cache key
     */
    async del(key: string): Promise<void> {
        if (!this.cache) await this.init();
        await this.cache.del(key);
    }

    /**
     * Wraps a function with caching logic.
     * If the key exists in cache, it returns the value.
     * Otherwise, it executes the function, stores the result, and returns it.
     * @param key Cache key
     * @param fn Function to execute if cache miss
     * @param ttl Time to live in milliseconds (optional)
     */
    async wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T> {
        if (!this.cache) await this.init();
        return await this.cache.wrap(key, fn, ttl);
    }

    /**
     * Clear all cache entries.
     */
    async reset(): Promise<void> {
        if (!this.cache) this.init();
        await this.cache.clear();
    }
}

