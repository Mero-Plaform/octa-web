type Callback<T, R = unknown> = (value: T) => R;

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

  private broadcast() {
    this.subscriptions.forEach(subscriptionCallback => subscriptionCallback(this.value));
  }

  private unsubscribe(callback: Callback<T>) {
    this.subscriptions = this.subscriptions.filter(subscriptionCallback => subscriptionCallback !== callback);
  }
}

export const CustomWritableStoreFactory = <T, I>(initialValue: T, storeInterface?: I) => {
  const store = new CustomWritableStore<T>(initialValue);
  Object.assign(store, storeInterface);
  return store as CustomWritableStore<T> & I;
};
