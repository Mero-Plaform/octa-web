import { CustomWritableStoreWithoutInitialCallFactory } from '../../../utils/customStores/CustomWritableStoreWithoutInitialCallFactory.js';
import type { YearData } from '../interfaces/StatisticStore.js';

/**
 * stores year of new statistic update
 */
export const statisticUpdateStore = CustomWritableStoreWithoutInitialCallFactory<YearData>();
