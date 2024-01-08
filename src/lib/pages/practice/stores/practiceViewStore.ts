import { writable } from "svelte/store";

export const practiceViewStore = writable<"task" | "settings" | "practiced words">("settings");
