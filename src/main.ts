// import '@skeletonlabs/skeleton/themes/theme-seafoam.css';
// import '@skeletonlabs/skeleton/themes/theme-crimson.css';
// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { storePopup } from '@skeletonlabs/skeleton';
import '@skeletonlabs/skeleton/styles/skeleton.css';
import { initDB } from './lib/DB/main.js';
import "/src/styles/main";

storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

// dictionaryMockFill(1_000);

let app;

initDB()
  .then(async () => {
    const App = (await import("./App.svelte")).default;

    app = new App({
      target: document.getElementById("app")!,
    });
  });

export default app;
