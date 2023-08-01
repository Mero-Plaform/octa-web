<script lang="ts">
  import { getContext, onMount } from "svelte";
  import SveltyPicker from "svelty-picker";
  import removeIconUrl from "../../../../../../../assets/icons/clear.svg";
  import {
    getIconMaskStyes,
    sortTimeFrames,
    type WEEK_DAYS_SHORTS_TYPE,
  } from "../../../../../../utils/helpers.js";
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
  let hideOverlapErr = true;
  let errMsg: string;
  let timeFramesOverlapIndex: number | null = null;
  let timeFrames = $settingsStore.daySettings[settingKey]!.timeFrames;
  let timeFramesChips: HTMLSpanElement[] = [];
  let from = "00:00";
  let to = "00:00";

  const onAddTimeFrame = () => {
    if (!checkTimeFrameValid({ from, to })) {
      errMsg = errVariants.invalid;
      hideOverlapErr = false;
      return;
    }

    const overlappedTimeFrameIndex = checkTimeFramesOverlap({
      from,
      to,
      timeFrames,
    });

    if (overlappedTimeFrameIndex !== -1) {
      errMsg = errVariants.overlap;
      hideOverlapErr = false;
      timeFramesOverlapIndex = overlappedTimeFrameIndex;
      return;
    }

    onNewTimeFrame();
  };

  const onNewTimeFrame = () => {
    hideOverlapErr = true;
    timeFramesOverlapIndex = null;
    timeFrames.push({ from, to });
    sortTimeFrames(timeFrames);
    timeFrames = timeFrames;
    from = "00:00";
    to = "00:00";
    settingsStore.updateTimeFrames(settingKey, timeFrames);
  };

  const onRemoveTimeFrame = (fromToRemove: string) => {
    timeFrames = timeFrames.filter(({ from }) => from !== fromToRemove);
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

<div class="my-2">
  <div>
    <button
      on:click={onAddTimeFrame}
      class="btn bg-{mainColor}-500 text-white rounded-md focus:brightness-110"
    >
      Add time frame
    </button>
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
    <div
      class="w-max mt-2 px-2 mx-auto bg-red-500 text-white rounded-md"
      hidden={hideOverlapErr}
    >
      {errMsg}
    </div>
  </div>
  {#if timeFrames.length > 0}
    <div
      class="mt-2 flex p-2 flex-wrap justify-center gap-2 rounded-md border-dashed border-2 border-{mainColor}-500"
    >
      {#each timeFrames as timeFrame, timeFrameIndex}
        <span
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
      {/each}
    </div>
  {/if}
</div>
