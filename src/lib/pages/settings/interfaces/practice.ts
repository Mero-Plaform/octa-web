import type { WEEK_DAYS_SHORTS_TYPE } from '../../../utils/helpers.js';
import type { TimeFrame } from '../../statistic/interfaces/TimeFrame.js';

export type PracticeData = {
  enabled: boolean;
  interval: string;
  timeFrames: TimeFrame[];
};

export type PracticeStoreValueKeys = WEEK_DAYS_SHORTS_TYPE | "general";

export type PracticeDaySettings = Partial<Record<WEEK_DAYS_SHORTS_TYPE, PracticeData | undefined>> & { general: Omit<PracticeData, "enabled">; };

export type PracticeSettings = {
  enabled: boolean;
  soundNotification: boolean;
  daySettings: PracticeDaySettings;
};
