<script lang="ts">
  import CrossIconURL from "../../../../assets/icons/cross-white.svg";
  import FullscreenIconURL from "../../../../assets/icons/fullscreen-white.svg";
  import { sendToIpcMain } from "../../desktopAppBuild/ipcUtils.js";
</script>

<div class="fixed top-0 left-0 h-6 w-full flex bg-emerald-500">
  <div class="dragZone grow" />
  <button
    on:click={() => sendToIpcMain("minimizeMainWindow")}
    class="btn p-1 h-6 w-10 text-white hover:bg-emerald-500 active:scale-100 [&_img]:active:scale-90"
  >
    <span class="-translate-y-1">__</span>
  </button>
  <button
    on:click={() => sendToIpcMain("maximizeMainWindow")}
    class="btn p-1 h-6 w-10 text-white hover:bg-emerald-500 active:scale-100 [&_img]:active:scale-90"
  >
    <img
      class="h-full"
      on:dragstart|preventDefault
      src={FullscreenIconURL}
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
