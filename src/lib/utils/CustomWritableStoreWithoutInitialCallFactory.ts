import { CustomWritableStore, type Callback } from './CustomWritableStoreFactory.js';

export class CustomWritableStoreWithoutInitialCall<T> extends CustomWritableStore<T>  {
  subscribe(callback: Callback<T>) {
    this.subscriptions.push(callback);
    return () => this.unsubscribe(callback);
  }
}


export const CustomWritableStoreWithoutInitialCallFactory = <T, I = unknown>(initialValue?: T, storeInterface?: I) => {
  const store = new CustomWritableStoreWithoutInitialCall<T>(initialValue as T);
  Object.assign(store, storeInterface);
  return store as CustomWritableStoreWithoutInitialCall<T> & I;
};
