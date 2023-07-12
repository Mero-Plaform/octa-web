<script lang="ts">
  export let data: string[];
  export let wrapStyles: string;
  export let chipStyles: string;
  export let coverStyles: string;
  export let hide: boolean = false;
  export let show: boolean = false;

  const coverOpeningDelays = [
    "delay-0",
    "delay-75",
    "delay-100",
    "delay-150",
    "delay-200",
    "delay-300",
    "delay-500",
    "delay-700",
    "delay-1000",
  ];
</script>

<div class={wrapStyles}>
  {#each data as item, itemIndex (item)}
    <span class={chipStyles}>
      <span 
        class:translate-y-full={show}
        class:h-full={hide} 
        class:hidden={!hide} 
        class={`${coverStyles} ${coverOpeningDelays[itemIndex]}`}
      >
        ?
      </span>
      {item}
    </span>
  {/each}
</div>
