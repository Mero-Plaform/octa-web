<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import StateText from "../../../shared/components/StateText.svelte";
  import { showWarnToast } from "../../../utils/helpers.js";
  import type { Word } from "../../dictionary/interfaces/Word.js";
  import { wordStore } from "../../dictionary/stores/wordStore.js";
  import { practiceActionStore } from "../stores/practiceActionStore.js";
  import {
    resetPracticeDataStore,
    updatePracticeDataStore,
  } from "../stores/practiceProgressStore.js";
  import { sectionTaskWordTotalAmountStore } from "../stores/sectionTaskWordTotalAmountStore.js";
  import { settingsStore } from "../stores/settingsStore.js";
  import CurrentTask from "./CurrentTask.svelte";
  import FinishTask from "./FinishTask.svelte";
  import { taskDataPreparer } from "./taskUtils.js";

  const dispatcher = createEventDispatcher();
  let taskDataIterator: Generator<Word>;
  let isPreparingData = true;
  let finished = false;

  // current word data
  let variants: Word["variants"];
  let translations: Word["translations"];
  let description: Word["description"];
  let id: Word["id"];

  let selectedTaskResult: boolean | null = null;
  let successCount = 0;
  let totalCount = 0;

  const onNext = () => {
    const nextTaskData = taskDataIterator.next();

    if (selectedTaskResult) {
      successCount += 1;
      wordStore.onSuccessfulPractice(id);
      practiceActionStore.set("successful");
    } else {
      wordStore.onUnsuccessfulPractice(id);
      practiceActionStore.set("unsuccessful");
    }

    settingsStore.update((settings) => ({
      ...settings,
      sectionLastWordId: id,
    }));

    if (nextTaskData.done) {
      finished = true;
      updatePracticeDataStore(
        totalCount,
        successCount,
        id,
        selectedTaskResult!
      );
      return;
    }

    ({ variants, translations, description, id } = nextTaskData.value!);
    updatePracticeDataStore(totalCount, successCount, id, selectedTaskResult!);
    selectedTaskResult = null;
  };

  const onSettings = () => {
    dispatcher("settings");
  };

  const onRestart = () => {
    isPreparingData = true;
    finished = false;
    taskDataIterator = taskDataPreparer($settingsStore);
    totalCount = $sectionTaskWordTotalAmountStore;

    if (totalCount < $settingsStore.sectionSize) {
      showWarnToast("It's last dictionary's section. No enough words");
    }

    successCount = 0;
    resetPracticeDataStore(totalCount);
    selectedTaskResult = null;
    ({ variants, translations, description, id } =
      taskDataIterator.next().value!);
    isPreparingData = false;
  };

  onMount(onRestart);
</script>

<div
  transition:fade
  class="flex justify-center items-center flex-col gap-5 h-full w-full text-center absolute"
>
  {#if isPreparingData}
    <div transition:fade class="absolute">
      <StateText additionalStyles="animate-pulse">Loading</StateText>
    </div>
  {:else if !finished}
    <CurrentTask
      {onNext}
      {onSettings}
      {variants}
      {translations}
      {description}
      bind:selectedTaskResult
    />
  {:else}
    <FinishTask
      title="Section complete"
      restartBtnText="next section"
      settingsBtnText="settings"
      {onRestart}
      {onSettings}
    />
  {/if}
</div>
