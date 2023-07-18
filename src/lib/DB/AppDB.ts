
import Dexie, { type Table } from 'dexie';
import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { YearData } from '../pages/statistic/interfaces/StatisticStore.js';

export class AppDB extends Dexie {
  dictionary!: Table<Word>;
  practice!: Table<SettingsStore>;
  statistic!: Table<YearData>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      dictionary: 'id',
      practice: '++id',
      statistic: 'year'
    });
  }
}

export const appDB = new AppDB();
