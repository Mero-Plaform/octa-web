import { writable, type Writable } from 'svelte/store';

export const CustomStoreFactory = <T, I = {}>(initialValue: T, storeInterface: I): Writable<T> & I => {
  const store = writable<T>(initialValue);

  return {
    ...store,
    ...storeInterface,
  };
};
