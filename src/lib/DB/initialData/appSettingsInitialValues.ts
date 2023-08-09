import { cloneObject } from '../../utils/helpers.js';

const appBasicSettingsInitialValues = {
  startWithSystem: true,
  openAppWindowAtStart: false,
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
  practice: {
    passive: appPassivePracticeSettingsInitialValues,
    active: appActivePracticeSettingsInitialValues,
  }
} as const;

export const getAppSettingsInitialValues = () => cloneObject(appSettingsInitialValues);
