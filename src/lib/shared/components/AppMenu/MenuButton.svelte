<script lang="ts">
  import { drawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
  import { getIconMaskStyes } from '../../../utils/helpers.js';
  
  const drawerSettings: DrawerSettings = {
    id: "main",
    bgDrawer: "bg-cyan-900 text-white ",
    bgBackdrop: "bg-yellow-200 !z-30",
    width: "w-[250px] md:w-[250px]",
    height: "h-max",
    padding: "p-4",
    rounded: "rounded-xl",
  };
</script>

<button
  on:click={() => drawerStore.open(drawerSettings)}
  class="hover:opacity-100 focus:opacity-100 opacity-50 fixed top-6 left-5 z-20 active:scale-90 rounded-full transition-all outline-none"
>
  <div
    class="h-10 w-10 p-2 bg-cyan-500"
    style={getIconMaskStyes("src/assets/icons/octopus-white.svg")}
  />
</button>
