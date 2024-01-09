<script lang="ts">
  import { createDebounce } from "../../helpers.js";

  const appTag = document.getElementById("app")!;
  const keyframes = document.createElement("style");

  const animationTimeCoefPerPixel = 0.1;
  let appHeight: number;
  let animationTime: number;
  const reCalcStyle = () => {
    appHeight = appTag.clientHeight;
    animationTime = appHeight * animationTimeCoefPerPixel;

    keyframes.textContent = `
      @keyframes appScreenBgAnimation {
        to {
          transform: translateY(-${appHeight + 30}px);
        }
      }
      .appScreenBgAnimation {
        animation: ${animationTime}s appScreenBgAnimation linear infinite;
      }
    `;
  };
  const reCalcStyleOnWindowResize = createDebounce(reCalcStyle, 2000);

  reCalcStyle();
</script>

<svelte:window on:resize={reCalcStyleOnWindowResize} />

{@html keyframes.outerHTML}
