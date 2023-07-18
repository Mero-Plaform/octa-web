import { writable } from 'svelte/store';
import { type Year } from '../interfaces/StatisticStore.js';

export const dataSelectEnum = [
  "all", 
  "words", 
  "practice"
] as const;

export type DataSelectStoreValue = typeof dataSelectEnum[number];

export const dataSelectStore = writable<DataSelectStoreValue>("words");
