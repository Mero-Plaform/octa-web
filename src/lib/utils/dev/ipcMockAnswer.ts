import { DBUtilsFacade } from "../../DB/DBUtilsFacade.js";
import { onIdleModeCountdownStart } from "../../pages/settings/modules/idleMode/idleTimerCountdown.js";
import { onIdleModeInitialData } from "../../pages/settings/stores/idleModeSettings/idleModeStore.js";

export const ipcMockAnswer = (channel: string, ...data: unknown[]) => {
  console.log(`IPC sendToIpcMain on channel ${channel}`);

  switch (channel) {
    case "updateIdleModeStateMainWin": {
      console.log("(mocked answer in DEV) by channel \"idle mode countdown start\"");
      if (data[0]) {
        onIdleModeCountdownStart(undefined, Date.now(), null);
      }
      break;
    }
    case "updateIdleModeTimerDataMainWin": {
      console.log("(mocked answer in DEV) by channel \"idle mode countdown start\"");
      onIdleModeCountdownStart(undefined, Date.now(), data[0] as number);
      break;
    }
    case "getIdleModeMainWin": {
      console.log("(mocked answer in DEV) by channel \"idle mode initial data\" with current DB data");
      DBUtilsFacade.getIdleModeData().then((idleMode) => {
        onIdleModeInitialData(undefined, idleMode!.isEnabled, idleMode!.timerStart, idleMode!.timerValue);
      });
      break;
    }
    case "minimizeMainWindow":
    case "maximizeMainWindow":
    case "closeMainWindow":
    case "importAppDBData":
    case "updatePracticeData":
    case "updateIdleModeData":
    case "mainWinErr":
    case "initPracticeData":
    case "initStatisticData":
    case "initIdleModeData":
    case "initAppSettingsData":
    case "updateAppSettingsData": {
      console.log("(mocked answer in DEV) ignored");
      break;
    }
    default: console.warn(`(mocked answer in DEV) - unknown channel "${channel}"`);
  }
};
