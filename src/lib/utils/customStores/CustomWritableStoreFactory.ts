import { CustomWritableStore } from './CustomWritableStore.js';

export const CustomWritableStoreFactory = <T, I = unknown>(initialValue?: T, storeInterface?: I) => {
  const store = new CustomWritableStore<T>(initialValue as T);
  Object.assign(store, storeInterface);
  return store as CustomWritableStore<T> & I;
};
