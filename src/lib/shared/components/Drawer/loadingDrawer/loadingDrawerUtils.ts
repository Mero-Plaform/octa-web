import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
import { disablePreventEscButton, enablePreventEscButton } from '../../../../utils/helpers.js';
import { loadingDrawerStylesStore, type LoadingDrawerProgressBarStylesStore } from './loadingDrawerStylesStore.js';

const loadingDrawerSettings: DrawerSettings = {
  id: "loading",
  bgDrawer: "text-white",
  bgBackdrop: "bg-opacity-50 !z-30" + (import.meta.env.VITE_BUILD_PLATFORM === "desktop" && " h-[calc(100vh-24px)] bottom-0 top-auto"),
  width: "w-full",
  height: "h-full",
  padding: "",
  rounded: "rounded-md",
};

type CustomLoadingDrawerSettings = { bgBackdropColor: string; } & LoadingDrawerProgressBarStylesStore;

export const openLoadingDrawer = (settings: CustomLoadingDrawerSettings) => {
  loadingDrawerStylesStore.set({
    OctaIconColor: settings.OctaIconColor
  });
  enablePreventEscButton();
  drawerStore.open({
    ...loadingDrawerSettings,
    bgBackdrop: `${loadingDrawerSettings.bgBackdrop} bg-${settings.bgBackdropColor}-500`
  });
};

export const closeLoadingDrawer = () => {
  drawerStore.close();
  disablePreventEscButton();
};
