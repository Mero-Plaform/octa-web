<script lang="ts">
  import { Tab, TabGroup } from "@skeletonlabs/skeleton";
  import { fade } from "svelte/transition";
  import { activePracticeSettingsStore } from "../../stores/activePractice/activePracticeSettingsStore.js";
  import { chosenPracticeDaysStore as activeChosenPracticeDaysStore } from "../../stores/activePractice/chosenPracticeDaysStore.js";
  import { updatedDayInActivePracticeSettingsStore } from "../../stores/activePractice/updatedDayInActivePracticeSettingsStore.js";
  import { chosenPracticeDaysStore } from "../../stores/passivePractice/chosenPracticeDaysStore.js";
  import { passivePracticeSettingsStore } from "../../stores/passivePractice/passivePracticeSettingsStore.js";
  import { updatedDayInPassivePracticeSettingsStore } from "../../stores/passivePractice/updatedDayInPassivePracticeSettingsStore.js";
  import PracticeSettings from "./practice/PracticeSettings.svelte";

  const passivePracticeStore = {
    chosenPracticeDays: chosenPracticeDaysStore,
    settingsStore: passivePracticeSettingsStore,
    updatedDay: updatedDayInPassivePracticeSettingsStore,
  };

  const activePracticeStore = {
    chosenPracticeDays: activeChosenPracticeDaysStore,
    settingsStore: activePracticeSettingsStore,
    updatedDay: updatedDayInActivePracticeSettingsStore,
  };

  // chosen tab (PassivePracticeTab)
  let tabSet: number = 0;
</script>

<div
  class="w-full flex flex-col justify-evenly items-center text-center gap-5 absolute"
  transition:fade
>
  <TabGroup
    justify="justify-center"
    active="!bg-opacity-100 !text-white"
    hover="hover:brightness-110"
    rounded="rounded-md"
    border=""
    class="w-full mt-5 [&_.tab-list]:gap-10 text-indigo-900 [&_.tab]:"
  >
    <Tab
      bind:group={tabSet}
      name="tab1"
      value={0}
      class="select-none bg-blue-400 border-b-2 border-blue-400 bg-opacity-20 text-blue-900"
    >
      Passive
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab2"
      value={1}
      class="select-none bg-fuchsia-400 border-b-2 border-fuchsia-400 bg-opacity-20 text-fuchsia-900"
    >
      Active
    </Tab>
    <svelte:fragment slot="panel">
      {#if tabSet === 0}
        <PracticeSettings
          header="Passive"
          mainColor="blue"
          generalSettingsPopup="Passive"
          stores={passivePracticeStore}
          pickerStyles={{
            "--sdt-bg-main": "#3b82f6",
            "--sdt-color": "#3b82f6",
            "--sdt-primary": "#3b82f6",
            "--sdt-btn-header-bg-hover": "#3f67a9",
          }}
        />
      {:else if tabSet === 1}
        <PracticeSettings
          header="Active"
          mainColor="fuchsia"
          generalSettingsPopup="Active"
          stores={activePracticeStore}
          pickerStyles={{
            "--sdt-bg-main": "rgb(211, 2, 211)",
            "--sdt-color": "fuchsia",
            "--sdt-primary": "fuchsia",
            "--sdt-btn-header-bg-hover": "#a93f9e",
          }}
        />
      {/if}
    </svelte:fragment>
  </TabGroup>
</div>
