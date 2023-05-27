import { wordsStore } from '/src/lib/dictionary/stores/wordsStore.js';

export const dictionaryMockFill = async (wordsCount: number) => {
  const newWord = {
    id: null,
    learnSuccess: null,
    variants: null,
    translations: null,
    description: null,
  };

  for (let currentWordIndex = 0; currentWordIndex < wordsCount; currentWordIndex += 1) {
    newWord.id = String(currentWordIndex);
    newWord.learnSuccess = Math.floor(Math.random() * 100);
    newWord.variants = [`test variant ${currentWordIndex}`];
    newWord.translations = [`test translation ${currentWordIndex}`];
    newWord.description = `test description ${currentWordIndex}`;

    wordsStore.update((wordsMap) => {
      return wordsMap.set(newWord.id, { ...newWord });
    });
  }
};
