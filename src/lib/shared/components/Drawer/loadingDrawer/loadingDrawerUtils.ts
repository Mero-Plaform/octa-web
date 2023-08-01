import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
import { disablePreventEscButton, enablePreventEscButton } from '../../../../utils/helpers.js';
import { loadingDrawerProgressBarStylesStore, type LoadingDrawerProgressBarStylesStore } from './loadingDrawerProgressBarStylesStore.js';

const loadingDrawerSettings: DrawerSettings = {
  id: "loading",
  bgDrawer: "text-white",
  bgBackdrop: "bg-opacity-50 !z-30",
  width: "w-full",
  height: "h-full",
  padding: "",
  rounded: "rounded-md",
};

type CustomLoadingDrawerSettings = { bgBackdropColor: string; } & LoadingDrawerProgressBarStylesStore;

export const openLoadingDrawer = (settings: CustomLoadingDrawerSettings) => {
  loadingDrawerProgressBarStylesStore.set({ 
    progressBarBgColor: settings.progressBarBgColor 
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
