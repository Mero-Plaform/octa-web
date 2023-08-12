import type { Word } from '../../pages/dictionary/interfaces/Word.js';
import { wordStore } from '../../pages/dictionary/stores/wordStore.js';

const onNewPassivePracticeComplete = (_: unknown, result: boolean, wordId: Word["id"]) => {
  if (result) {
    wordStore.onSuccessfulPractice(wordId);
  } else {
    wordStore.onUnsuccessfulPractice(wordId);
  }
};

export const initDesktopActionListeners = () => {
  window.electron?.ipcRenderer.on("newPassivePracticeComplete", onNewPassivePracticeComplete);
};

export const sendWindowError = (err: unknown) => {
  window.electron?.ipcRenderer.send("mainWinErr", err);
};
