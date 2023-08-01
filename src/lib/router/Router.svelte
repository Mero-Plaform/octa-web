<script lang="ts">
  import type { ComponentType } from "svelte";
  import Dictionary from "../pages/dictionary/components/Dictionary.svelte";
  import Practice from "../pages/practice/components/Practice.svelte";
  import routerStore, { type RouterStoreValue } from "./routerStore.js";
  import Statistic from '../pages/statistic/components/chart/Statistic.svelte';
  import Settings from '../pages/settings/components/Settings.svelte';

  const routerData = new Map<RouterStoreValue, ComponentType>([
    ["/dictionary", Dictionary],
    ["/practice", Practice],
    ["/statistic", Statistic],
    ["/settings", Settings],
  ]);

  $: routeComponent = routerData.get($routerStore);
</script>

<svelte:component this={routeComponent} />
