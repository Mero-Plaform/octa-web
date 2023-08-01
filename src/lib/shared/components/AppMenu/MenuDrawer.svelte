<script>
  import { drawerStore } from "@skeletonlabs/skeleton";
  import MenuInner from "./MenuInner.svelte";
</script>

<MenuInner on:click={() => drawerStore.close()} />
