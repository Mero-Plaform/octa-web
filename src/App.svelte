<script lang="ts">
  import {
    Modal,
  } from "@skeletonlabs/skeleton";
  import Menu from "./lib/AppMenu/Menu.svelte";
  import Router from "/src/lib/router/Router.svelte";
  import Dictionary from "./lib/dictionary/components/Dictionary.svelte";
  import Loading from "./lib/shared/Loading.svelte";
  import Popups from "./lib/shared/components/Popups.svelte";
  import { modalComponentRegistry } from "./lib/shared/modalComponentRegistry.js";
</script>

<Menu/>

<Modal components={modalComponentRegistry}/>

<Dictionary />

<Router />

<Loading />

<Popups />
 
