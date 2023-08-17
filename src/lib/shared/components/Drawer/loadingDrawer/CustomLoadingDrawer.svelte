<script lang="ts">
  import OctaIconURL from "../../../../../assets/icons/octopus-white.svg";
  import { getIconMaskStyes } from "../../../../utils/helpers.js";
  import { loadingDrawerStylesStore } from "./loadingDrawerStylesStore.js";
</script>

<div class="h-full w-full flex items-center justify-center">
  <div
    class={`animate-bounce h-24 w-24 bg-${$loadingDrawerStylesStore.OctaIconColor}-500`}
    style={getIconMaskStyes(OctaIconURL)}
  />
</div>
