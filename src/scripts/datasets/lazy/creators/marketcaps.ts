import {
  createAddedLazyDataset,
  createMultipliedLazyDataset,
  createNetChangeLazyDataset,
  createSubtractedLazyDataset,
} from "./base";

export function createLazyMarketCapDatasets({
  resourceDatasets,
}: {
  resourceDatasets: ResourceDatasets;
}) {
  const dateToMarketCapitalization = createMultipliedLazyDataset(
    resourceDatasets.dateToSupplyTotal,
    resourceDatasets.closes,
  );

  const dateToScamcoinsMarketCap = createSubtractedLazyDataset(
    resourceDatasets.dateToAltcoinsMarketCapitalization,
    resourceDatasets.dateToStablecoinsMarketCapitalization,
  );

  const dateToCryptoMarketCapitalization = createAddedLazyDataset(
    dateToMarketCapitalization,
    resourceDatasets.dateToAltcoinsMarketCapitalization,
  );

  const dateToStablecoinsMarketCapitalization30dChange =
    createNetChangeLazyDataset(
      resourceDatasets.dateToStablecoinsMarketCapitalization,
      30,
    );

  return {
    dateToMarketCapitalization,
    dateToScamcoinsMarketCap,
    dateToCryptoMarketCapitalization,
    dateToStablecoinsMarketCapitalization30dChange,
  };
}
