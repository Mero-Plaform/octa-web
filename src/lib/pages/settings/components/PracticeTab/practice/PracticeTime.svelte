<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { scale } from "svelte/transition";
  import SveltyPicker from "svelty-picker";
  import type { WEEK_DAYS_SHORTS_TYPE } from "../../../../../utils/helpers.js";
  import type { PracticeStoreValueKeys } from "../../../interfaces/practice.js";
  import type { PracticeStores } from "../../../interfaces/practiceStores.js";
  import TimeFrame from "./TimeFrame/TimeFrame.svelte";

  export let settingKey: PracticeStoreValueKeys;

  const MINIMAL_INTERVAL_VALUE = "00:05";
  const { settingsStore, updatedDay } = getContext<PracticeStores>("stores");
  const mainColor = getContext<string>("mainColor");
  let interval: string = MINIMAL_INTERVAL_VALUE;

  const getCurrentInterval = () => {
    interval = $settingsStore.daySettings[settingKey]!.interval;
  };

  const onUpdatedDayInPassivePracticeSettingsStoreUpdate = (
    day: WEEK_DAYS_SHORTS_TYPE
  ) => {
    if (day !== settingKey) {
      return;
    }
    getCurrentInterval();
  };

  onMount(() => {
    const unsubscribe = updatedDay.subscribe(
      onUpdatedDayInPassivePracticeSettingsStoreUpdate
    );

    getCurrentInterval();

    return () => {
      unsubscribe();
    };
  });

  const onIntervalPickerInput = ({ detail }: CustomEvent) => {
    (document.activeElement as HTMLInputElement).blur();
    interval =
      detail < MINIMAL_INTERVAL_VALUE ? MINIMAL_INTERVAL_VALUE : detail;
    settingsStore.updateSettingKeyIntervalProp(settingKey, interval);
  };
</script>

<div transition:scale>
  <div>
    <span
      class="cursor-default text-xs bg-white rounded-md p-2 text-{mainColor}-500 align-middle"
      >Interval</span
    >
    <SveltyPicker
      bind:value={interval}
      on:change={onIntervalPickerInput}
      clearBtn={false}
      format="hh:ii"
      inputClasses="align-middle p-2 w-16 text-white text-center  rounded-md bg-{mainColor}-500 cursor-pointer hover:brightness-110 focus:brightness-110"
    />
  </div>
  <TimeFrame {settingKey} />
</div>
