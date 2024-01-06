import { get, writable } from "svelte/store";
import type { IdleMode } from "../../interfaces/idleMode.js";
import { idleModeStore } from "./idleModeStore.js";

/**
 * keeps idle mode timer countdown current value
 */
export const idleModeCountdownStore = writable<IdleMode["timerValue"]>(null);

export const saveIdleModeCountdownStore = () => {
  idleModeStore.update((idleModeData) => {
    idleModeData.timerValue = get(idleModeCountdownStore);
    // updated `idleModeStore` data will be saved to the DB by the `idleModeStore` listener
    return idleModeData;
  });
};

export const initIdleModeCountdownStoreSaveOnWindowClose = () => {
  window.addEventListener("beforeunload", saveIdleModeCountdownStore);
};
