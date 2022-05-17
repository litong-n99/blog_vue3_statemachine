import { readonly } from "vue";
import { cacheRef } from "../hooks/Cache";

// State----------------------------------
const [count, initCount] = cacheRef(0, 'count');

export const COUNT = readonly(count);

export const initCacheFuns: (() => Promise<void>)[] = [initCount];
// Action---------------------------------
export function addCount() {
    count.value++;
}

export function reduceCount() {
    count.value--;
}

