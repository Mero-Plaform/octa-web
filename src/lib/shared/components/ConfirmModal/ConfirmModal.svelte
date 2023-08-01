<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import { backdropClick } from "./backdropClickDirective.js";
  import type { ConfirmModalMeta } from "./interface.js";

  const {
    title = "Confirm",
    body = "",
    okBtnText = "Yes",
    noBtnText = "No",
    color = "slate",
    callback,
  }: ConfirmModalMeta = $modalStore[0].meta;

  const onReject = () => onModalAction(false);
  const onConfirm = () => onModalAction(true);

  const onModalAction = (result: boolean) => {
    callback(result);
    modalStore.close();
  };
</script>

<div
  use:backdropClick
  on:backdropClick={onReject}
  class="flex flex-col gap-5 text-white"
>
  <div
    class="bg-{color}-400 rounded-md p-2 text-center cursor-default select-none text-2xl"
  >
    {title}
  </div>
  {#if body}
    <div
      class="bg-{color}-400 bg-opacity-50 rounded-md p-2 text-center cursor-default select-none"
    >
      {@html body}
    </div>
  {/if}
  <div class="flex gap-2">
    <button
      class="transition-all active:scale-90 p-2 grow bg-{color}-400 hover:bg-{color}-500 focus:bg-{color}-500 rounded-md"
      on:click={onConfirm}
    >
      {okBtnText}
    </button>
    <button
      class="transition-all active:scale-90 p-2 grow bg-{color}-400 hover:bg-{color}-500 focus:bg-{color}-500 rounded-md"
      on:click={onReject}
    >
      {noBtnText}
    </button>
  </div>
</div>
