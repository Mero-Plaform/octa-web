import { getIdleModeInitialValues } from "../../../../DB/initialData/idleModeInitialValues.js";
import type { IdleMode } from "../../interfaces/idleMode.js";
import { idleModeCountdownStore } from "../../stores/idleModeSettings/idleModeCountdownStore.js";
import { idleModeStore } from "../../stores/idleModeSettings/idleModeStore.js";

let idleTimerCountdownEnabled = false;
let idleTimerTickIntervalId: NodeJS.Timer;

const idleTimerTick = () => {
  idleModeCountdownStore.update((timerValue) => {
    if (timerValue === 0) {
      stopIdleTimerCountdown();
      idleModeStore.set(getIdleModeInitialValues());
      return null;
    }

    return timerValue! - 1;
  });
};

export const stopIdleTimerCountdown = () => {
  idleTimerCountdownEnabled = false;
  clearInterval(idleTimerTickIntervalId);
};

export const onIdleModeStateStoreChange = (isEnabled: IdleMode["isEnabled"], timerValue: IdleMode["timerValue"]) => {
  if (idleTimerCountdownEnabled) {
    stopIdleTimerCountdown();
  }

  if (isEnabled) {
    initIdleTimerCountdown(timerValue);
  }
};

export const initIdleTimerCountdown = (timerLeftSeconds: IdleMode["timerValue"]) => {

  // stop prev countdown interval
  idleTimerCountdownEnabled && stopIdleTimerCountdown();

  // if countdown is infinity - do nothing
  if (timerLeftSeconds === null) { return; }

  // start new countdown interval
  idleTimerCountdownEnabled = true;
  idleTimerTickIntervalId = setInterval(idleTimerTick, 1_000);
};

export const onIdleModeCountdownStart = (_: unknown, timerStart: IdleMode["timerStart"], timerValue: IdleMode["timerValue"]) => {
  idleModeStore.set({
    isEnabled: true,
    timerStart,
    timerValue
  });

  idleModeCountdownStore.set(timerValue);

  initIdleTimerCountdown(timerValue);
};
