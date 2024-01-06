<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { stopIdleTimerCountdown } from "../../../modules/idleMode/idleTimerCountdown.js";
  import { idleModeCountdownStore } from "../../../stores/idleModeSettings/idleModeCountdownStore.js";
  import { idleModeStore } from "../../../stores/idleModeSettings/idleModeStore.js";

  const onChange = () => {

    // if turning idle mode off, otherwise will get data from ipcMain
    if ($idleModeStore.isEnabled) {
      idleModeCountdownStore.set(null);
      stopIdleTimerCountdown();
    }

    if (import.meta.env.VITE_BUILD_PLATFORM === "desktop") {
      import("../../../../../shared/desktopAppBuild/ipcUtils.js").then(
        ({ sendToIpcMain }) => {
          sendToIpcMain("updateIdleModeStateMainWin", $idleModeStore.isEnabled);
        },
      );
    }
  };
</script>

<div class="flex gap-2 pt-2 flex-wrap justify-center items-center">
  <span
    class:opacity-50={$idleModeStore.isEnabled}
    class="cursor-default text-xs bg-white rounded-md p-2 text-teal-500"
  >
    off
  </span>
  <SlideToggle
    name="passivePractice"
    class="bg-gray-400  hover:!brightness-110 focus:brightness-110"
    active="bg-teal-500"
    bind:checked={$idleModeStore.isEnabled}
    on:change={onChange}
  />
  <span
    class:opacity-50={!$idleModeStore.isEnabled}
    class="cursor-default text-xs bg-white rounded-md p-2 text-teal-500"
  >
    On
  </span>
</div>
