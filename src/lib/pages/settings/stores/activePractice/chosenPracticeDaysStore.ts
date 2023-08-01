import { writable } from 'svelte/store';
import type { WEEK_DAYS_SHORTS_TYPE } from '../../../../utils/helpers.js';

export const chosenPracticeDaysStore = writable<Array<WEEK_DAYS_SHORTS_TYPE>>([]);
