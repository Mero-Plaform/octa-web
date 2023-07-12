import { writable } from 'svelte/store';
import type { Word } from '../interfaces/Word.js';

/**
 * keeping word to be deleted
 */
export const removeWordStore = writable<Word | null>(null);
