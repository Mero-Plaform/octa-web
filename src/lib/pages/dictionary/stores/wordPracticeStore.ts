import { writable } from 'svelte/store';
import { type Word } from '../interfaces/Word.js';

/**
 * keeping word for "WordPracticeModal"
 */
export const wordPracticeStore = writable<Word | null>(null);
