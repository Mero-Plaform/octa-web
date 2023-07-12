import { writable } from 'svelte/store';

export const searchWordsTextStore = writable<string>('');
