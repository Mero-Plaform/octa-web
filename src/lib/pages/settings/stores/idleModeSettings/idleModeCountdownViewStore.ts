import { derived } from "svelte/store";
import { secondsToHHMMSS } from "../../../../utils/helpers.js";
import { idleModeCountdownStore } from "./idleModeCountdownStore.js";

/**
 * transform idleModeStore.timerValue to string format: `hh:mm:ss`
 */
export const idleModeCountdownViewStore = derived(idleModeCountdownStore, (timerValue) =>
  timerValue === null ? "∞" : secondsToHHMMSS(timerValue));
