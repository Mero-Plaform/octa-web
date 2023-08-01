// import '@skeletonlabs/skeleton/themes/theme-seafoam.css';
// import '@skeletonlabs/skeleton/themes/theme-crimson.css';
// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { storePopup } from '@skeletonlabs/skeleton';
import '@skeletonlabs/skeleton/styles/skeleton.css';
import { getDBData } from './lib/DB/main.js';
import { initDBAppSettingsStoreListener } from './lib/DB/storesListeners/appSettingsStoreListener.js';
import { initDBPracticeSettingsStoreListener } from './lib/DB/storesListeners/practiceSettingsStoreListener.js';
import { initDBStatisticStoreListener } from './lib/DB/storesListeners/statisticStoreListener.js';
import { initDBWordStoreActionsListener } from './lib/DB/storesListeners/wordStoreActionsListener.js';
import { createWordStore } from './lib/pages/dictionary/stores/wordStore.js';
import { createSettingsStore } from './lib/pages/practice/stores/settingsStore.js';
import { createAppSettingsStore } from './lib/pages/settings/stores/appSettingsStore/appSettingsStore.js';
import { createBasicSettingsStore } from './lib/pages/settings/stores/basicSettingsStore.js';
import { createPassivePracticeSettingsStore } from './lib/pages/settings/stores/passivePractice/passivePracticeSettingsStore.js';
import { createStatisticStore } from './lib/pages/statistic/stores/statisticStore/statisticStore.js';
import { disableStandardContextMenu } from './lib/utils/helpers.js';
import "/src/styles/main";
import { createActivePracticeSettingsStore } from './lib/pages/settings/stores/activePractice/activePracticeSettingsStore.js';

storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

let app;

getDBData()
  .then(async ([dictionaryArr, practiceData, statisticArr, appSettings]) => {
    createWordStore(dictionaryArr);
    createSettingsStore(practiceData);
    createStatisticStore(statisticArr);

    createPassivePracticeSettingsStore(appSettings.practice.passive);
    createActivePracticeSettingsStore(appSettings.practice.active)
    createBasicSettingsStore(appSettings.basic);
    createAppSettingsStore(appSettings);

    initDBWordStoreActionsListener();
    initDBPracticeSettingsStoreListener();
    initDBStatisticStoreListener();
    initDBAppSettingsStoreListener();

    // dictionaryMockFill(10_000);

    disableStandardContextMenu();

    const App = (await import("./App.svelte")).default;

    app = new App({
      target: document.getElementById("app")!,
    });
  });

export default app;
