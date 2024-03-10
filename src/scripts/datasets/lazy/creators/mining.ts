import {
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
} from "/src/scripts";

import {
  createAnnualizedLazyDataset,
  createCumulatedLazyDataset,
  createDividedLazyDataset,
  createLazyDataset,
  createMultipliedLazyDataset,
  createSubtractedLazyDataset,
} from "./base";

export function createLazyMiningDatasets({
  resourceDatasets,
}: {
  resourceDatasets: ResourceDatasets;
}) {
  const dateToIssuanceAnnualized = createAnnualizedLazyDataset(
    resourceDatasets.dateToSubsidy,
  );

  const dateToYearlyInflationRate = createDividedLazyDataset(
    dateToIssuanceAnnualized,
    resourceDatasets.dateToSupplyTotal,
    true,
  );

  const dateToSupplyTotalAtMinus1Block = createSubtractedLazyDataset(
    resourceDatasets.dateToSupplyTotal,
    resourceDatasets.dateToLastSubsidy,
  );

  const dateToNewBlocks7dSMA = createLazyDataset(
    () => computeWeeklyMovingAverage(resourceDatasets.dateToNewBlocks.values()),
    [resourceDatasets.dateToNewBlocks.sources],
  );

  const dateToNewBlocks30dSMA = createLazyDataset(
    () =>
      computeMonthlyMovingAverage(resourceDatasets.dateToNewBlocks.values()),
    [resourceDatasets.dateToNewBlocks.sources],
  );

  const dateToBlocksTotal = createCumulatedLazyDataset(
    resourceDatasets.dateToNewBlocks,
  );

  const dateToLastSubsidyInDollars = createMultipliedLazyDataset(
    resourceDatasets.dateToLastSubsidy,
    resourceDatasets.closes,
  );

  return {
    dateToSupplyTotalAtMinus1Block,
    dateToYearlyInflationRate,
    dateToNewBlocks7dSMA,
    dateToNewBlocks30dSMA,
    dateToLastSubsidyInDollars,
    dateToBlocksTotal,
  };
}
