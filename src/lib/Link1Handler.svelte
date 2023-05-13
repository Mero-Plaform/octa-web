<script lang='ts'>
    import { InputChip } from '@skeletonlabs/skeleton';
    import { writable } from 'svelte/store';

    const word = {
      arr: ['1', '2', '3']
    };

</script>

<div class='flex justify-center items-center gap-5 h-screen w-screen'>
  Link1 handler component
  <img src="src/assets/svelte.svg" alt="svelte icon" />
</div>

<InputChip bind:value={word.arr} name="chips" placeholder="Enter any value..." />
