import {
  createAddressesDatasets,
  createAnyPossibleCohortLazyDatasets,
  createCointimeDatasets,
  createLazyMiningDatasets,
  createMultipliedLazyDataset,
  createTransactionsDatasets,
  createTransformedLazyDataset,
} from ".";

export function createCommonDataset<Resources extends AnyResourceDatasets>(
  resources: Resources,
) {
  const marketCapitalization = createMultipliedLazyDataset(
    resources.SupplyTotal,
    resources.price,
  );

  const anyPossibleCohortDatasets = createAnyPossibleCohortLazyDatasets({
    resources: resources,
    marketCapitalization,
  });

  const transactionsDatasets = createTransactionsDatasets(resources);

  const miningDatasets = createLazyMiningDatasets(resources);

  return {
    marketCapitalization,
    ...miningDatasets,
    ...transactionsDatasets,
    ...anyPossibleCohortDatasets,

    ...createAddressesDatasets(resources),

    ...createCointimeDatasets({
      resources,
      cumulatedNetRealizedProfitAndLoss:
        anyPossibleCohortDatasets.CumulatedNetRealizedProfitAndLoss,
      realizedPrice: anyPossibleCohortDatasets.RealizedPrice,
      supplyTotalAtMinus1Block: miningDatasets.supplyTotalAtMinus1Block,
      yearlyInflationRate: miningDatasets.yearlyInflationRate,
      transactionVolumeAnnualized:
        transactionsDatasets.transactionVolumeAnnualized,
    }),

    value50: createTransformedLazyDataset(resources.price, () => 50),
    value100: createTransformedLazyDataset(resources.price, () => 100),
    value144: createTransformedLazyDataset(resources.price, () => 144),
  };
}
