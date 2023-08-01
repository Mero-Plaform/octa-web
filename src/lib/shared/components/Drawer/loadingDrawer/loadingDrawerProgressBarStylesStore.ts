import { writable } from 'svelte/store';

export type LoadingDrawerProgressBarStylesStore = {
  progressBarBgColor: string;
};

/**
 * loadingDrawerProgressBarStylesStore
 */
export const loadingDrawerProgressBarStylesStore = writable<LoadingDrawerProgressBarStylesStore>();
