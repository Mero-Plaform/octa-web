import { writable } from 'svelte/store';

export const chartLabelsStore = writable<readonly string[]>();
