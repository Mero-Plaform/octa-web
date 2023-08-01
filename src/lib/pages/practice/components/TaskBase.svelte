<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import StateText from "../../../shared/components/StateText.svelte";
  import type { Word } from "../../dictionary/interfaces/Word.js";
  import { wordStore } from "../../dictionary/stores/wordStore.js";
  import { practiceActionStore } from "../stores/practiceActionStore.js";
  import { updatePracticeDataStore } from "../stores/practiceProgressStore.js";
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

    if (nextTaskData.done) {
      finished = true;
      updatePracticeDataStore(totalCount, successCount);
      return;
    }

    totalCount += 1;

    ({ variants, translations, description, id } = nextTaskData.value!);
    selectedTaskResult = null;
    updatePracticeDataStore(totalCount, successCount);
  };

  const onSettings = () => {
    dispatcher("settings");
  };

  const onRestart = () => {
    isPreparingData = true;
    finished = false;
    taskDataIterator = taskDataPreparer($settingsStore);
    totalCount = 1;
    successCount = 0;
    updatePracticeDataStore(totalCount, successCount);
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
      title="Passed all dictionary's words"
      restartBtnText="restart"
      settingsBtnText="settings"
      {onRestart}
      {onSettings}
    />
  {/if}
</div>
