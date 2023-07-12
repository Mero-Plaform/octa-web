<script lang="ts">
  export let additionalStyles = "";
</script>

<div
  class={`text-center text-slate-300 text-4xl cursor-default tracking-[2rem] m-sm:tracking-[1rem] translate-x-3 -translate-y-7 leading-loose break-words max-w-90wv ${additionalStyles}`}
>
  <slot />
</div>
