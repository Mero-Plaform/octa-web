import type { IdleMode } from "../../pages/settings/interfaces/idleMode.js";
import { idleModeStore } from "../../pages/settings/stores/idleModeSettings/idleModeStore.js";
import { DBUtilsFacade } from '../DBUtilsFacade.js';

const idleModeStoreListener = (idleModeData: IdleMode) => {
  DBUtilsFacade.updateIdleModeData(idleModeData);
};

export const initDBIdleModeStoreListener = () => {
  idleModeStore.subscribe(idleModeStoreListener);
};
