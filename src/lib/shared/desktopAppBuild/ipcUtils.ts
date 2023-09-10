import type { Word } from '../../pages/dictionary/interfaces/Word.js';
import { wordStore } from '../../pages/dictionary/stores/wordStore.js';
import type { PracticeTarget } from '../../pages/practice/interfaces/settings.js';
import { onPassivePractice } from '../../pages/statistic/stores/statisticStore/statisticStoreUtils.js';
import routerStore from '../../router/routerStore.js';
import { setMaximizeStateStoreValue, type MaximizeStates } from '../components/AppDesktopHeader/maximizeStateStore.js';

const onNewPassivePracticeComplete = (_: unknown, result: boolean, wordId: Word["id"], practiceTarget: PracticeTarget) => {
  if (result) {
    wordStore.onSuccessfulPractice(wordId);
    onPassivePractice("successful", practiceTarget);
  } else {
    wordStore.onUnsuccessfulPractice(wordId);
    onPassivePractice("unsuccessful", practiceTarget);
  }
};

export const initDesktopActionListeners = () => {
  window.electron?.ipcRenderer.on("newPassivePracticeComplete", onNewPassivePracticeComplete);
  window.electron?.ipcRenderer.on("setMaximizeStateStoreValue", (_, state: MaximizeStates) => setMaximizeStateStoreValue(state));
  window.electron?.ipcRenderer.on("openPracticePage", () => routerStore.set("/practice"));
};

export const sendToIpcMain = (channel: string, ...data: unknown[]) => {
  window.electron?.ipcRenderer.send(channel, ...data);
};
