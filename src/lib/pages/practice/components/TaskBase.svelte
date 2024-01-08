<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import StateText from "../../../shared/components/StateText.svelte";
  import type { Word } from "../../dictionary/interfaces/Word.js";
  import { wordStore } from "../../dictionary/stores/wordStore.js";
  import { practiceActionStore } from "../stores/practiceActionStore.js";
  import { practiceFinishStateTextStore } from "../stores/practiceFinishStateTextStore.js";
  import {
    resetPracticeDataStore,
    updatePracticeDataStore,
  } from "../stores/practiceProgressStore.js";
  import { practiceTaskEnded } from "../stores/practiceTaskEnded.js";
  import { settingsStore } from "../stores/settingsStore.js";
  import CurrentTask from "./CurrentTask.svelte";
  import FinishTask from "./FinishTask.svelte";
  import { taskDataPreparer } from "./taskUtils.js";

  let taskDataIterator: Generator<Word>;
  let isPreparingData = !$practiceTaskEnded; // not showing loading if user is back from practiced words

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

    totalCount += 1;

    updatePracticeDataStore(totalCount, successCount, id, selectedTaskResult!);

    if (nextTaskData.done) {
      practiceFinishStateTextStore.set("Passed all dictionary's words");
      practiceTaskEnded.set(true);
      return;
    }

    ({ variants, translations, description, id } = nextTaskData.value!);
    selectedTaskResult = null;
  };

  const onRestart = () => {
    isPreparingData = true;
    taskDataIterator = taskDataPreparer($settingsStore);
    totalCount = 0;
    successCount = 0;
    resetPracticeDataStore(totalCount);
    selectedTaskResult = null;
    ({ variants, translations, description, id } =
      taskDataIterator.next().value!);
    isPreparingData = false;
  };

  const onRestartByRestartButton = () => {
    onRestart();
    practiceTaskEnded.set(false);
  };

  // not restarting component if user is back from practiced words
  !$practiceTaskEnded && onMount(onRestart);
</script>

<div
  transition:fade
  class="flex justify-center items-center flex-col gap-5 h-full w-full text-center absolute"
>
  {#if isPreparingData}
    <div transition:fade class="absolute">
      <StateText additionalStyles="animate-pulse">Loading</StateText>
    </div>
  {:else if $practiceTaskEnded}
    <FinishTask restartBtnText="restart" onRestart={onRestartByRestartButton} />
  {:else}
    <CurrentTask
      {onNext}
      {variants}
      {translations}
      {description}
      bind:selectedTaskResult
    />
  {/if}
</div>
