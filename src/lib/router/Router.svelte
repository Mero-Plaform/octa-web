<script lang="ts">
  import type { ComponentType } from "svelte";
  import Link1Handler from "./Link1Handler.svelte";
  import Link2Handler from "./Link2Handler.svelte";
  import routerStore from "./routerStore.js";
  import Dictionary from "../dictionary/components/Dictionary.svelte";  
  import Practice from "../practice/components/Practice.svelte";  

  const handlers = new Map<string, null | ComponentType>([
    ["/", Dictionary],
    ["/link1", Practice],
    ["/link2", Link2Handler],
  ]);

  $: routeHandler = handlers.get($routerStore);
</script>

<svelte:component this={routeHandler} />
