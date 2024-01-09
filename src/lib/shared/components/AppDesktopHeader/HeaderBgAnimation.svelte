<script lang="ts">
  import OctaIconURL from "../../../../assets/icons/octa-swim.svg";

  const onAnimationend = ({ target }: AnimationEvent) => {
    (target as HTMLImageElement).style.left =
      Math.floor(Math.random() * 80 + 10) + "%";
  };
</script>

<div class="h-full w-full absolute -z-10">
  <img
    on:animationiteration={onAnimationend}
    class="absolute h-4 opacity-40 animate-lift top-6"
    style="left:10%"
    src={OctaIconURL}
    alt="octa icon"
  />
  <img
    on:animationiteration={onAnimationend}
    class="absolute h-4 opacity-40 animate-lift top-6"
    style="left:25%"
    src={OctaIconURL}
    alt="octa icon"
  />
  <img
    on:animationiteration={onAnimationend}
    class="absolute h-4 opacity-40 animate-lift top-6"
    style="left:45%"
    src={OctaIconURL}
    alt="octa icon"
  />
  <img
    on:animationiteration={onAnimationend}
    class="absolute h-4 opacity-40 animate-lift top-6"
    style="left:70%"
    src={OctaIconURL}
    alt="octa icon"
  />
  <img
    on:animationiteration={onAnimationend}
    class="absolute h-4 opacity-40 animate-lift top-6"
    style="left:90%"
    src={OctaIconURL}
    alt="octa icon"
  />
</div>

<style>
  img:nth-child(2) {
    animation-delay: -2s;
  }
  img:nth-child(3) {
    animation-delay: 2s;
  }
  img:nth-child(4) {
    animation-delay: 5s;
  }
  img:nth-child(4) {
    animation-delay: 7s;
  }
</style>
