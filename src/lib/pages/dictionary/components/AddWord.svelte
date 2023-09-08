<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import { onDestroy, onMount } from "svelte";
  import {
    getIconMaskStyes,
    openAddWordModal,
  } from "../../../utils/helpers.js";
  import plusImageUrl from "/src/assets/icons/plus.svg";

  const onPlusBtnPress = ({ code }: KeyboardEvent) => {
    if (code !== "NumpadAdd" || $modalStore[0]?.component === "addWord") {
      return;
    }

    openAddWordModal();
  };

  const setKeyboardListeners = () => {
    document.addEventListener("keypress", onPlusBtnPress);
  };

  const unsetKeyboardListeners = () => {
    document.removeEventListener("keypress", onPlusBtnPress);
  };

  onMount(setKeyboardListeners);
  onDestroy(unsetKeyboardListeners);
</script>

<button
  on:dragstart|preventDefault
  on:click={openAddWordModal}
  class="btn h-10 w-10 p-2 bg-cyan-400 hover:bg-cyan-500 hover:filter-none rounded-md active:scale-90 active:bg-cyan-500 focus:bg-cyan-500 active:filter-none"
>
  <div class="h-full w-full bg-white" style={getIconMaskStyes(plusImageUrl)} />
</button>
