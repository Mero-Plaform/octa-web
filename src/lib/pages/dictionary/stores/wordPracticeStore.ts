import { writable } from 'svelte/store';
import { type Word } from '../interfaces/Word.js';

/**
 * keeping word for "WordPracticeModal" received from wordCard on practice modal open
 */
export const wordPracticeStore = writable<Word>();
