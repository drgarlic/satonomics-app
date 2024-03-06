import { createLazyDatasets } from "./lazy";
import { createResourceDatasets } from "./resource";

export {
  convertNormalCandleToGoldPerBitcoinCandle,
  convertNormalCandleToSatCandle,
  createLazyDataset,
} from "./lazy";

// export const USABLE_CANDLESTICKS_START_DATE = '2014-01-01'

export function createDatasets(resources: ResourcesHTTP) {
  const resourceDatasets = createResourceDatasets(resources);

  const lazyDatasets = createLazyDatasets(resourceDatasets);

  return {
    ...resourceDatasets,
    ...lazyDatasets,
  };
}
