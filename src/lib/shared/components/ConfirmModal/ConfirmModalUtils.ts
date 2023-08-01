import type { ConfirmModalSettings } from './interface.js';

type GetConfirmModalSettingsParams = {
  backdropColor: string;
  backdropClasses?: string;
  title?: string;
  body: string;
  color: string;
  okBtnText?: string;
  noBtnText?: string;
  callback: (response: boolean) => void;
};

/**
 * @param {string} backdropColor
 * @param {string} backdropClasses - optional param, efault value: "!bg-{backdropColor}-200 !bg-opacity-50 backdrop-blur-sm"
 * @param {string} title - optional param, default value: "Confirm to proceed"
 * @param {string} body - inserting as html
 * @param {string} color
 * @param {string} okBtnText
 * @param {string} noBtnText
 * @param {GetConfirmModalSettingsParams["callback"]} callback
 */
export const getConfirmModalSettings = ({
  backdropColor,
  backdropClasses = `!bg-${backdropColor}-200 !bg-opacity-50 backdrop-blur-sm`,
  title = "Confirm to proceed",
  body,
  color,
  okBtnText,
  noBtnText,
  callback,
}: GetConfirmModalSettingsParams): ConfirmModalSettings => {
  return {
    type: "component",
    component: "confirm",
    backdropClasses,
    meta: {
      title,
      body,
      color,
      okBtnText,
      noBtnText,
      callback,
    },
  };
};
