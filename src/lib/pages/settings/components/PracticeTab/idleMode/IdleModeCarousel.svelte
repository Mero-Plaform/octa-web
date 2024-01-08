<script lang="ts">
  //@ts-ignore
  import Carousel from "svelte-carousel";
  import { scale } from "svelte/transition";
  import { buttonBaseClasses } from "../../../../../shared/styleClassesDeclarations.js";
  import { onIdleModeCountdownStart } from "../../../modules/idleMode/idleTimerCountdown.js";
  import {
    timerValueToSecondsAmount,
    timerValues,
  } from "../../../modules/idleMode/timerCarouselList.js";

  const lastPageIndex = timerValues.length - 1;
  let lastChosenPageIndex: number;
  let carousel: Carousel;

  const onWheel = (event: WheelEvent) => {
    if (event.deltaY < 0) {
      carousel.goToPrev();
    } else {
      carousel.goToNext();
    }
  };

  const onCarouselPageChange = (event: { detail: number }) => {
    lastChosenPageIndex = event.detail;
  };

  const onSetClick = () => {
    if (import.meta.env.VITE_BUILD_PLATFORM === "desktop") {
      import("../../../../../shared/desktopAppBuild/ipcUtils.js").then(
        ({ sendToIpcMain }) => {
          sendToIpcMain(
            "updateIdleModeTimerDataMainWin",
            timerValueToSecondsAmount(timerValues[lastChosenPageIndex]),
          );
        },
      );
    }

    onIdleModeCountdownStart(
      undefined,
      Date.now(),
      timerValueToSecondsAmount(timerValues[lastChosenPageIndex]),
    );
  };
</script>

<div transition:scale class="text-center w-36 pt-2 mx-auto" on:wheel={onWheel}>
  <Carousel
    dots={false}
    bind:this={carousel}
    duration="50"
    infinite={false}
    on:pageChange={onCarouselPageChange}
    initialPageIndex={0}
    let:showPrevPage
    let:showNextPage
  >
    <button
      slot="prev"
      on:click={showPrevPage}
      class="flex items-center justify-center px-3 pr-2 mr-2 bg-teal-400 rounded-md {lastChosenPageIndex ===
      0
        ? 'cursor-not-allowed opacity-50'
        : 'active:scale-95 hover:brightness-105'}"
    >
      <i class="block h-2 w-2 border-t-2 border-l-2 -rotate-45 text-white"></i>
    </button>
    {#each timerValues as timer}
      <div
        class="flex items-center justify-center text-lg cursor-default text-white bg-teal-400 rounded-md"
      >
        {timer}
      </div>
    {/each}
    <button
      slot="next"
      on:click={showNextPage}
      class="flex items-center justify-center px-3 pr-2 ml-2 bg-teal-400 rounded-md {lastChosenPageIndex ===
      lastPageIndex
        ? 'cursor-not-allowed opacity-50'
        : 'active:scale-95 hover:brightness-105'}"
    >
      <i
        class="block h-2 w-2 border-t-2 border-r-2 rotate-45 -translate-x-1/3 text-white"
      ></i>
    </button>
  </Carousel>

  <button
    class="{buttonBaseClasses} mt-2 bg-teal-500 hover:bg-teal-400 focus:bg-teal-400"
    on:click={onSetClick}
  >
    Set
  </button>
</div>
