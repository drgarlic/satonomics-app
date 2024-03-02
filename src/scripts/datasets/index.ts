import { createLazyDatasets } from "./lazy";
import { createResourceDatasets } from "./resource";

export {
  convertNormalCandleToGoldPerBitcoinCandle,
  convertNormalCandleToSatCandle,
  createLazyDataset,
} from "./lazy";

// export const USABLE_CANDLESTICKS_START_DATE = '2014-01-01'

export async function createDatasets(resources: ResourcesHTTP) {
  const resourceDatasets = await createResourceDatasets(resources);

  const lazyDatasets = createLazyDatasets(resourceDatasets);

  return {
    ...resourceDatasets,
    ...lazyDatasets,
  };
}
