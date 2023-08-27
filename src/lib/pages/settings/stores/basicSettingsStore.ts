import type { CustomWritableStore } from '../../../utils/customStores/CustomWritableStore.js';
import { CustomWritableStoreFactory } from '../../../utils/customStores/CustomWritableStoreFactory.js';
import type { BasicSettings } from '../interfaces/basicSettings.js';

export let basicSettingsStore: CustomWritableStore<BasicSettings> & {
  reInit: typeof reInit;
};

const reInit = (initialValue: BasicSettings) => {
  basicSettingsStore.value = initialValue;
};

export const createBasicSettingsStore = (initialValue: BasicSettings) => {
  basicSettingsStore = CustomWritableStoreFactory(initialValue, {
    reInit
  });
};
