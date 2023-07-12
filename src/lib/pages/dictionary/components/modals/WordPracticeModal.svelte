<script lang="ts">
  import { fly } from "svelte/transition";
  import { getLearnSuccessPassiveStyles } from "../../../../utils/helpers.js";
  import type { Word } from "../../interfaces/Word.js";
  import { wordPracticeStore } from "../../stores/wordPracticeStore.js";
  import { wordStore } from "../../stores/wordStore.js";

  let showPracticeData = true;
  let word: Word;

  $: word = $wordPracticeStore!;

  const onResetClick = () => {
    showPracticeData = false;
  };

  const confirmHandler = (confirmResult: boolean) => {
    if (confirmResult) {
      wordStore.resetWordPractice(word);
      wordPracticeStore.set(wordStore.getById(word.id)!);
    }

    showPracticeData = true;
  };
</script>

<div
  class="max-w-90% flex justify-center items-center text-center cursor-default text-white relative"
>
  {#if showPracticeData}
    <div class="absolute flex flex-col gap-5 w-max" transition:fly={{ y: 100, duration: 100 }}>
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
        class="btn bg-pink-400 hover:bg-pink-500 focus:bg-pink-500 rounded-md self-center outline-none"
        on:click={onResetClick}
      >
        reset
      </button>
    </div>
  {:else}
    <div class="absolute flex flex-col gap-5 w-max" transition:fly={{ y: 100, duration: 100 }}>
      <div class="bg-pink-400 rounded-md p-2">Confirm practice reset</div>
      <div>
        <button
          class="btn bg-pink-400 hover:bg-pink-500 focus:bg-pink-500 rounded-md outline-none"
          on:click={() => confirmHandler(true)}
        >
          yes
        </button>
        <button
          class="btn bg-pink-400 hover:bg-pink-500 focus:bg-pink-500 rounded-md outline-none"
          on:click={() => confirmHandler(false)}
        >
          no
        </button>
      </div>
    </div>
  {/if}
</div>
