import { Ref, ref, UnwrapRef, watch, toRaw } from 'vue';
import localforage from 'localforage';
import debounce from 'lodash.debounce';

export type ToRef<T> = T extends Ref ? T : Ref<UnwrapRef<T>>;

type CacheRefResult<T> = [T, () => Promise<void>];

export function cacheRef<T extends Record<string, unknown>>(
  value: T,
  cacheKey: string,
  deep?: boolean
): CacheRefResult<ToRef<T>>;
export function cacheRef<T>(
  value: T,
  cacheKey: string,
  deep?: boolean
): CacheRefResult<Ref<UnwrapRef<T>>>;
export function cacheRef<T = any>(
  value: T,
  cacheKey: string,
  deep?: boolean
): CacheRefResult<Ref<T | undefined>>;

/**
 * @description Cached Ref
 * @param value - initial value 
 * @param cacheKey - key
 * @param deep - deep watching to update caching
 */
export function cacheRef(value: unknown, cacheKey: string, deep = false) {
  const result = ref(value);
  const cacheKeyStr = `CACHE/${cacheKey}`;
  let isFirstInitCache = false;

  const updateCache = debounce(function () {
    return localforage.setItem(cacheKeyStr, toRaw(result.value));
  }, 300);

  async function initCache() {
    const data = await localforage.getItem(cacheKeyStr);
    if (data) {
      result.value = data;
    }
    if (!isFirstInitCache) {
      watch(
        result,
        () => {
          updateCache();
        },
        { deep }
      );
    }
    isFirstInitCache = true;
  }

  return [result, initCache];
}