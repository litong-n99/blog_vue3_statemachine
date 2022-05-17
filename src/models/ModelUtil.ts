import { initCacheFuns as counterInitFs } from './Counter';

export function initModels() {
  return Promise.all([...counterInitFs].map((fun) => fun()));
}