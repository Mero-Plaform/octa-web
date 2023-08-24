import { writable } from 'svelte/store';
import FullscreenIconURL from "../../../../assets/icons/fullscreen-white.svg";
import UnmaximizeIconURL from "../../../../assets/icons/unmaximize-white.svg";
import { sendToIpcMain } from '../../desktopAppBuild/ipcUtils.js';

type MaximizeStateStoreValue = {
  onClick(): void;
  icon: string;
};

export type MaximizeStates = "maximize" | "unmaximize";

let maximizeStateStoreState: MaximizeStates = "maximize";

const maximizeData: Record<MaximizeStates, MaximizeStateStoreValue> = {
  maximize: {
    onClick() {
      sendToIpcMain("maximizeMainWindow");
    },
    icon: FullscreenIconURL,
  },
  unmaximize: {
    onClick() {
      sendToIpcMain("unmaximizeMainWindow");
    },
    icon: UnmaximizeIconURL,
  }
};

export const setMaximizeStateStoreValue = (state: MaximizeStates) => {
  maximizeStateStoreState = state;
  maximizeStateStore.set(maximizeData[maximizeStateStoreState]);
};

export const maximizeStateStore = writable<MaximizeStateStoreValue>(maximizeData[maximizeStateStoreState]);
