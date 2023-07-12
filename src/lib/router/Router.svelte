<script lang="ts">
  import type { ComponentType } from "svelte";
  import Dictionary from "../pages/dictionary/components/Dictionary.svelte";
  import Practice from "../pages/practice/components/Practice.svelte";
  import routerStore from "./routerStore.js";

  const routerData = new Map<string, null | ComponentType>([
    ["/dictionary", Dictionary],
    ["/practice", Practice],
  ]);

  $: routeComponent = routerData.get($routerStore);
</script>

<svelte:component this={routeComponent} />
