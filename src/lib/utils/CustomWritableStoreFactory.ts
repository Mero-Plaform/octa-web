export type Callback<T, R = void> = (value: T) => R;

export class CustomWritableStore<T>  {
  value: T;
  subscriptions: Callback<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  subscribe(callback: Callback<T>) {
    callback(this.value);
    this.subscriptions.push(callback);
    return () => this.unsubscribe(callback);
  }

  update(callback: Callback<T, T>) {
    this.set(callback(this.value));
  }

  set(newValue: T) {
    this.value = newValue;
    this.broadcast();
  }

  protected broadcast() {
    this.subscriptions.forEach(subscriptionCallback => subscriptionCallback(this.value));
  }

  protected unsubscribe(callback: Callback<T>) {
    this.subscriptions = this.subscriptions.filter(subscriptionCallback => subscriptionCallback !== callback);
  }
}

export const CustomWritableStoreFactory = <T, I = unknown>(initialValue?: T, storeInterface?: I) => {
  const store = new CustomWritableStore<T>(initialValue as T);
  Object.assign(store, storeInterface);
  return store as CustomWritableStore<T> & I;
};
