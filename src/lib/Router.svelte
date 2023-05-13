<script lang="ts">
  import type { ComponentType } from "svelte";
  import Link1Handler from "./Link1Handler.svelte";
  import Link2Handler from "./Link2Handler.svelte";
  import routerStore from "./routerStore";

  const handlers = new Map<string, null | ComponentType>([
    ["/", null],
    ["/link1", Link1Handler],
    ["/link2", Link2Handler],
  ]);

  let routeHandler: null | ComponentType = null;

  routerStore.subscribe((path) => {
    routeHandler = handlers.get(path);
  });
</script>

<svelte:component this={routeHandler} />
