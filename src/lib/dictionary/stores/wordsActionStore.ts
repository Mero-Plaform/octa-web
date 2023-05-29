import { writable } from 'svelte/store';
import type { Word } from '../interfaces/Word.js';

type WordsActionStoreAction = 'add' | 'edit' | 'delete';

/**
 * broadcast last action in wordsStore (e.g. add, edit, delete)
 */
export const wordsActionStore = writable<[WordsActionStoreAction, Word['id']]>();
