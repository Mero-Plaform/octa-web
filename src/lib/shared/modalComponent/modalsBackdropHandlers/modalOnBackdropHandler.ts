import { actionDefaultParams, modalsBackdropActionStore, resetModalsBackdropActionStore } from './modalsBackdropActionStore.js';
import { modalsBackdropHandlers } from './modalsBackdropHandlers.js';

export const modalOnBackdropHandler = () => {
  if (!modalsBackdropActionStore) {
    return;
  }

  // @ts-ignore
  modalsBackdropHandlers[modalsBackdropActionStore](...actionDefaultParams);
  resetModalsBackdropActionStore();
};
