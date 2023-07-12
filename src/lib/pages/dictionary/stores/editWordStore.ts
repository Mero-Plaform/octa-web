import { writable } from 'svelte/store';
import type { Word } from '../interfaces/Word.js';

/**
 * keeping word to be edited
 */
export const editWordStore = writable<Word | null>(null);
