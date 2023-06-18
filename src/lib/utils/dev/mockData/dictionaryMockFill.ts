import type { Word } from '../../../dictionary/interfaces/Word.js';
import { wordStore } from '../../../dictionary/stores/wordStore.js';

export const dictionaryMockFill = async (wordsCount: number) => {
  for (let currentWordIndex = 0; currentWordIndex < wordsCount; currentWordIndex += 1) {
    const newWord: Word = {
      id: String(currentWordIndex),
      learnSuccess: Math.floor(Math.random() * 100),
      practiceCount: 0,
      successfulPracticeCount: 0,
      variants: [`test variant ${currentWordIndex}`],
      translations: [`test translation ${currentWordIndex}`],
      description: `test description ${currentWordIndex}`,
    };

    wordStore.update((wordsMap) => {
      return wordsMap.set(newWord.id, { ...newWord });
    });
  }
};
