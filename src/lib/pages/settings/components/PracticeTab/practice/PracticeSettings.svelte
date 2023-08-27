<script lang="ts">
  import { setContext } from "svelte";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import {
    WEEK_DAYS_SHORTS,
    deleteAllInArray,
    sortShortWeekDays,
    type WEEK_DAYS_SHORTS_TYPE,
  } from "../../../../../utils/helpers.js";
  import type { PracticeStores } from "../../../interfaces/practiceStores.js";
  import DaysChoice from "./DaysChoice.svelte";
  import DaysSettings from "./DaysSettings.svelte";
  import GeneralDaysSettings from "./GeneralDaysSettings.svelte";
  import PracticeEnabler from "./PracticeEnabler.svelte";
  import SoundAlarm from "./SoundAlarm.svelte";

  export let mainColor: string;
  export let header: string;
  export let generalSettingsPopup: string;
  export let stores: PracticeStores;
  export let pickerStyles: {
    "--sdt-bg-main": string;
    "--sdt-color": string;
    "--sdt-primary": string;
    "--sdt-btn-header-bg-hover": string;
  };

  const weekdaysStyles = `bg-${mainColor}-500`;
  const weekendsStyles = "bg-rose-500";

  setContext("stores", stores);
  setContext("mainColor", mainColor);
  setContext("generalSettingsPopup", generalSettingsPopup);
  setContext("weekdaysStyles", weekdaysStyles);
  setContext("weekendsStyles", weekendsStyles);

  const { settingsStore, chosenPracticeDays: chosenPracticeDaysStore } = stores;

  let chosenPracticeDays = Object.keys(
    $settingsStore.daySettings
  ) as Array<WEEK_DAYS_SHORTS_TYPE>;
  deleteAllInArray(chosenPracticeDays, "general");
  sortShortWeekDays(chosenPracticeDays);
  chosenPracticeDaysStore.set(chosenPracticeDays);

  const onDayClick = (day: WEEK_DAYS_SHORTS_TYPE) => {
    if (!chosenPracticeDays.includes(day)) {
      chosenPracticeDays.push(day);
      sortShortWeekDays(chosenPracticeDays);
      stores.settingsStore.addSettingKey(day);
    } else {
      deleteAllInArray(chosenPracticeDays, day);
      stores.settingsStore.removeSettingKey(day);
    }

    chosenPracticeDays = chosenPracticeDays;
    chosenPracticeDaysStore.set(chosenPracticeDays);
  };

  const onAllDaysClick = () => {
    WEEK_DAYS_SHORTS.forEach((day) => {
      if (chosenPracticeDays.includes(day)) {
        return;
      }
      chosenPracticeDays.push(day);
      stores.settingsStore.addSettingKey(day);
    });

    sortShortWeekDays(chosenPracticeDays);
    chosenPracticeDays = chosenPracticeDays;
    chosenPracticeDaysStore.set(chosenPracticeDays);
  };
</script>

<div
  transition:fade
  class="absolute max-w-md w-90% left-1/2 -translate-x-1/2 max-h-[calc(100vh-160px)] overflow-auto p-2 border-2 rounded-md bg-{mainColor}-200 bg-opacity-50 text-{mainColor}-900"
  style={`
    --sdt-bg-main: ${pickerStyles["--sdt-bg-main"]};
    --sdt-color: ${pickerStyles["--sdt-color"]};
    --sdt-primary: ${pickerStyles["--sdt-primary"]};
    --sdt-btn-header-bg-hover: ${pickerStyles["--sdt-btn-header-bg-hover"]};
  `}
>
  <div
    class="border-{mainColor}-400 border-2 rounded-md p-2 cursor-default select-none"
  >
    {header}
  </div>
  <PracticeEnabler />
  {#if $settingsStore.enabled}
    <SoundAlarm />
    <DaysChoice {chosenPracticeDays} {onDayClick} {onAllDaysClick} />
    {#if chosenPracticeDays.length > 0}
      <GeneralDaysSettings />
    {/if}
    {#each chosenPracticeDays as chosenDay (chosenDay)}
      <div animate:flip={{ duration: 300 }}>
        <DaysSettings {chosenDay} />
      </div>
    {/each}
  {/if}
</div>
