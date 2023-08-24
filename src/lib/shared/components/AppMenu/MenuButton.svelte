<script lang="ts">
  import { drawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
  import { getIconMaskStyes } from "../../../utils/helpers.js";
  import octopusWhiteImageUrl from "/src/assets/icons/octopus-white.svg";

  const drawerSettings: DrawerSettings = {
    id: "mainMenu",
    bgDrawer: "text-white",
    bgBackdrop: "bg-teal-200 bg-opacity-50 !z-30" + (import.meta.env.VITE_BUILD_PLATFORM === "desktop" && " h-[calc(100vh-24px)] bottom-0 top-auto"),
    width: "w-[150px] md:w-[250px]",
    height: "h-max",
    padding: "p-4",
    rounded: "rounded-md",
  };
</script>

<button
  on:click={() => drawerStore.open(drawerSettings)}
  class={`hover:opacity-100 focus:opacity-100 opacity-50 fixed left-5 z-20 active:scale-90 rounded-full transition-all ${import.meta.env.VITE_BUILD_PLATFORM === "desktop" ? "top-12" : "top-6"}`}
>
  <div
    class="h-10 w-10 p-2 bg-teal-500"
    style={getIconMaskStyes(octopusWhiteImageUrl)}
  />
</button>
