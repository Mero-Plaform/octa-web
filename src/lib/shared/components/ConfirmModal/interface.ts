import type { ModalSettings } from '@skeletonlabs/skeleton';
import type { modalsBackdropHandlers } from '../../modalComponent/modalsBackdropHandlers/modalsBackdropHandlers.js';

export type ConfirmModalMeta = {
  title?: string;
  body: string;
  okBtnText?: string;
  noBtnText?: string;
  color?: string;
  backdropActionName: keyof typeof modalsBackdropHandlers;
};

export type ConfirmModalSettings = ModalSettings & {
  meta: ConfirmModalMeta;
};
