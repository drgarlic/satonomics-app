import {
  appendRatioLazyDatasets,
  createCumulatedLazyDataset,
  createDividedLazyDataset,
  createMedianLazyDataset,
  createMultipliedLazyDataset,
  createNetChangeLazyDataset,
  createSubtractedLazyDataset,
  createTransformedLazyDataset,
} from ".";

export function createCointimeDatasets({
  resourceDatasets,
  dateToRealizedPrice,
  dateToYearlyInflationRate,
  dateToCumulatedNetRealizedProfitAndLoss,
  dateToSupplyTotalAtMinus1Block,
  dateToTransactionVolumeAnnualized,
}: {
  resourceDatasets: ResourceDatasets;
  dateToRealizedPrice: Dataset;
  dateToYearlyInflationRate: Dataset;
  dateToTransactionVolumeAnnualized: Dataset;
  dateToSupplyTotalAtMinus1Block: Dataset;
  dateToCumulatedNetRealizedProfitAndLoss: Dataset;
}) {
  const dateToCoinblocksCreated = createMultipliedLazyDataset(
    resourceDatasets.dateToSupplyTotal,
    resourceDatasets.dateToNewBlocks,
  );

  const dateToCoinblocksStored = createSubtractedLazyDataset(
    dateToCoinblocksCreated,
    resourceDatasets.dateToCoinblocksDestroyed,
  );

  const dateToCumulatedCoinblocksCreated = createCumulatedLazyDataset(
    dateToCoinblocksCreated,
  );

  const dateToCumulatedCoinblocksDestroyed = createCumulatedLazyDataset(
    resourceDatasets.dateToCoinblocksDestroyed,
  );

  const dateToCumulatedCoinblocksStored = createCumulatedLazyDataset(
    dateToCoinblocksStored,
  );

  const dateToLiveliness = createDividedLazyDataset(
    dateToCumulatedCoinblocksDestroyed,
    dateToCumulatedCoinblocksCreated,
  );

  const dateToVaultedness = createTransformedLazyDataset(
    dateToLiveliness,
    (value) => 1 - value,
  );

  const dateToActvityToVaultednessRatio = createDividedLazyDataset(
    dateToLiveliness,
    dateToVaultedness,
  );

  const dateToConcurrentLiveliness = createDividedLazyDataset(
    resourceDatasets.dateToCoinblocksDestroyed,
    dateToCoinblocksCreated,
  );

  const dateToConcurrentLiveliness14dMedian = createMedianLazyDataset(
    dateToConcurrentLiveliness,
    14,
  );

  const dateToLivelinessIncrementalChange =
    createNetChangeLazyDataset(dateToLiveliness);

  const dateToLivelinessIncrementalChange14dMedian = createMedianLazyDataset(
    dateToLivelinessIncrementalChange,
    14,
  );

  const dateToVaultedSupply = createMultipliedLazyDataset(
    dateToVaultedness,
    resourceDatasets.dateToSupplyTotal,
  );

  const dateToVaultedSupplyNetChange =
    createNetChangeLazyDataset(dateToVaultedSupply);

  const dateToVaultedSupply90dNetChange = createNetChangeLazyDataset(
    dateToVaultedSupply,
    90,
  );

  const dateToVaultedSupplyNetChangeX365 = createTransformedLazyDataset(
    dateToVaultedSupplyNetChange,
    (value) => value * 365,
  );

  const dateToVaultingRate = createDividedLazyDataset(
    dateToVaultedSupplyNetChangeX365,
    resourceDatasets.dateToSupplyTotal,
    true,
  );

  const dateToActiveSupply = createMultipliedLazyDataset(
    dateToLiveliness,
    resourceDatasets.dateToSupplyTotal,
  );

  const dateToActiveSupplyNetChange =
    createNetChangeLazyDataset(dateToActiveSupply);

  const dateToActiveSupply90dNetChange = createNetChangeLazyDataset(
    dateToActiveSupply,
    90,
  );

  // TODO: Fix, is always 0, but it shouldn't since some coins (~35 BTC) are lost
  const dateToMinVaultedSupply = createTransformedLazyDataset(
    resourceDatasets.dateToSupplyTotal,
    (value, index) =>
      value /
      (dateToCumulatedCoinblocksCreated.values()?.at(index)?.value || 0),
  );

  const dateToMaxActiveSupply = createTransformedLazyDataset(
    resourceDatasets.dateToSupplyTotal,
    (value, index) =>
      value *
      (1 -
        value /
          (dateToCumulatedCoinblocksCreated.values()?.at(index)?.value || 0)),
  );

  const dateToCointimeAdjustedYearlyInflationRate = createMultipliedLazyDataset(
    dateToYearlyInflationRate,
    dateToActvityToVaultednessRatio,
  );

  const dateToCointimeAdjustedVelocity = createDividedLazyDataset(
    dateToTransactionVolumeAnnualized,
    dateToActiveSupply,
  );

  const dateToActiveSupplyChangeFromTransactions = createMultipliedLazyDataset(
    dateToSupplyTotalAtMinus1Block,
    dateToConcurrentLiveliness,
  );

  const dateToActiveSupplyChangeFromTransactions90dChange =
    createNetChangeLazyDataset(dateToActiveSupplyChangeFromTransactions, 90);

  const dateToActiveSupplyChangeFromIssuance = createMultipliedLazyDataset(
    resourceDatasets.dateToLastSubsidy,
    dateToLiveliness,
  );

  const dateToThermoCap = createCumulatedLazyDataset(
    resourceDatasets.dateToSubsidyInDollars,
  );

  const dateToInvestorCapitalization = createSubtractedLazyDataset(
    dateToCumulatedNetRealizedProfitAndLoss,
    dateToThermoCap,
  );

  const dateToThermoCapToInvestorCapRatio = createDividedLazyDataset(
    dateToThermoCap,
    dateToInvestorCapitalization,
    true,
  );

  const dateToActiveSupplyChangeFromIssuance90dChange =
    createNetChangeLazyDataset(dateToActiveSupplyChangeFromIssuance, 90);

  const dateToActivePrice = createDividedLazyDataset(
    dateToRealizedPrice,
    dateToLiveliness,
  );

  const dateToVaultedPrice = createDividedLazyDataset(
    dateToRealizedPrice,
    dateToVaultedness,
  );

  const dateToTrueMarketMean = createDividedLazyDataset(
    dateToInvestorCapitalization,
    dateToActiveSupply,
  );

  return {
    dateToActiveSupply,
    dateToActiveSupply90dNetChange,
    dateToActiveSupplyChangeFromIssuance,
    dateToActiveSupplyChangeFromIssuance90dChange,
    dateToActiveSupplyChangeFromTransactions,
    dateToActiveSupplyChangeFromTransactions90dChange,
    dateToActiveSupplyNetChange,
    dateToActvityToVaultednessRatio,
    dateToCoinblocksCreated,
    dateToCoinblocksStored,
    dateToCointimeAdjustedVelocity,
    dateToCointimeAdjustedYearlyInflationRate,
    dateToConcurrentLiveliness,
    dateToConcurrentLiveliness14dMedian,
    dateToCumulatedCoinblocksCreated,
    dateToCumulatedCoinblocksDestroyed,
    dateToCumulatedCoinblocksStored,
    dateToLiveliness,
    dateToLivelinessIncrementalChange,
    dateToLivelinessIncrementalChange14dMedian,
    dateToInvestorCapitalization,
    dateToMaxActiveSupply,
    dateToMinVaultedSupply,
    dateToVaultedness,
    dateToVaultedSupply,
    dateToVaultedSupply90dNetChange,
    dateToVaultedSupplyNetChange,
    dateToVaultingRate,
    dateToThermoCap,
    dateToThermoCapToInvestorCapRatio,
    dateToActivePrice,
    ...appendRatioLazyDatasets({
      sourceDataset: dateToActivePrice,
      key: "ActivePrice" as const,
      closes: resourceDatasets.closes,
    }),
    dateToVaultedPrice,
    ...appendRatioLazyDatasets({
      sourceDataset: dateToVaultedPrice,
      key: "VaultedPrice" as const,
      closes: resourceDatasets.closes,
    }),
    dateToTrueMarketMean,
    ...appendRatioLazyDatasets({
      sourceDataset: dateToTrueMarketMean,
      key: "TrueMarketMean" as const,
      closes: resourceDatasets.closes,
    }),
  };
}
