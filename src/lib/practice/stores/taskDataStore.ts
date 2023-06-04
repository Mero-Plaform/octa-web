import { writable } from 'svelte/store';
import type { Word } from '../../dictionary/interfaces/Word.js';

export const taskDataStore = writable<Word[]>([]);
