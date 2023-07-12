// import '@skeletonlabs/skeleton/themes/theme-seafoam.css';
// import '@skeletonlabs/skeleton/themes/theme-crimson.css';
// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { storePopup } from '@skeletonlabs/skeleton';
import '@skeletonlabs/skeleton/styles/skeleton.css';
import { getDBData } from './lib/DB/main.js';
import { initDBPracticeSettingsStoreListener } from './lib/DB/practiceSettingsStoreListener.js';
import { initDBStatisticStoreListener } from './lib/DB/statisticStoreListener.js';
import { initDBWordStoreActionsListener } from './lib/DB/wordStoreActionsListener.js';
import { createWordStore } from './lib/pages/dictionary/stores/wordStore.js';
import { createSettingsStore } from './lib/pages/practice/stores/settingsStore.js';
import { createStatisticStore } from './lib/pages/statistic/stores/statisticStore/statisticStore.js';
import { initStatisticStoreListeners } from './lib/pages/statistic/stores/statisticStore/statisticStoreUtils.js';
import "/src/styles/main";

storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

let app;

getDBData()
  .then(async ([dictionaryArr, practiceData, statisticArr]) => {
    createWordStore(dictionaryArr);
    createSettingsStore(practiceData);
    createStatisticStore(statisticArr);
    initStatisticStoreListeners();

    initDBWordStoreActionsListener();
    initDBPracticeSettingsStoreListener();
    initDBStatisticStoreListener();

    // dictionaryMockFill(10_000);

    const App = (await import("./App.svelte")).default;

    app = new App({
      target: document.getElementById("app")!,
    });
  });

export default app;
