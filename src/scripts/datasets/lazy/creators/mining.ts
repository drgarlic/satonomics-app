import {
  createAnnualizedLazyDataset,
  createCumulatedLazyDataset,
  createDividedLazyDataset,
  createLazyAverageDataset,
  createMultipliedLazyDataset,
  createSubtractedLazyDataset,
} from "./base";

export function createLazyMiningDatasets<Resources extends AnyResourceDatasets>(
  resources: Resources,
) {
  const issuanceAnnualized = createAnnualizedLazyDataset(resources.subsidy);

  return {
    issuanceAnnualized,
    yearlyInflationRate: createDividedLazyDataset(
      issuanceAnnualized,
      resources.SupplyTotal,
      true,
    ),
    supplyTotalAtMinus1Block: createSubtractedLazyDataset(
      resources.SupplyTotal,
      resources.lastSubsidy,
    ),
    newBlocks7dSMA: createLazyAverageDataset(resources.newBlocks, 7),
    newBlocks30dSMA: createLazyAverageDataset(resources.newBlocks, 30),
    blocksTotal: createCumulatedLazyDataset(resources.newBlocks),
    lastSubsidyInDollars: createMultipliedLazyDataset(
      resources.lastSubsidy,
      resources.price,
    ),
  };
}
