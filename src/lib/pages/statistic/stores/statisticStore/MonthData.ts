export class MonthData {
  totalWordsAmount: number;
  addedWordsAmount: number;
  deletedWordsAmount: number;
  wordTotalPracticeAmount: number;
  wordOriginPracticeAmount: number;
  wordTranslationPracticeAmount: number;
  averagePracticeSuccess: number;
  successfulPracticeCount: number;
  unsuccessfulPracticeCount: number;

  constructor() {
    this.totalWordsAmount = 0;
    this.addedWordsAmount = 0;
    this.deletedWordsAmount = 0;
    this.wordTotalPracticeAmount = 0;
    this.wordOriginPracticeAmount = 0;
    this.wordTranslationPracticeAmount = 0;
    this.averagePracticeSuccess = 0;
    this.successfulPracticeCount = 0;
    this.unsuccessfulPracticeCount = 0;
  }
};
