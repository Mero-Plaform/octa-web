// import '@skeletonlabs/skeleton/themes/theme-seafoam.css';
// import '@skeletonlabs/skeleton/themes/theme-crimson.css';
// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
import '@skeletonlabs/skeleton/styles/skeleton.css';
import "/src/styles/main";
import App from "./App.svelte";
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
import { storePopup } from '@skeletonlabs/skeleton';
import { dictionaryMockFill } from './lib/mockData/dictionaryMockFill.js';
storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

dictionaryMockFill(1_000);

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
