import { get } from "svelte/store";
import { onIdleModeCountdownStart } from "../../pages/settings/modules/idleMode/idleTimerCountdown.js";
import { idleModeStore, onIdleModeInitialData, onUpdateIdleModeSignal } from "../../pages/settings/stores/idleModeSettings/idleModeStore.js";
import routerStore from '../../router/routerStore.js';
import { ipcMockAnswer } from "../../utils/dev/ipcMockAnswer.js";
import { setMaximizeStateStoreValue, type MaximizeStates } from '../components/AppDesktopHeader/maximizeStateStore.js';
import { closeLoadingDrawer } from "../components/Drawer/loadingDrawer/loadingDrawerUtils.js";
import { onNewPassivePracticeComplete } from "./utils/onNewPassivePracticeComplete.js";

export const initDesktopActionListeners = () => {
  window.electron?.ipcRenderer.on("newPassivePracticeComplete", onNewPassivePracticeComplete);
  window.electron?.ipcRenderer.on("setMaximizeStateStoreValue", (_, state: MaximizeStates) => setMaximizeStateStoreValue(state));
  window.electron?.ipcRenderer.on("openPracticePage", () => routerStore.set("/practice"));
  window.electron?.ipcRenderer.on("idle mode countdown start", onIdleModeCountdownStart);
  window.electron?.ipcRenderer.on("idle mode initial data", onIdleModeInitialData);
  window.electron?.ipcRenderer.on("update idle mode", onUpdateIdleModeSignal);
  window.electron?.ipcRenderer.on("importDBDataFinished", () => {
    const idleModeData = get(idleModeStore);
    sendToIpcMain("updateIdleModeStateMainWin", idleModeData.isEnabled);
    sendToIpcMain("updateIdleModeTimerDataMainWin", idleModeData.timerValue);
    closeLoadingDrawer();
  });
};

export const sendToIpcMain = (channel: string, ...data: unknown[]) => {
  if (import.meta.env.PROD) {
    window.electron?.ipcRenderer.send(channel, ...data);
  } else {
    ipcMockAnswer(channel, ...data);
  }
};
