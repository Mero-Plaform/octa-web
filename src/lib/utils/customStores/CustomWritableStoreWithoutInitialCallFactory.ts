import { CustomWritableStoreWithoutInitialCall } from './CustomWritableStoreWithoutInitialCall.js';

export const CustomWritableStoreWithoutInitialCallFactory = <T, I = unknown>(initialValue?: T, storeInterface?: I) => {
  const store = new CustomWritableStoreWithoutInitialCall<T>(initialValue as T);
  Object.assign(store, storeInterface);
  return store as CustomWritableStoreWithoutInitialCall<T> & I;
};
