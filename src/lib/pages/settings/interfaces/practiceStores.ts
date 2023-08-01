import { chosenPracticeDaysStore } from '../stores/passivePractice/chosenPracticeDaysStore.js';
import { passivePracticeSettingsStore } from '../stores/passivePractice/passivePracticeSettingsStore.js';
import { updatedDayInPassivePracticeSettingsStore } from '../stores/passivePractice/updatedDayInPassivePracticeSettingsStore.js';

export type PracticeStores = {
  chosenPracticeDays: typeof chosenPracticeDaysStore;
  settingsStore: typeof passivePracticeSettingsStore;
  updatedDay: typeof updatedDayInPassivePracticeSettingsStore;
};
