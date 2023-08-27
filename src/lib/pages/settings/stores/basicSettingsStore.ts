import { DBUtilsFacade } from '../../../DB/DBUtilsFacade.js';
import type { CustomWritableStore } from '../../../utils/customStores/CustomWritableStore.js';
import { CustomWritableStoreFactory } from '../../../utils/customStores/CustomWritableStoreFactory.js';
import type { BasicSettings } from '../interfaces/basicSettings.js';

export let basicSettingsStore: CustomWritableStore<BasicSettings> & {
  reInit: typeof reInit;
  reInitFromDB: typeof reInitFromDB;
};

const reInit = (initialValue: BasicSettings) => {
  basicSettingsStore.value = initialValue;
};

const reInitFromDB = async () => {
  basicSettingsStore.set((await DBUtilsFacade.getAppSettings())!.basic);
};

export const createBasicSettingsStore = (initialValue: BasicSettings) => {
  basicSettingsStore = CustomWritableStoreFactory(initialValue, {
    reInit,
    reInitFromDB
  });
};
