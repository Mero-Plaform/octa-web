import { modalStore } from '@skeletonlabs/skeleton';
import { getAppSettingsInitialValues } from '../../../../../DB/initialData/appSettingsInitialValues.js';
import { getStatisticInitialValues } from '../../../../../DB/initialData/statisticInitialValues.js';
import { type InitAppSettingsData, type InitStatisticData, type OnDictionaryClear, type OnStatisticClear } from '../../../../../DB/utils.js';
import { utilsWithCatch } from '../../../../../DB/utilsWithCatch.js';
import { getConfirmModalSettings } from '../../../../../shared/components/ConfirmModal/ConfirmModalUtils.js';
import { closeLoadingDrawer, openLoadingDrawer } from '../../../../../shared/components/Drawer/loadingDrawer/loadingDrawerUtils.js';
import { wordStore } from '../../../../dictionary/stores/wordStore.js';
import { statisticStore } from '../../../../statistic/stores/statisticStore/statisticStore.js';
import { activePracticeSettingsStore } from '../../../stores/activePractice/activePracticeSettingsStore.js';
import { appSettingsStore } from '../../../stores/appSettingsStore/appSettingsStore.js';
import { passivePracticeSettingsStore } from '../../../stores/passivePractice/passivePracticeSettingsStore.js';

const loadingDrawerSettings = {
  bgBackdropColor: "red",
  OctaIconColor: "red",
};

/* -------------------------------------------------------------------------- */
/*                              dictionary reset                              */
/* -------------------------------------------------------------------------- */

const dictionaryReset = async () => {
  wordStore.clear();
  await (<OnDictionaryClear>utilsWithCatch.get("onDictionaryClear")!)();
};

const onDictionaryReset = async (response: boolean) => {
  if (!response) { return; }

  openLoadingDrawer(loadingDrawerSettings);
  await dictionaryReset();
  closeLoadingDrawer();
};

export const onDictionaryResetButtonClick = () => {
  modalStore.trigger(getConfirmModalSettings({
    backdropColor: "red",
    color: "red",
    body: "All words in the dictionary and their data (e.g. practice) will be <i class='px-1 bg-white text-red-700 rounded-md'>deleted</i><br>This action doesn't affects app statistic",
    callback: onDictionaryReset
  }));
};

/* -------------------------------------------------------------------------- */
/*                               statistic reset                              */
/* -------------------------------------------------------------------------- */

const statisticReset = async () => {
  const initialData = getStatisticInitialValues();
  statisticStore.reInit(initialData);
  await (<OnStatisticClear>utilsWithCatch.get("onStatisticClear")!)();
  await (<InitStatisticData>utilsWithCatch.get("initStatisticData")!)(initialData[0]);
};

const onStatisticReset = async (response: boolean) => {
  if (!response) { return; }

  openLoadingDrawer(loadingDrawerSettings);
  await statisticReset();
  closeLoadingDrawer();
};

export const onStatisticResetButtonClick = () => {
  modalStore.trigger(getConfirmModalSettings({
    backdropColor: "red",
    color: "red",
    body: "All statistic data (e.g. number of practice per month etc.) will be <i class='px-1 bg-white text-red-700 rounded-md'>deleted</i>",
    callback: onStatisticReset
  }));
};

/* -------------------------------------------------------------------------- */
/*                               settings reset                               */
/* -------------------------------------------------------------------------- */

const appSettingsReset = async () => {
  const initialData = getAppSettingsInitialValues();
  appSettingsStore.reInit(initialData);
  passivePracticeSettingsStore.reInit(initialData.practice.passive);
  activePracticeSettingsStore.reInit(initialData.practice.active);
  await (<InitAppSettingsData>utilsWithCatch.get("initAppSettingsData")!)(initialData);
};

/* -------------------------------------------------------------------------- */
/*                                  app reset                                 */
/* -------------------------------------------------------------------------- */

const onAppReset = async (response: boolean) => {
  if (!response) { return; }

  openLoadingDrawer(loadingDrawerSettings);
  await dictionaryReset();
  await statisticReset();
  await appSettingsReset();
  closeLoadingDrawer();
};

export const onAppResetButtonClick = () => {
  modalStore.trigger(getConfirmModalSettings({
    backdropColor: "red",
    color: "red",
    body: "All app data (e.g. dictionary, statistic etc.) will be <i class='px-1 bg-white text-red-700 rounded-md'>deleted</i>",
    callback: onAppReset
  }));
};
