import type { Word } from '../../pages/dictionary/interfaces/Word.js';
import { wordStore } from '../../pages/dictionary/stores/wordStore.js';
import type { PracticeTarget } from '../../pages/practice/interfaces/settings.js';
import { onPassivePractice } from '../../pages/statistic/stores/statisticStore/statisticStoreUtils.js';

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
};

export const sendWindowError = (err: unknown) => {
  window.electron?.ipcRenderer.send("mainWinErr", err);
};

// menu -> exit
export const onAppExit = () => {
  window.electron?.ipcRenderer.send("onAppExit");
};
