import { CustomWritableStoreWithoutInitialCallFactory } from '../../../utils/customStores/CustomWritableStoreWithoutInitialCallFactory.js';
import type { YearData } from '../interfaces/StatisticStore.js';

/**
 * keeps year of new statistic update
 */
export const statisticUpdateStore = CustomWritableStoreWithoutInitialCallFactory<YearData>();
