import { CustomStoreFactory } from '../utils/customStores/CustomWritableStoreFactory.js';

// methods 'open' & 'close' can use 'loadingScreenStore'
// coz they will be used only after store created('loadingScreenStore' initialized)
const open = () => {
  loadingScreenStore.set(true);
};

const close = () => {
  loadingScreenStore.set(false);
};

export const loadingScreenStore = CustomStoreFactory(false, { open, close });
