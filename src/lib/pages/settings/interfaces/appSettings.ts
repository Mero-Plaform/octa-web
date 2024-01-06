import type { BasicSettings } from './basicSettings.js';
import type { PracticeSettings } from './practice.js';

export type AppSettings = {
  basic: BasicSettings;
  practice: {
    passive: PracticeSettings;
    active: PracticeSettings;
  };
};
