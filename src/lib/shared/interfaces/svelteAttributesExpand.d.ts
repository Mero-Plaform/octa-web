declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    "on:backdropClick"?: CompositionEventHandler<T>;
  }
}
