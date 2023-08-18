<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";
  import SveltyPicker from "svelty-picker";
  import removeIconUrl from "../../../../../../../assets/icons/clear.svg";
  import SlateText from "../../../../../../shared/components/StateText.svelte";
  import {
    getIconMaskStyes,
    sortTimeFrames,
    type WEEK_DAYS_SHORTS_TYPE,
  } from "../../../../../../utils/helpers.js";
  import type { TimeFrame } from "../../../../../statistic/interfaces/TimeFrame.js";
  import type { PracticeStoreValueKeys } from "../../../../interfaces/practice.js";
  import type { PracticeStores } from "../../../../interfaces/practiceStores.js";
  import {
    checkTimeFrameValid,
    checkTimeFramesOverlap,
    errVariants,
  } from "./TimeFrameUtils.js";

  export let settingKey: PracticeStoreValueKeys;

  const { settingsStore, updatedDay } = getContext<PracticeStores>("stores");
  const mainColor = getContext<string>("mainColor");
  let hideTimeFrameErr = true;
  let errMsg: string;
  let timeFramesOverlapIndex: number | null = null;
  let timeFramesOverlapData: TimeFrame | null = null;
  let timeFrames = $settingsStore.daySettings[settingKey]!.timeFrames;
  let timeFramesChips: HTMLSpanElement[] = [];
  let from = "00:00";
  let to = "00:00";

  const onAddTimeFrame = () => {
    if (!checkTimeFrameValid({ from, to })) {
      if (timeFramesOverlapIndex !== null) {
        hideAndResetError();
      }
      errMsg = errVariants.invalid;
      hideTimeFrameErr = false;
      return;
    }

    const overlappedTimeFrameIndex = checkTimeFramesOverlap({
      from,
      to,
      timeFrames,
    });

    if (overlappedTimeFrameIndex !== -1) {
      errMsg = errVariants.overlap;
      hideTimeFrameErr = false;
      timeFramesOverlapIndex = overlappedTimeFrameIndex;
      timeFramesOverlapData = { ...timeFrames[overlappedTimeFrameIndex] };
      return;
    }

    onNewTimeFrame();
  };

  const hideAndResetError = () => {
    hideTimeFrameErr = true;
    timeFramesOverlapIndex = null;
    timeFramesOverlapData = null;
  };

  const onNewTimeFrame = () => {
    hideAndResetError();
    timeFrames.push({ from, to });
    sortTimeFrames(timeFrames);
    timeFrames = timeFrames;
    from = "00:00";
    to = "00:00";
    settingsStore.updateTimeFrames(settingKey, timeFrames);
  };

  const deleteTimeFrame = (fromToRemove: string) => {
    let removedTimeFrameIndex: number;
    timeFrames = timeFrames.filter(({ from }, i) => {
      if (from === fromToRemove) {
        removedTimeFrameIndex = i;
        return false;
      } 
      return true;
    });
    settingsStore.updateTimeFrames(settingKey, timeFrames);
    return removedTimeFrameIndex!;
  };

  const checkToRemoveOverlapErrorAfterRemovingTimeFrame = (removedTimeFrameIndex: number) => {
    if (
      timeFramesOverlapIndex !== null &&
      timeFramesOverlapIndex === removedTimeFrameIndex!
    ) {
      hideAndResetError();
    }
  };

  const onRemoveTimeFrame = (fromToRemove: string) => {
    const removedTimeFrameIndex = deleteTimeFrame(fromToRemove);

    if (timeFrames.length === 0) {
      hideAndResetError();
      return;
    }

    checkToRemoveOverlapErrorAfterRemovingTimeFrame(removedTimeFrameIndex);
  };

  const onUpdatedDayInPassivePracticeSettingsStoreUpdate = (
    day: WEEK_DAYS_SHORTS_TYPE
  ) => {
    if (day !== settingKey) {
      return;
    }
    timeFrames = $settingsStore.daySettings[settingKey]!.timeFrames;
  };

  onMount(() => {
    const unsubscribe = updatedDay.subscribe(
      onUpdatedDayInPassivePracticeSettingsStoreUpdate
    );

    return () => {
      unsubscribe();
    };
  });
</script>

<div class="mt-2">
  <div>
    <button
      on:click={onAddTimeFrame}
      class="btn bg-{mainColor}-500 text-white rounded-md focus:brightness-110"
    >
      Add time frame
    </button>
    <div class="inline-flex items-center gap-1 m-sm:mt-2">
      <SveltyPicker
        bind:value={from}
        clearBtn={false}
        format="hh:ii"
        inputClasses="p-2 w-16 text-white text-center  rounded-md bg-{mainColor}-500 cursor-pointer hover:brightness-110 focus:brightness-110"
      />
      -
      <SveltyPicker
        bind:value={to}
        clearBtn={false}
        format="hh:ii"
        inputClasses="p-2 w-16 text-white text-center  rounded-md bg-{mainColor}-500 cursor-pointer hover:brightness-110 focus:brightness-110"
      />
    </div>
    {#if !hideTimeFrameErr}
    <div
      transition:scale
      class="w-max mt-2 px-2 py-1 mx-auto bg-red-500 text-white rounded-md"
    >
      {errMsg}
    </div>
    {/if}
  </div>
  <div
    class="flex p-2 pb-0 flex-wrap justify-center gap-2 rounded-md border-dashed border-2 border-{mainColor}-500"
  >
    {#each timeFrames as timeFrame, timeFrameIndex (timeFrame.from)}
      <span
        animate:flip={{ duration: 300 }}
        bind:this={timeFramesChips[timeFrameIndex]}
        class:animate-pulse={timeFrameIndex === timeFramesOverlapIndex}
        class="chip bg-{mainColor}-500 text-white select-none cursor-default !filter-none"
      >
        <span>{timeFrame.from} - {timeFrame.to}</span>
        <button
          class="group h-5 w-5 rounded-md border-2 border-white hover:bg-white transition-all"
          on:click={() => onRemoveTimeFrame(timeFrame.from)}
        >
          <span
            class="h-full w-full inline-block bg-white rounded-md group-hover:bg-{mainColor}-500"
            style={getIconMaskStyes(removeIconUrl)}
          />
        </button>
      </span>
    {:else}
      <div
        transition:scale
        class="chip text-xs text-white bg-yellow-500 hover:filter-none cursor-default m-sm:px-2"
      >
        No time frames
        <span class="bg-white text-yellow-600 p-2 rounded-md ml-2"
          >will be used from general</span
        >
      </div>
    {/each}
  </div>
</div>
