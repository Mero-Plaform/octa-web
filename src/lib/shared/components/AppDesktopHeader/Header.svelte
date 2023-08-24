<script lang="ts">
  import CrossIconURL from "../../../../assets/icons/cross-white.svg";
  import { sendToIpcMain } from "../../desktopAppBuild/ipcUtils.js";
  import { maximizeStateStore } from "./maximizeStateStore.js";
</script>

<div class="fixed top-0 left-0 h-6 w-full flex bg-emerald-500">
  <div class="dragZone grow" />
  <button
    on:click={() => sendToIpcMain("minimizeMainWindow")}
    class="btn p-1 h-6 w-10 text-white hover:bg-emerald-500 active:scale-100 [&_img]:active:scale-90"
  >
    <span class="h-0.5 w-3 bg-white translate-y-1 rounded-md" />
  </button>
  <button
    on:click={$maximizeStateStore.onClick}
    class="btn p-1 h-6 w-10 text-white hover:bg-emerald-500 active:scale-100 [&_img]:active:scale-90"
  >
    <img
      class="h-full"
      on:dragstart|preventDefault
      src={$maximizeStateStore.icon}
      alt="fullscreen icon"
    />
  </button>
  <button
    on:click={() => sendToIpcMain("closeMainWindow")}
    class="btn p-1 h-6 w-10 text-white hover:bg-red-500 active:scale-100 [&_img]:active:scale-90"
  >
    <img
      class="h-full"
      on:dragstart|preventDefault
      src={CrossIconURL}
      alt="close icon"
    />
  </button>
</div>

<style>
  .dragZone {
    -webkit-app-region: drag;
  }
</style>
