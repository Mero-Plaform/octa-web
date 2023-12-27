import { cloneObject } from '../../utils/helpers.js';

const appBasicSettingsInitialValues = {
  startWithSystem: true,
  openAppWindowAtStart: true,
} as const;

const IdleModeSettingsInitialValues = {
  isEnabled: false,
  timerStart: 0,
  timerValue: Infinity,
} as const;

const appPassivePracticeSettingsInitialValues = {
  enabled: false,
  soundNotification: true,
  daySettings: {
    general: {
      interval: "02:00",
      timeFrames: []
    }
  },
};

const appActivePracticeSettingsInitialValues = {
  enabled: false,
  soundNotification: true,
  daySettings: {
    general: {
      interval: "02:00",
      timeFrames: []
    }
  },
};

const appSettingsInitialValues = {
  basic: appBasicSettingsInitialValues,
  IdleModeSettings: IdleModeSettingsInitialValues,
  practice: {
    passive: appPassivePracticeSettingsInitialValues,
    active: appActivePracticeSettingsInitialValues,
  }
} as const;

export const getAppSettingsInitialValues = () => cloneObject(appSettingsInitialValues);
