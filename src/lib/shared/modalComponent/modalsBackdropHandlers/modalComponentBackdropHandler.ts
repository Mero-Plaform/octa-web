import { actionDefaultParams, modalsBackdropActionStore, resetModalsBackdropActionStore } from './modalsBackdropActionStore.js';
import { modalsBackdropHandlers } from './modalsBackdropHandlers.js';

export const modalComponentBackdropHandler = () => {
  if (!modalsBackdropActionStore) {
    return;
  }

  // @ts-ignore
  modalsBackdropHandlers[modalsBackdropActionStore](...actionDefaultParams);
  resetModalsBackdropActionStore();
};
