import { createLazyDatasets } from "./lazy";
import { createResourceDatasets } from "./resource";

export {
  convertNormalCandleToGoldPerBitcoinCandle,
  convertNormalCandleToSatCandle,
  createLazyDataset,
} from "./lazy";

export function createDatasets(resources: ResourcesHTTP) {
  const resourceDatasets = createResourceDatasets(resources);

  const lazyDatasets = createLazyDatasets(resourceDatasets);

  return {
    ...resourceDatasets,
    ...lazyDatasets,
  };
}
