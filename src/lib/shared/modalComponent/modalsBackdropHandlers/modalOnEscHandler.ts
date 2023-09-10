import { actionDefaultParams, modalsBackdropActionStore, resetModalsBackdropActionStore } from './modalsBackdropActionStore.js';
import { modalsBackdropHandlers } from './modalsBackdropHandlers.js';

export const initModalOnEscHandler = () => {
  window.addEventListener("keydown", modalOnEscHandler);
};

const modalOnEscHandler = ({ code }: KeyboardEvent) => {
  if (!modalsBackdropActionStore || code !== "Escape") {
    return;
  }

  // wait till prev modal close
  setTimeout(() => {
    // @ts-ignore
    modalsBackdropHandlers[modalsBackdropActionStore](...actionDefaultParams);
    resetModalsBackdropActionStore();
  }, 180);
};
