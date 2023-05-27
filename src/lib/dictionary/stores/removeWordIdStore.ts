import { writable } from 'svelte/store';
import type { Word } from '../interfaces/Word.js';

/**
 * keeping removable word id
 */
export const removeWordIdStore = writable<Word['id']>('');
