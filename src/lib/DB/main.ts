import { getDictionaryDataAsArray, getPracticeData, getStatisticDataAsArray, initPracticeData } from './utils.js';

const practiceInitialValues = {
  practiceTarget: "original",
  practiceType: "section",
  sectionLastWordId: null,
  sectionSize: 10,
} as const;

export const getDBData = async () => {
  let [dictionaryArr, practiceData, statisticArr] = await Promise.all([getDictionaryDataAsArray(), getPracticeData(), getStatisticDataAsArray()]);

  if (practiceData === undefined) {
    practiceData = practiceInitialValues;
    initPracticeData(practiceInitialValues);
  }

  return [dictionaryArr, practiceData!, statisticArr] as const;
};
