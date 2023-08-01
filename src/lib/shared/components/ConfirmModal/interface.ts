import type { ModalSettings } from '@skeletonlabs/skeleton';

export type ConfirmModalMeta = {
  title?: string;
  body: string;
  okBtnText?: string;
  noBtnText?: string;
  color?: string;
  callback: (result: boolean) => void;
};

export type ConfirmModalSettings = ModalSettings & {
  meta: ConfirmModalMeta;
};
