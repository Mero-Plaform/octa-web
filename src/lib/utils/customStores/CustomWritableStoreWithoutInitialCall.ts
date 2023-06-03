import { CustomWritableStore, type Callback } from './CustomWritableStore.js';

export class CustomWritableStoreWithoutInitialCall<T> extends CustomWritableStore<T>  {
  subscribe(callback: Callback<T>) {
    this.subscriptions.push(callback);
    return () => this.unsubscribe(callback);
  }
}
