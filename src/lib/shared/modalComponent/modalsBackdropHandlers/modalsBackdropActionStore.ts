import { modalsBackdropHandlers } from './modalsBackdropHandlers.js';

type ModalsBackdropActionStoreValue = keyof typeof modalsBackdropHandlers | null;

export const setNewActionForModalsBackdropActionStore = (action: ModalsBackdropActionStoreValue, ...defaultParams: unknown[]) => {
  modalsBackdropActionStore = action;
  actionDefaultParams = defaultParams;
};

export const resetModalsBackdropActionStore = () => {
  modalsBackdropActionStore = null;
  actionDefaultParams = [];
};

export let modalsBackdropActionStore: ModalsBackdropActionStoreValue;
export let actionDefaultParams: unknown[];
