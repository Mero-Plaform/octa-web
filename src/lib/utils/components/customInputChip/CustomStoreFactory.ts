import { writable, type Writable } from 'svelte/store';

export const CustomWritableStoreFactory = <T, I> (initialValue: T, storeInterface ?: I): Writable <T> | Writable<T> & I => {
  const store = writable<T>(initialValue);

  return {
    ...store,
    ...storeInterface,
  };
};
