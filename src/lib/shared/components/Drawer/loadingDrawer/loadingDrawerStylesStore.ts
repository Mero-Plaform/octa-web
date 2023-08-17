import { writable } from 'svelte/store';

export type LoadingDrawerProgressBarStylesStore = {
  OctaIconColor: string;
};

export const loadingDrawerStylesStore = writable<LoadingDrawerProgressBarStylesStore>();
