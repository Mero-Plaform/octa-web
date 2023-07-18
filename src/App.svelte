<script lang="ts">
  import {
    Modal, Toast,
  } from "@skeletonlabs/skeleton";
  import Menu from "./lib/shared/components/AppMenu/Menu.svelte";
  import { modalComponentRegistry } from "./lib/shared/modalComponentRegistry.js";
  import Router from './lib/router/Router.svelte';
  import routerStore from './lib/router/routerStore.js';

  // initial page
  $routerStore = '/statistic';
</script>

<Menu/>

<Modal components={modalComponentRegistry}/>

<Router />

<Toast />
