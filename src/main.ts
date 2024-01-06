import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { storePopup } from '@skeletonlabs/skeleton';
import '@skeletonlabs/skeleton/styles/skeleton.css';
import type App from "./App.svelte";
import { getDBData, setupUtilDB } from './lib/DB/main.js';
import { initDBAppSettingsStoreListener } from './lib/DB/storesListeners/appSettingsStoreListener.js';
import { initDBPracticeSettingsStoreListener } from './lib/DB/storesListeners/practiceSettingsStoreListener.js';
import { initDBStatisticStoreListener } from './lib/DB/storesListeners/statisticStoreListener.js';
import { initDBWordStoreActionsListener } from './lib/DB/storesListeners/wordStoreActionsListener.js';
import { createWordStore } from './lib/pages/dictionary/stores/wordStore.js';
import { createSettingsStore } from './lib/pages/practice/stores/settingsStore.js';
import { createActivePracticeSettingsStore } from './lib/pages/settings/stores/activePractice/activePracticeSettingsStore.js';
import { createAppSettingsStore } from './lib/pages/settings/stores/appSettingsStore/appSettingsStore.js';
import { createBasicSettingsStore } from './lib/pages/settings/stores/basicSettingsStore.js';
import { createIdleModeStore } from "./lib/pages/settings/stores/idleModeSettings/idleModeStore.js";
import { createPassivePracticeSettingsStore } from './lib/pages/settings/stores/passivePractice/passivePracticeSettingsStore.js';
import { createStatisticStore } from './lib/pages/statistic/stores/statisticStore/statisticStore.js';
import { initModalOnEscHandler } from './lib/shared/modalComponent/modalsBackdropHandlers/modalOnEscHandler.js';
import { initModalsBackdropHandlers } from './lib/shared/modalComponent/modalsBackdropHandlers/modalsBackdropHandlers.js';
import { checkElectronApiExist, disableStandardContextMenu, enableWindowErrCatcher } from './lib/utils/helpers.js';
import "./styles/main.js";
import { initIdleModeCountdownStoreSaveOnWindowClose } from "./lib/pages/settings/stores/idleModeSettings/idleModeCountdownStore.js";

storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

let app: App;

enableWindowErrCatcher();

setupUtilDB()
  .then(getDBData)
  .then(async ([dictionaryArr, practiceData, statisticArr, appSettings, idleMode]) => {
    createWordStore(dictionaryArr);
    createSettingsStore(practiceData);
    createStatisticStore(statisticArr);

    createPassivePracticeSettingsStore(appSettings.practice.passive);
    createActivePracticeSettingsStore(appSettings.practice.active);
    createIdleModeStore(idleMode);
    createBasicSettingsStore(appSettings.basic);
    createAppSettingsStore();

    initDBWordStoreActionsListener();
    initDBPracticeSettingsStoreListener();
    initDBStatisticStoreListener();
    initDBAppSettingsStoreListener();
    // initDBIdleModeStoreListener called in idleModeStore file (should wait till answer from ipcMain if idleMode is enabled)
    // initIdleTimerCountdownStoreListener same as the prev line

    if (import.meta.env.VITE_BUILD_PLATFORM === "web") {
      initIdleModeCountdownStoreSaveOnWindowClose();
    }

    initModalsBackdropHandlers();
    initModalOnEscHandler();

    disableStandardContextMenu();

    if (import.meta.env.VITE_BUILD_PLATFORM === "desktop") {
      (await import("./lib/shared/desktopAppBuild/ipcUtils.js")).initDesktopActionListeners();
    }

    const App = (await import("./App.svelte")).default;

    app = new App({
      target: document.getElementById("app")!,
    });

    if (import.meta.env.VITE_BUILD_PLATFORM === "desktop") {
      checkElectronApiExist();
    }
  });
