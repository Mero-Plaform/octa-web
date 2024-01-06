import type { IdleMode } from "../../pages/settings/interfaces/idleMode.js";

const IdleModeInitialValues: IdleMode = {
  isEnabled: false,
  timerStart: 0,
  timerValue: null,
} as const;

export const getIdleModeInitialValues = () => ({ ...IdleModeInitialValues });
