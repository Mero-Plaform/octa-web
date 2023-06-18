import { getDictionaryDataAsArray, getPracticeData, initPracticeData } from './utils.js';
import { initDBWordStoreActionsListener } from './wordStoreActionsListener.js';

const practiceInitialValues = {
  practiceTarget: "original",
  practiceType: "section",
  sectionLastWordId: null,
  sectionSize: 10,
} as const;  

export const initDB = async () => {
  // loading saved previously dictionary
  const dictionaryArr = await getDictionaryDataAsArray();
  const practiceData = await getPracticeData();
  
  initDBWordStoreActionsListener();

  if (practiceData === undefined) {
    initPracticeData(practiceInitialValues);
    return [dictionaryArr, practiceInitialValues!] as const;
  }
  
  return [dictionaryArr, practiceData!] as const;
};
