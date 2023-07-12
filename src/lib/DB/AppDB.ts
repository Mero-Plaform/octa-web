
import Dexie, { type Table } from 'dexie';
import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { StatisticStoreValues } from '../pages/statistic/interfaces/StatisticStore.js';

export class AppDB extends Dexie {
  dictionary!: Table<Word>;
  practice!: Table<SettingsStore>;
  statistic!: Table<StatisticStoreValues>;

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
