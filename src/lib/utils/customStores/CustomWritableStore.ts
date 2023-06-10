export type Callback<T, R = void> = (value: T) => R;

export class CustomWritableStore<T>  {
  value: T;
  protected subscriptions: Callback<T>[] = [];

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

  get() {
    return this.value;
  }

  protected broadcast() {
    this.subscriptions.forEach(subscriptionCallback => subscriptionCallback(this.value));
  }

  protected unsubscribe(callback: Callback<T>) {
    this.subscriptions = this.subscriptions.filter(subscriptionCallback => subscriptionCallback !== callback);
  }
}
