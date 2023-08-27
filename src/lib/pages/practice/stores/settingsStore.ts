import { DBUtilsFacade } from '../../../DB/DBUtilsFacade.js';
import type { CustomWritableStore } from '../../../utils/customStores/CustomWritableStore.js';
import { CustomWritableStoreFactory } from '../../../utils/customStores/CustomWritableStoreFactory.js';
import type { SettingsStore } from '../interfaces/settings.js';

const reInit = (initialValue: SettingsStore) => {
  settingsStore.set(initialValue);
};

const reInitFromDB = async () => {
  settingsStore.set((await DBUtilsFacade.getPracticeData())!);
};

export const createSettingsStore = (initialValue: SettingsStore) => {
  settingsStore = CustomWritableStoreFactory({
    ...initialValue,
  }, {
    reInit,
    reInitFromDB
  });
};

/**
 * contain practice page practice setup (e.g. target, type)
 */
export let settingsStore: CustomWritableStore<SettingsStore> & {
  reInit: typeof reInit;
  reInitFromDB: typeof reInitFromDB;
};
