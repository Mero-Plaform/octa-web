<script lang="ts">
  import { drawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
  import { getIconMaskStyes } from "../../../utils/helpers.js";
  import octopusWhiteImageUrl from "/src/assets/icons/octopus-white.svg";

  const drawerSettings: DrawerSettings = {
    id: "mainMenu",
    bgDrawer: "text-white",
    bgBackdrop: "bg-teal-200 bg-opacity-50 !z-30",
    width: "w-[150px] md:w-[250px]",
    height: "h-max",
    padding: "p-4",
    rounded: "rounded-md",
  };
</script>

<button
  on:click={() => drawerStore.open(drawerSettings)}
  class="hover:opacity-100 focus:opacity-100 opacity-50 fixed top-6 left-5 z-20 active:scale-90 rounded-full transition-all"
>
  <div
    class="h-10 w-10 p-2 bg-cyan-500"
    style={getIconMaskStyes(octopusWhiteImageUrl)}
  />
</button>
