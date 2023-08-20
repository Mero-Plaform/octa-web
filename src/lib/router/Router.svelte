<script lang="ts">
  import type { ComponentType } from "svelte";
  import Exit from "../pages/Exit/Exit.svelte";
  import Dictionary from "../pages/dictionary/components/Dictionary.svelte";
  import Practice from "../pages/practice/components/Practice.svelte";
  import Settings from "../pages/settings/components/Settings.svelte";
  import Statistic from "../pages/statistic/components/chart/Statistic.svelte";
  import routerStore, { type RouterStoreValue } from "./routerStore.js";

  const routerData = new Map<RouterStoreValue, ComponentType>([
    ["/dictionary", Dictionary],
    ["/practice", Practice],
    ["/statistic", Statistic],
    ["/settings", Settings],
    ["/exit", Exit],
  ]);

  $: routeComponent = routerData.get($routerStore);
</script>

<svelte:component this={routeComponent} />
