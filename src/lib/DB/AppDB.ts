import Dexie, { type Table } from 'dexie';
import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { AppSettings } from '../pages/settings/interfaces/appSettings.js';
import type { YearData } from '../pages/statistic/interfaces/StatisticStore.js';

// @ts-ignore
export class AppDB extends Dexie {
  dictionary!: Table<Word>;
  practiceSettings!: Table<SettingsStore>;
  statistic!: Table<YearData>;
  appSettings!: Table<AppSettings>;

  constructor() {
    super('AppDB');
    //@ts-ignore
    this.version(1).stores({
      dictionary: 'id',
      practiceSettings: '',
      statistic: 'year',
      appSettings: '',
    });
  }

  static recreateFromImport(newDB: AppDB) {
    appDB = newDB;
  }
}

export let appDB = new AppDB();
