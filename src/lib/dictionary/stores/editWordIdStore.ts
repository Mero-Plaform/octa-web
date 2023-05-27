import { writable } from 'svelte/store';
import type { Word } from '../interfaces/Word.js';

/**
 * keeping editable word id
 */
export const editWordIdStore = writable<Word['id']>('');
