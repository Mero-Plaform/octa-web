import type { BasicSettings } from './basicSettings.js';
import type { IdleModeSettings } from "./idleModeSettings.js";
import type { PracticeSettings } from './practice.js';

export type AppSettings = {
  basic: BasicSettings;
  idleMode: IdleModeSettings;
  practice: {
    passive: PracticeSettings;
    active: PracticeSettings;
  };
};
