export const onAppRendered = () => {
  const appEntryLoadingScreen = document.getElementById("appEntryLoadingScreen")!;
  appEntryLoadingScreen.addEventListener("animationend", (e) => {
    appEntryLoadingScreen.remove();
    document.getElementById("appEntryLoadingScreenStyles")!.remove();
  }, { once: true });
  appEntryLoadingScreen.classList.add("openLoadingScreen");
};
