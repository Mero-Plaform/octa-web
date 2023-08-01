<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import { fly } from "svelte/transition";
  import { getConfirmModalSettings } from "../../../../shared/components/ConfirmModal/ConfirmModalUtils.js";
  import { getLearnSuccessPassiveStyles } from "../../../../utils/helpers.js";
  import type { Word } from "../../interfaces/Word.js";
  import { wordPracticeStore } from "../../stores/wordPracticeStore.js";
  import { wordStore } from "../../stores/wordStore.js";

  let showPracticeData = true;
  let word: Word;

  $: word = $wordPracticeStore!;

  // const onResetClick = () => {
  //   showPracticeData = false;
  // };

  const confirmHandler = (confirmResult: boolean) => {
    if (confirmResult) {
      wordStore.resetWordPractice(word);
      wordPracticeStore.set(wordStore.getById(word.id)!);
    }

    modalStore.trigger({
      type: "component",
      component: "wordPractice",
      backdropClasses: "!bg-pink-200 !bg-opacity-50 backdrop-blur-sm",
    });
  };

  const onResetClick = () => {
    modalStore.close();
    modalStore.trigger(
      getConfirmModalSettings({
        backdropColor: "pink",
        color: "pink",
        body: "All words practice data will be <i class='px-1 bg-white text-red-700 rounded-md'>deleted</i><br>",
        callback: confirmHandler,
      })
    );
  };
</script>

<div
  class="select-none max-w-90% flex justify-center items-center text-center cursor-default text-white relative"
>
  {#if showPracticeData}
    <div
      class="absolute flex flex-col gap-5 w-max"
      transition:fly={{ y: 100, duration: 100 }}
    >
      <div class="bg-pink-400 rounded-md p-2">Word practice data</div>
      <div class="bg-pink-400 rounded-md p-2 bg-opacity-50">
        Learning success:
        <span
          class="p-1 rounded-md {getLearnSuccessPassiveStyles(
            word.learnSuccess
          )}">{word.learnSuccess}%</span
        >
      </div>
      <div class="bg-pink-400 rounded-md p-2 bg-opacity-50">
        Total practice count: {word.practiceCount}
      </div>
      <div class="bg-pink-400 rounded-md p-2 bg-opacity-50">
        Successful practice count: {word.successfulPracticeCount}
      </div>
      <button
        class="btn bg-pink-400 hover:bg-pink-500 focus:bg-pink-500 rounded-md self-center"
        on:click={onResetClick}
      >
        reset
      </button>
    </div>
  {:else}
    <div
      class="absolute flex flex-col gap-5 w-max"
      transition:fly={{ y: 100, duration: 100 }}
    >
      <div class="bg-pink-400 rounded-md p-2">Confirm practice reset</div>
      <div>
        <button
          class="btn bg-pink-400 hover:bg-pink-500 focus:bg-pink-500 rounded-md"
          on:click={() => confirmHandler(true)}
        >
          Yes
        </button>
        <button
          class="btn bg-pink-400 hover:bg-pink-500 focus:bg-pink-500 rounded-md"
          on:click={() => confirmHandler(false)}
        >
          No
        </button>
      </div>
    </div>
  {/if}
</div>
