import { writable } from 'svelte/store';

type PracticeViewStateStoreType = "config" | "task" | "loading";

export const practiceViewStateStore = writable<PracticeViewStateStoreType>("config")
