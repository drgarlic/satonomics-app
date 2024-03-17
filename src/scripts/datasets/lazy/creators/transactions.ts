import { createAnnualizedLazyDataset, createDividedLazyDataset } from "./base";

export function createTransactionsDatasets<
  Resources extends AnyResourceDatasets,
>(resources: Resources) {
  const transactionVolumeAnnualized = createAnnualizedLazyDataset(
    resources.transactionVolume,
  );

  const transactionsVelocity = createDividedLazyDataset(
    transactionVolumeAnnualized,
    resources.SupplyTotal,
  );

  return {
    transactionVolumeAnnualized,
    transactionsVelocity,
  };
}
