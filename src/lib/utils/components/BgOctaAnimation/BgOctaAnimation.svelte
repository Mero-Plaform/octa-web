<script lang="ts">
  import OctaSwimIconURL from "../../../../assets/icons/octa-swim.svg";
  import { getIconMaskStyes, random, randomFromArr } from "../../helpers.js";
  import BgAnimationKeyframe from "./BgAnimationKeyframe.svelte";

  // octa images amount to render
  export let octaNumber = 0;

  const octaColors: readonly string[] = [
    "#ef4444",
    "#f97316",
    "#10b981",
    "#eab308",
    "#06b6d4",
    "#a855f7",
    "#d946ef",
    "#ec4899",
  ];

  // getting once on render
  const currentOctaColor = randomFromArr(octaColors);
  const octaImgs = Array.from({ length: octaNumber });

  const getLeftPos = () => random(5, 90) + "%";

  const onAnimationend = ({ target }: AnimationEvent) => {
    (target as HTMLImageElement).style.left = getLeftPos();
  };
</script>

<div on:animationiteration={onAnimationend}>
  {#each octaImgs as _}
    <div
      on:dragstart|preventDefault
      class="appScreenBgAnimation absolute h-6 w-6 -bottom-6 opacity-30"
      style="left:{getLeftPos()}; animation-delay: {random(
        -35000,
        35000,
      )}ms; {getIconMaskStyes(
        OctaSwimIconURL,
      )} background-color: {currentOctaColor};"
    />
  {/each}
</div>

<BgAnimationKeyframe />
