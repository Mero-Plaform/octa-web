<script lang="ts">
  import { toastStore } from "@skeletonlabs/skeleton";
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { Word } from "../../dictionary/interfaces/Word.js";
  import { wordStore } from "../../dictionary/stores/wordStore.js";
  import { updatePracticeDadaStore } from "../stores/practiceDadaStore.js";
  import { sectionTaskStore } from "../stores/sectionTaskStore.js";
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
    } else {
      wordStore.onUnsuccessfulPractice(id);
    }

    settingsStore.update((settings) => ({
      ...settings,
      sectionLastWordId: id,
    }));

    if (nextTaskData.done) {
      finished = true;
      return;
    }

    ({ variants, translations, description, id } = nextTaskData.value!);
    selectedTaskResult = null;
    updatePracticeDadaStore(totalCount, successCount);
  };

  const onSettings = () => {
    dispatcher("settings");
  };

  const onRestart = () => {
    isPreparingData = true;
    finished = false;
    taskDataIterator = taskDataPreparer($settingsStore);
    totalCount = $sectionTaskStore.wordsCount;

    if (totalCount < $settingsStore.sectionSize) {
      toastStore.trigger({
        message: `It's last dictionary's section.
        No enough words`,
        background: "bg-red-200",
        classes: "cursor-default",
      });
    }

    successCount = 0;
    updatePracticeDadaStore(totalCount, successCount);
    selectedTaskResult = null;
    // resetShowPracticeTarget();
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
    <div
      transition:fade
      class="absolute text-center text-slate-300 text-4xl cursor-default tracking-[2rem] translate-x-3 animate-pulse"
    >
      Loading
    </div>
  {:else}
      {#if !finished}
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
  {/if}
</div>
