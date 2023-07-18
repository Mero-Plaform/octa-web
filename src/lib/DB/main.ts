import { practiceInitialValues } from './initialData/practiceInitialValues.js';
import { statisticInitialValues } from './initialData/statisticInitialValues.js';
import { getDictionaryDataAsArray, getPracticeData, getStatisticDataAsArray, initPracticeData, initStatisticData } from './utils.js';

export const getDBData = async () => {
  let [dictionaryArr, practiceData, statisticArr] = await Promise.all([getDictionaryDataAsArray(), getPracticeData(), getStatisticDataAsArray()]);

  if (practiceData === undefined) {
    practiceData = practiceInitialValues;
    initPracticeData(practiceInitialValues);
  }

  if (statisticArr.length === 0) {
    statisticArr = statisticInitialValues();
    initStatisticData(statisticArr[0]);
  }

  return [dictionaryArr, practiceData!, statisticArr] as const;
};
