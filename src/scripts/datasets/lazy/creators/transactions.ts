import { createAnnualizedLazyDataset, createDividedLazyDataset } from "./base";

export function createTransactionsDatasets({
  resourceDatasets,
}: {
  resourceDatasets: ResourceDatasets;
}) {
  const dateToTransactionVolumeAnnualized = createAnnualizedLazyDataset(
    resourceDatasets.dateToTransactionVolume,
  );

  const dateToTransactionsVelocity = createDividedLazyDataset(
    dateToTransactionVolumeAnnualized,
    resourceDatasets.dateToSupplyTotal,
  );

  return {
    dateToTransactionVolumeAnnualized,
    dateToTransactionsVelocity,
  };
}
