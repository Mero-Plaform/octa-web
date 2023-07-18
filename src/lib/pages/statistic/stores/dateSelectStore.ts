import { writable } from 'svelte/store';
import { type Year } from '../interfaces/StatisticStore.js';

export type DateSelectStoreValue = Year | "all";

export const dateSelectStore = writable<DateSelectStoreValue>(String((new Date).getFullYear()));
