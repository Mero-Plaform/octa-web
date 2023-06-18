import { get } from 'svelte/store';
import type { Word } from '../../dictionary/interfaces/Word.js';
import { wordStore } from '../../dictionary/stores/wordStore.js';
import { createIteratorFromArr, shuffle } from '../../utils/helpers.js';
import type { PracticeType, SettingsStore } from '../interfaces/settings.js';
import { sectionTaskStore } from '../stores/sectionTaskStore.js';
import { settingsStore } from '../stores/settingsStore.js';

export const onRandom = () => {
  return shuffle(wordStore.get().values());
};

export const onWorst = () => {
  return [...wordStore.get().values()].sort((a, b) => a.learnSuccess - b.learnSuccess);
};

export const onSection = () => {
  const { sectionLastWordId, sectionSize } = get(settingsStore);
  const wordStoreAsArray = [...wordStore.get().values()];

  // if no data about last section practice - set start index as 0
  // + 1 for getting next word
  let lastSectionWordIndex = sectionLastWordId
    ? wordStoreAsArray.findIndex(({ id }) => id === sectionLastWordId) + 1
    : 0;

  if (lastSectionWordIndex === wordStoreAsArray.length) {
    lastSectionWordIndex = 0;
  }

  const practiceWords = wordStoreAsArray.slice(lastSectionWordIndex, lastSectionWordIndex + sectionSize);

  sectionTaskStore.set({ wordsCount: practiceWords.length });

  return practiceWords;
};

type TaskPreparationHandlers = Record<PracticeType, Function>;

const handlers: TaskPreparationHandlers = {
  random: onRandom,
  worst: onWorst,
  section: onSection
};

export const taskDataPreparer = ({ practiceTarget, practiceType, sectionSize }: SettingsStore) => {
  return createIteratorFromArr<Word>(handlers[practiceType](practiceTarget, sectionSize));
};
