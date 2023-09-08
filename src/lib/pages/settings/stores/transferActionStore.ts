import { writable } from 'svelte/store';

/**
 * broadcast answer from transfer confirmation modal
 */
export const transferActionStore = writable<boolean | null>(null);

/**
 * set store value & then reset it by setting 'null'
 */
export const transferActionStoreSet = (action: boolean) => {
  transferActionStore.set(action);

  // reset store
  transferActionStore.set(null);
};
