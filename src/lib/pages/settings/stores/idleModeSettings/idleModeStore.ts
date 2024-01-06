import { DBUtilsFacade } from "../../../../DB/DBUtilsFacade.js";
import { initDBIdleModeStoreListener } from "../../../../DB/storesListeners/idleModeStoreListener.js";
import type { CustomWritableStore } from "../../../../utils/customStores/CustomWritableStore.js";
import { CustomWritableStoreFactory } from "../../../../utils/customStores/CustomWritableStoreFactory.js";
import type { IdleMode } from "../../interfaces/idleMode.js";
import { initIdleTimerCountdown, onIdleModeStateStoreChange } from "../../modules/idleMode/idleTimerCountdown.js";
import { idleModeCountdownStore } from "./idleModeCountdownStore.js";

export let idleModeStore: CustomWritableStore<IdleMode> & {
  reInit: typeof reInit;
  reInitFromDB: typeof reInitFromDB;
};

const reInit = (initialValue: IdleMode) => {
  idleModeStore.set(initialValue);
};

const reInitFromDB = async () => {
  const idleModeDBData = (await DBUtilsFacade.getIdleModeData())!;
  idleModeStore.set(idleModeDBData);
  return idleModeDBData;
};

const buildIdleModeStore = (initialValue: IdleMode) => {
  idleModeStore = CustomWritableStoreFactory(initialValue, {
    reInit,
    reInitFromDB
  });

  idleModeCountdownStore.set(initialValue.timerValue);
  initDBIdleModeStoreListener();
};

/**
 * creates `idleModeStore` if idleMode is disabled, otherwise send msg on `getIdleModeMainWin` channel to ipcMain
 * and store will be created in `onIdleModeInitialData` function on the answer arrives from ipcMain 
 */
export const createIdleModeStore = (initialValue: IdleMode) => {
  if (initialValue.isEnabled) {
    if (import.meta.env.VITE_BUILD_PLATFORM === "desktop") {
      import("../../../../shared/desktopAppBuild/ipcUtils.js").then(
        ({ sendToIpcMain }) => {
          sendToIpcMain("getIdleModeMainWin");
        },
      );
      return;
    } else {
      onIdleModeInitialData(undefined, initialValue.isEnabled, initialValue.timerStart, initialValue.timerValue)
      return;
    }
  }

  buildIdleModeStore(initialValue);
};

/**
 * creates `idleModeStore` if idleMode is enabled (look in the description of `createIdleModeStore` function)
 */
export const onIdleModeInitialData = (_: unknown, isEnabled: IdleMode["isEnabled"], timerStart: IdleMode["timerStart"], timerValue: IdleMode["timerValue"]) => {
  buildIdleModeStore({
    isEnabled,
    timerStart,
    timerValue,
  });

  if (isEnabled) {
    initIdleTimerCountdown(timerValue);
  }
};

/**
 * idle mode data has been changed in another window
 */
export const onUpdateIdleModeSignal = (_: unknown, isEnabled: IdleMode["isEnabled"], timerStart: IdleMode["timerStart"], timerValue: IdleMode["timerValue"]) => {
  idleModeStore.reInit({
    isEnabled,
    timerStart,
    timerValue,
  });

  idleModeCountdownStore.set(timerValue);

  onIdleModeStateStoreChange(isEnabled, timerValue);
};
