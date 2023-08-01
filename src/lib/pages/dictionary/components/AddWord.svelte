<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import { onDestroy, onMount } from "svelte";
  import { getIconMaskStyes } from "../../../utils/helpers.js";
  import plusImageUrl from "/src/assets/icons/plus.svg";

  const modal: ModalSettings = {
    type: "component",
    component: "addWord",
    backdropClasses: "!bg-cyan-200 !bg-opacity-50 backdrop-blur-sm",
  };

  const checkIsOpen = () => {
    if ($modalStore.length === 0) {
      return false;
    }
    return $modalStore.find((modals: { type: string; component: string }) => {
      if (modals.type !== "component") {
        return false;
      }
      return modal.component === "addWord";
    });
  };

  const openModal = () => {
    if (checkIsOpen()) {
      return;
    }
    modalStore.trigger(modal);
  };

  const onPlusBtnPress = ({ code }: KeyboardEvent) => {
    if (code !== "NumpadAdd") {
      return;
    }
    openModal();
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
  on:click={openModal}
  class="btn h-10 w-10 p-2 bg-cyan-400 hover:bg-cyan-500 hover:filter-none rounded-md active:scale-90 active:bg-cyan-500 focus:bg-cyan-500 active:filter-none"
>
  <div class="h-full w-full bg-white" style={getIconMaskStyes(plusImageUrl)} />
</button>
