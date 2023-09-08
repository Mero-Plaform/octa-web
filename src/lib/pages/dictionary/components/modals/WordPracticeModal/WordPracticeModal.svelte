<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import { fly } from "svelte/transition";
  import { getConfirmModalSettings } from "../../../../../shared/components/ConfirmModal/ConfirmModalUtils.js";
  import { setNewActionForModalsBackdropActionStore } from "../../../../../shared/modalComponent/modalsBackdropHandlers/modalsBackdropActionStore.js";
  import { getLearnSuccessPassiveStyles } from "../../../../../utils/helpers.js";
  import { wordPracticeStore } from "../../../stores/wordPracticeStore.js";
  import {
    wordPracticeModalClose,
    wordPracticeModalConfirmAnswer,
  } from "./utils.js";

  const onResetClick = () => {
    modalStore.close();
    modalStore.trigger(
      getConfirmModalSettings({
        backdropColor: "pink",
        color: "pink",
        body: "All word practice data will be <i class='px-1 bg-white text-red-700 rounded-md'>deleted</i><br>",
        backdropActionName: "wordPracticeModalCloseConfirmAnswer",
        response: wordPracticeModalConfirmAnswer,
      })
    );
  };

  setNewActionForModalsBackdropActionStore("wordPracticeModalClose");
</script>

<div
  class="select-none max-w-90% flex justify-center items-center text-center cursor-default text-white relative"
>
  <div
    class="absolute flex flex-col gap-5 w-max"
    transition:fly={{ y: 100, duration: 100 }}
  >
    <div class="bg-pink-400 rounded-md p-2">Word practice data</div>
    <div class="bg-pink-400 rounded-md p-2 bg-opacity-50">
      Learning success:
      <span
        class="p-1 rounded-md {getLearnSuccessPassiveStyles(
          $wordPracticeStore?.learnSuccess
        )}">{$wordPracticeStore?.learnSuccess}%</span
      >
    </div>
    <div class="bg-pink-400 rounded-md p-2 bg-opacity-50">
      Total practice count: {$wordPracticeStore?.practiceCount}
    </div>
    <div class="bg-pink-400 rounded-md p-2 bg-opacity-50">
      Successful practice count: {$wordPracticeStore?.successfulPracticeCount}
    </div>
    <div>
      <button
        class="btn bg-pink-400 hover:bg-pink-500 focus:bg-pink-500 rounded-md self-center"
        on:click={onResetClick}
      >
        reset
      </button>
      <button
        class="btn bg-pink-400 hover:bg-pink-500 focus:bg-pink-500 rounded-md self-center"
        on:click={wordPracticeModalClose}
      >
        close
      </button>
    </div>
  </div>
</div>
