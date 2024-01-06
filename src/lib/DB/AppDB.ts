import { Dexie, type Table } from 'dexie';
import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { AppSettings } from '../pages/settings/interfaces/appSettings.js';
import type { YearData } from '../pages/statistic/interfaces/StatisticStore.js';
import type { IdleMode } from "../pages/settings/interfaces/idleMode.js";

export class AppDB extends Dexie {
  dictionary!: Table<Word>;
  practiceSettings!: Table<SettingsStore>;
  statistic!: Table<YearData>;
  appSettings!: Table<AppSettings>;
  idleMode!: Table<IdleMode>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      dictionary: 'id',
      practiceSettings: '',
      statistic: 'year',
      appSettings: '',
      idleMode: '',
    });
  }

  static recreateFromImport(newDB: AppDB) {
    appDB = newDB;
  }
}

export let appDB = new AppDB();
