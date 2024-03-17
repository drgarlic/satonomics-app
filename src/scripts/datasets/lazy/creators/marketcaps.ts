import {
  createAddedLazyDataset,
  createMultipliedLazyDataset,
  createNetChangeLazyDataset,
  createSubtractedLazyDataset,
} from "./base";

export function createMarketCapDatasets({
  resources,
  marketCapitalization,
}: {
  marketCapitalization: Dataset<"date">;
  resources: DateResourceDatasets;
}) {
  return {
    scamcoinsMarketCap: createSubtractedLazyDataset(
      resources.altcoinsMarketCapitalization,
      resources.stablecoinsMarketCapitalization,
    ),
    cryptoMarketCapitalization: createAddedLazyDataset(
      marketCapitalization,
      resources.altcoinsMarketCapitalization,
    ),
    stablecoinsMarketCapitalization30dChange: createNetChangeLazyDataset(
      resources.stablecoinsMarketCapitalization,
      30,
    ),
  };
}
