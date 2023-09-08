import { modalStore } from '@skeletonlabs/skeleton';
import { DBUtilsFacade } from '../../../../../DB/DBUtilsFacade.js';
import { getAppSettingsInitialValues } from '../../../../../DB/initialData/appSettingsInitialValues.js';
import { getPracticeInitialValues } from '../../../../../DB/initialData/practiceInitialValues.js';
import { getStatisticInitialValues } from '../../../../../DB/initialData/statisticInitialValues.js';
import { getConfirmModalSettings } from '../../../../../shared/components/ConfirmModal/ConfirmModalUtils.js';
import { closeLoadingDrawer, openLoadingDrawer } from '../../../../../shared/components/Drawer/loadingDrawer/loadingDrawerUtils.js';
import { wordStore } from '../../../../dictionary/stores/wordStore.js';
import { settingsStore } from '../../../../practice/stores/settingsStore.js';
import { statisticStore } from '../../../../statistic/stores/statisticStore/statisticStore.js';
import { activePracticeSettingsStore } from '../../../stores/activePractice/activePracticeSettingsStore.js';
import { basicSettingsStore } from '../../../stores/basicSettingsStore.js';
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
  await DBUtilsFacade.onDictionaryClear();
};

export const onDictionaryReset = async (response: boolean) => {
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
    backdropActionName: "dictionaryResetConfirmAnswer",
    response: onDictionaryReset,
  }));
};

/* -------------------------------------------------------------------------- */
/*                               statistic reset                              */
/* -------------------------------------------------------------------------- */

const statisticReset = async () => {
  const initialData = getStatisticInitialValues();
  statisticStore.reInit(initialData);
  await DBUtilsFacade.onStatisticClear();
  await DBUtilsFacade.initStatisticData(initialData[0]);
};

export const onStatisticReset = async (response: boolean) => {
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
    backdropActionName: "statisticResetConfirmAnswer",
    response: onStatisticReset,
  }));
};

/* -------------------------------------------------------------------------- */
/*                               settings reset                               */
/* -------------------------------------------------------------------------- */

const appSettingsReset = async () => {
  const initialData = getAppSettingsInitialValues();
  passivePracticeSettingsStore.reInit(initialData.practice.passive);
  activePracticeSettingsStore.reInit(initialData.practice.active);
  basicSettingsStore.reInit(initialData.basic);
  // appSettingsStore is derived from 3 stores above, so it will reinit automatically
  await DBUtilsFacade.initAppSettingsData(initialData);
};

/* -------------------------------------------------------------------------- */
/*                        practice page settings reset                        */
/* -------------------------------------------------------------------------- */

const practicePageSettingsReset = async () => {
  const initialData = getPracticeInitialValues();
  settingsStore.reInit(initialData);
  await DBUtilsFacade.initPracticeData(initialData);
};

/* -------------------------------------------------------------------------- */
/*                                  app reset                                 */
/* -------------------------------------------------------------------------- */

export const onAppReset = async (response: boolean) => {
  if (!response) { return; }

  openLoadingDrawer(loadingDrawerSettings);
  await dictionaryReset();
  await practicePageSettingsReset();
  await statisticReset();
  await appSettingsReset();
  closeLoadingDrawer();
};

export const onAppResetButtonClick = () => {
  modalStore.trigger(getConfirmModalSettings({
    backdropColor: "red",
    color: "red",
    body: "All app data (e.g. dictionary, statistic etc.) will be <i class='px-1 bg-white text-red-700 rounded-md'>deleted</i>",
    backdropActionName: "appResetConfirmAnswer",
    response: onAppReset,
  }));
};
