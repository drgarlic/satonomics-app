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

export function createCointimeDatasets<
  Resources extends AnyResourceDatasets,
  Scale extends ResourceScale = Resources extends DateResourceDatasets
    ? "date"
    : "height",
>({
  resources,
  realizedPrice,
  yearlyInflationRate,
  cumulatedNetRealizedProfitAndLoss,
  supplyTotalAtMinus1Block,
  transactionVolumeAnnualized,
}: {
  resources: Resources;
  realizedPrice: Dataset<Scale>;
  yearlyInflationRate: Dataset<Scale>;
  transactionVolumeAnnualized: Dataset<Scale>;
  supplyTotalAtMinus1Block: Dataset<Scale>;
  cumulatedNetRealizedProfitAndLoss: Dataset<Scale>;
}) {
  const coinblocksCreated = createMultipliedLazyDataset(
    resources.SupplyTotal,
    resources.newBlocks,
  );

  const coinblocksStored = createSubtractedLazyDataset(
    coinblocksCreated,
    resources.coinblocksDestroyed,
  );

  const cumulatedCoinblocksCreated =
    createCumulatedLazyDataset(coinblocksCreated);

  const cumulatedCoinblocksDestroyed = createCumulatedLazyDataset(
    resources.coinblocksDestroyed,
  );

  const cumulatedCoinblocksStored =
    createCumulatedLazyDataset(coinblocksStored);

  const liveliness = createDividedLazyDataset(
    cumulatedCoinblocksDestroyed,
    cumulatedCoinblocksCreated,
  );

  const vaultedness = createTransformedLazyDataset(
    liveliness,
    (value) => 1 - value,
  );

  const actvityToVaultednessRatio = createDividedLazyDataset(
    liveliness,
    vaultedness,
  );

  const concurrentLiveliness = createDividedLazyDataset(
    resources.coinblocksDestroyed,
    coinblocksCreated,
  );

  const concurrentLiveliness14dMedian = createMedianLazyDataset(
    concurrentLiveliness,
    14,
  );

  const livelinessIncrementalChange = createNetChangeLazyDataset(liveliness);

  const livelinessIncrementalChange14dMedian = createMedianLazyDataset(
    livelinessIncrementalChange,
    14,
  );

  const vaultedSupply = createMultipliedLazyDataset(
    vaultedness,
    resources.SupplyTotal,
  );

  const vaultedSupplyNetChange = createNetChangeLazyDataset(vaultedSupply);

  const vaultedSupply90dNetChange = createNetChangeLazyDataset(
    vaultedSupply,
    90,
  );

  const vaultedSupplyNetChangeX365 = createTransformedLazyDataset(
    vaultedSupplyNetChange,
    (value) => value * 365,
  );

  const vaultingRate = createDividedLazyDataset(
    vaultedSupplyNetChangeX365,
    resources.SupplyTotal,
    true,
  );

  const activeSupply = createMultipliedLazyDataset(
    liveliness,
    resources.SupplyTotal,
  );

  const activeSupplyNetChange = createNetChangeLazyDataset(activeSupply);

  const activeSupply90dNetChange = createNetChangeLazyDataset(activeSupply, 90);

  // TODO: Fix, is always 0, but it shouldn't since some coins (~35 BTC) are lost
  const dateToMinVaultedSupply = createTransformedLazyDataset(
    resources.SupplyTotal,
    (value, index) =>
      value / (cumulatedCoinblocksCreated.values()?.at(index)?.value || 0),
  );

  const dateToMaxActiveSupply = createTransformedLazyDataset(
    resources.SupplyTotal,
    (value, index) =>
      value *
      (1 -
        value / (cumulatedCoinblocksCreated.values()?.at(index)?.value || 0)),
  );

  const cointimeAdjustedYearlyInflationRate = createMultipliedLazyDataset(
    yearlyInflationRate,
    actvityToVaultednessRatio,
  );

  const cointimeAdjustedVelocity = createDividedLazyDataset(
    transactionVolumeAnnualized,
    activeSupply,
  );

  const activeSupplyChangeFromTransactions = createMultipliedLazyDataset(
    supplyTotalAtMinus1Block,
    concurrentLiveliness,
  );

  const activeSupplyChangeFromTransactions90dChange =
    createNetChangeLazyDataset(activeSupplyChangeFromTransactions, 90);

  const activeSupplyChangeFromIssuance = createMultipliedLazyDataset(
    resources.lastSubsidy,
    liveliness,
  );

  const thermoCap = createCumulatedLazyDataset(resources.subsidyInDollars);

  const investorCapitalization = createSubtractedLazyDataset(
    cumulatedNetRealizedProfitAndLoss,
    thermoCap,
  );

  const thermoCapToInvestorCapRatio = createDividedLazyDataset(
    thermoCap,
    investorCapitalization,
    true,
  );

  const activeSupplyChangeFromIssuance90dChange = createNetChangeLazyDataset(
    activeSupplyChangeFromIssuance,
    90,
  );

  const activePrice = createDividedLazyDataset(realizedPrice, liveliness);

  const vaultedPrice = createDividedLazyDataset(realizedPrice, vaultedness);

  const trueMarketMean = createDividedLazyDataset(
    investorCapitalization,
    activeSupply,
  );

  return {
    activeSupply,
    activeSupply90dNetChange,
    activeSupplyChangeFromIssuance,
    activeSupplyChangeFromIssuance90dChange,
    activeSupplyChangeFromTransactions,
    activeSupplyChangeFromTransactions90dChange,
    activeSupplyNetChange,
    actvityToVaultednessRatio,
    coinblocksCreated,
    coinblocksStored,
    cointimeAdjustedVelocity,
    cointimeAdjustedYearlyInflationRate,
    concurrentLiveliness,
    concurrentLiveliness14dMedian,
    cumulatedCoinblocksCreated,
    cumulatedCoinblocksDestroyed,
    cumulatedCoinblocksStored,
    liveliness,
    livelinessIncrementalChange,
    livelinessIncrementalChange14dMedian,
    investorCapitalization,
    dateToMaxActiveSupply,
    dateToMinVaultedSupply,
    vaultedness,
    vaultedSupply,
    vaultedSupply90dNetChange,
    vaultedSupplyNetChange,
    vaultingRate,
    thermoCap,
    thermoCapToInvestorCapRatio,
    activePrice,
    ...appendRatioLazyDatasets({
      sourceDataset: activePrice,
      key: "activePrice" as const,
      price: resources.price,
    }),
    vaultedPrice,
    ...appendRatioLazyDatasets({
      sourceDataset: vaultedPrice,
      key: "vaultedPrice" as const,
      price: resources.price,
    }),
    trueMarketMean,
    ...appendRatioLazyDatasets({
      sourceDataset: trueMarketMean,
      key: "trueMarketMean" as const,
      price: resources.price,
    }),
  };
}
