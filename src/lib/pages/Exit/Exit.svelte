<script lang="ts">
    import { fade } from 'svelte/transition';
  import StateText from "../../shared/components/StateText.svelte";
  
</script>

<div transition:fade class="absolute h-screen w-screen flex justify-center items-center">
<StateText> App is closing </StateText>
</div>
