import type { AppSettings } from "../../pages/settings/interfaces/appSettings.js";
import type { BasicSettings } from "../../pages/settings/interfaces/basicSettings.js";
import type { PracticeSettings } from "../../pages/settings/interfaces/practice.js";

const appBasicSettingsInitialValues: BasicSettings = {
  startWithSystem: true,
  openAppWindowAtStart: true,
} as const;

const appPassivePracticeSettingsInitialValues: PracticeSettings = {
  enabled: false,
  soundNotification: true,
  daySettings: {
    general: {
      interval: "02:00",
      timeFrames: []
    }
  },
} as const;

const appActivePracticeSettingsInitialValues: PracticeSettings = {
  enabled: false,
  soundNotification: true,
  daySettings: {
    general: {
      interval: "02:00",
      timeFrames: []
    }
  },
} as const;

const appSettingsInitialValues: AppSettings = {
  basic: appBasicSettingsInitialValues,
  practice: {
    passive: appPassivePracticeSettingsInitialValues,
    active: appActivePracticeSettingsInitialValues,
  }
} as const;

export const getAppSettingsInitialValues = () => structuredClone(appSettingsInitialValues);
