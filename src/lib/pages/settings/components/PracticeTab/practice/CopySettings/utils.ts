import type { WEEK_DAYS_SHORTS_TYPE } from '../../../../../../utils/helpers.js';
import type { PracticeSettingsStore } from '../../../../stores/activePractice/activePracticeSettingsStore.js';

let settingsStore: PracticeSettingsStore;
let currentDay: WEEK_DAYS_SHORTS_TYPE;
let dayToCopy: WEEK_DAYS_SHORTS_TYPE;

export const setUtilsDayToCopy = (d: WEEK_DAYS_SHORTS_TYPE) => dayToCopy = d;
export const setUtilsCurrentDay = (d: WEEK_DAYS_SHORTS_TYPE) => currentDay = d;
export const setUtilsSettingsStore = (s: PracticeSettingsStore) => settingsStore = s;

export const onDayCopySettingsCallback = (modalResult: boolean) => {
  if (modalResult) {
    settingsStore.copySettingsForDay(currentDay, dayToCopy);
  }
};
