<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { getContext, onMount } from "svelte";
  import { scale } from "svelte/transition";
  import type { WEEK_DAYS_SHORTS_TYPE } from "../../../../../utils/helpers.js";
  import type { PracticeStores } from "../../../interfaces/practiceStores.js";
  import CopySettings from "./CopySettings/CopySettings.svelte";
  import PracticeTime from "./PracticeTime.svelte";

  export let settingKey: WEEK_DAYS_SHORTS_TYPE;

  const { settingsStore, updatedDay } = getContext<PracticeStores>("stores");
  const mainColor = getContext<string>("mainColor");
  let enableDaySettings = $settingsStore.daySettings[settingKey]!.enabled;

  const onUpdatedDayInPassivePracticeSettingsStoreUpdate = (
    day: WEEK_DAYS_SHORTS_TYPE
  ) => {
    if (day !== settingKey) {
      return;
    }
    enableDaySettings = $settingsStore.daySettings[settingKey]!.enabled;
  };

  onMount(() => {
    const unsubscribe = updatedDay.subscribe(
      onUpdatedDayInPassivePracticeSettingsStoreUpdate
    );

    return () => {
      unsubscribe();
    };
  });

  const onEnabledSlideChange = ({ currentTarget }: Event) => {
    enableDaySettings = (currentTarget as HTMLInputElement).checked;
    settingsStore.updateSettingKeyEnabledProp(settingKey, enableDaySettings);
  };
</script>

<div transition:scale>
  <div class="my-2">
    <span
      class="cursor-default text-xs bg-white rounded-md p-2 text-{mainColor}-500 align-middle"
      class:opacity-50={!enableDaySettings}
    >
      Custom day settings
    </span>
    <SlideToggle
      name="passivePractice"
      class="bg-gray-400  hover:!brightness-110 focus:brightness-110 align-middle"
      active="bg-{mainColor}-500"
      checked={enableDaySettings}
      on:change={onEnabledSlideChange}
    />
  </div>
  {#if enableDaySettings}
    <PracticeTime {settingKey} />
    <CopySettings currentDay={settingKey} />
  {/if}
</div>
