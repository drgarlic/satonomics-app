import { createLazyMemo } from "@solid-primitives/memo";

import { computeMovingAverage } from "/src/scripts";

import { convertNormalCandleToSatCandle } from "./converters";
import {
  appendRatioLazyDatasets,
  createAnnualizedLazyDataset,
  createAnyPossibleCohortLazyDatasets,
  createCumulatedLazyDataset,
  createDividedLazyDataset,
  createLazyDataset,
  createMedianLazyDataset,
  createMultipliedLazyDataset,
  createNetChangeLazyDataset,
  createSubtractedLazyDataset,
  createTransformedLazyDataset,
} from "./creators";

export * from "./creators";
export * from "./converters";

// export const USABLE_CANDLESTICKS_START_DATE = '2012-01-01'

export enum Momentum {
  red = 1,
  yellow = 2,
  green = 3,
}

export const averages = [
  { name: "7 Day", key: "7D" as const, days: 7 },
  { name: "30 Day", key: "30D" as const, days: 30 },
  { name: "111 Day", key: "111D" as const, days: 111 },
  { name: "200 Day", key: "200D" as const, days: 200 },
  { name: "1 Year", key: "1Y" as const, days: 365 },
  { name: "2 Year", key: "2Y" as const, days: 730 },
  { name: "4 Year", key: "4Y" as const, days: 1460 },
] as const;

export const createLazyDatasets = (resourceDatasets: ResourceDatasets) => {
  const { candlesticks, closes } = resourceDatasets;

  const satsPrice = createLazyDataset(
    createLazyMemo(() =>
      (candlesticks.values() || [])
        .map(convertNormalCandleToSatCandle)
        .filter(
          ({ open, high, low, close }) =>
            open !== Infinity &&
            high !== Infinity &&
            low !== Infinity &&
            close !== Infinity,
        ),
    ),
  );

  // It's not great for sure but at least it's trivial for the TS server
  type AverageDatasets = Record<
    `dateToCloses${AverageName}MA` | `dateToCloses${AverageName}MA${RatioKey}`,
    Dataset
  >;
  let partialAveragesDatasets: Partial<AverageDatasets> = {};
  averages.forEach(({ key: averageName, days }) => {
    const averageDataset = createLazyDataset(() =>
      computeMovingAverage(closes.values(), days),
    );
    const key: `Closes${AverageName}MA` = `Closes${averageName}MA`;
    partialAveragesDatasets[`dateTo${key}` as const] = averageDataset;
    appendRatioLazyDatasets<typeof key>({
      datasets: partialAveragesDatasets,
      sourceDataset: averageDataset,
      key,
      closes,
    });
  });
  const averagesDatasets = partialAveragesDatasets as AverageDatasets;

  // const minersRevenueInDollars = addAverages(
  //   createLazyDataset(() =>
  //     (resourceDatasets.minersRevenueInBitcoin.values() || []).map(
  //       ({ date, time, value }) => ({
  //         date,
  //         time,
  //         value: value * (closesRecord.values()?.[date] || 1),
  //       }),
  //     ),
  //   ),
  // )

  // const localExtremes = createExtremeQuantilesDataset(() => [
  //   resourceDatasets.oneMonthRealizedPrice.quantiles,
  //   resourceDatasets.threeMonthsRealizedPrice.quantiles,
  //   resourceDatasets.sthRealizedPrice.quantiles,
  //   resourceDatasets.sixMonthsRealizedPrice.quantiles,
  //   closes30DMA.quantiles,
  //   closes7DMA.quantiles,
  // ])

  // const cycleExtremes = createExtremeQuantilesDataset(() => [
  //   resourceDatasets.oneYearRealizedPrice.quantiles,
  //   resourceDatasets.realizedPrice.quantiles,
  //   resourceDatasets.twoYearsRealizedPrice.quantiles,
  //   resourceDatasets.lthRealizedPrice.quantiles,
  //   resourceDatasets.planktonRealizedPrice.quantiles,
  //   resourceDatasets.shrimpsRealizedPrice.quantiles,
  //   resourceDatasets.crabsRealizedPrice.quantiles,
  //   resourceDatasets.fishRealizedPrice.quantiles,
  //   resourceDatasets.sharksRealizedPrice.quantiles,
  //   resourceDatasets.whalesRealizedPrice.quantiles,
  //   resourceDatasets.humpbacksRealizedPrice.quantiles,
  //   resourceDatasets.balancedPrice.quantiles,
  //   resourceDatasets.trueMeanPrice.quantiles,
  //   resourceDatasets.cointimePrice.quantiles,
  //   resourceDatasets.vaultedPrice.quantiles,
  //   resourceDatasets.cvdd.quantiles,
  //   closes365DMA.quantiles,
  //   resourceDatasets.terminalPrice.quantiles,
  // ])

  const dateToMarketCap = createMultipliedLazyDataset(
    resourceDatasets.dateToSupplyTotal,
    closes,
  );

  const dateTo50 = createTransformedLazyDataset(closes, () => 50);

  const dateTo100 = createTransformedLazyDataset(closes, () => 100);

  const anyPossibleCohortLazyDatasets = createAnyPossibleCohortLazyDatasets(
    resourceDatasets,
    {
      dateToMarketCap,
    },
  );

  const dateToTotalNonEmptyAddresses = createSubtractedLazyDataset(
    resourceDatasets.dateToTotalAddressesCreated,
    resourceDatasets.dateToTotalEmptyAddresses,
  );

  const dateToNewAddressCount = createNetChangeLazyDataset(
    resourceDatasets.dateToTotalAddressesCreated,
  );

  const dateToCoinblocksCreated = createMultipliedLazyDataset(
    resourceDatasets.dateToSupplyTotal,
    resourceDatasets.dateToDailyBlockCount,
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

  const dateToIssuanceAnnualized = createAnnualizedLazyDataset(
    resourceDatasets.dateToSubsidy,
  );

  const dateToYearlyInflationRate = createDividedLazyDataset(
    dateToIssuanceAnnualized,
    resourceDatasets.dateToSupplyTotal,
    true,
  );

  const dateToCointimeAdjustedYearlyInflationRate = createMultipliedLazyDataset(
    dateToYearlyInflationRate,
    dateToActvityToVaultednessRatio,
  );

  const dateToRealizedCap = createSubtractedLazyDataset(
    anyPossibleCohortLazyDatasets.dateToCumulatedRealizedProfit,
    anyPossibleCohortLazyDatasets.dateToCumulatedRealizedLoss,
  );

  const dateToRealizedCapNetChange =
    createNetChangeLazyDataset(dateToRealizedCap);

  const dateToRealizedCapNet30dChange = createNetChangeLazyDataset(
    dateToRealizedCap,
    30,
  );

  const dateToTransactionVolumeAnnualized = createAnnualizedLazyDataset(
    resourceDatasets.dateToTransactionVolume,
  );

  const dateToTransactionsVelocity = createDividedLazyDataset(
    dateToTransactionVolumeAnnualized,
    resourceDatasets.dateToSupplyTotal,
  );

  const dateToCointimeAdjustedVelocity = createDividedLazyDataset(
    dateToTransactionVolumeAnnualized,
    dateToActiveSupply,
  );

  const dateToSupplyTotalAtMinus1Block = createSubtractedLazyDataset(
    resourceDatasets.dateToSupplyTotal,
    resourceDatasets.dateToLastSubsidy,
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

  const dateToInvestorCap = createSubtractedLazyDataset(
    dateToRealizedCap,
    dateToThermoCap,
  );

  const dateToThermoCapToInvestorCapRatio = createDividedLazyDataset(
    dateToThermoCap,
    dateToInvestorCap,
    true,
  );

  const dateToActiveSupplyChangeFromIssuance90dChange =
    createNetChangeLazyDataset(dateToActiveSupplyChangeFromIssuance, 90);

  const dateToActivePrice = createDividedLazyDataset(
    resourceDatasets.dateToPricePaidMean,
    dateToLiveliness,
  );

  const dateToVaultedPrice = createDividedLazyDataset(
    resourceDatasets.dateToPricePaidMean,
    dateToVaultedness,
  );

  const dateToTrueMarketMean = createDividedLazyDataset(
    dateToInvestorCap,
    dateToActiveSupply,
  );

  return {
    dateTo50,
    dateTo100,
    ...averagesDatasets,
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
    dateToMarketCap,
    dateToInvestorCap,
    dateToMaxActiveSupply,
    dateToMinVaultedSupply,
    dateToNewAddressCount,
    dateToRealizedCap,
    dateToRealizedCapNet30dChange,
    dateToRealizedCapNetChange,
    dateToSupplyTotalAtMinus1Block,
    dateToTotalAddressCount: dateToTotalNonEmptyAddresses,
    dateToTransactionsVelocity,
    dateToTransactionVolumeAnnualized,
    dateToVaultedness,
    dateToVaultedSupply,
    dateToVaultedSupply90dNetChange,
    dateToVaultedSupplyNetChange,
    dateToVaultingRate,
    dateToYearlyInflationRate,
    dateToThermoCap,
    dateToThermoCapToInvestorCapRatio,
    dateToActivePrice,
    ...appendRatioLazyDatasets({
      sourceDataset: dateToActivePrice,
      key: "ActivePrice" as const,
      closes,
    }),
    dateToVaultedPrice,
    ...appendRatioLazyDatasets({
      sourceDataset: dateToVaultedPrice,
      key: "VaultedPrice" as const,
      closes,
    }),
    dateToTrueMarketMean,
    ...appendRatioLazyDatasets({
      sourceDataset: dateToTrueMarketMean,
      key: "TrueMarketMean" as const,
      closes,
    }),
    // satsPrice,
    // satsPriceCloses: createLazyDataset(() =>
    //   convertCandlesticksToSingleValueDataset(satsPrice.values()),
    // ),
    // activeRealizedPrice: addQuantiles(
    //   addRatios(
    //     createLazyDataset(() => {
    //       let realizedPrice = resourceDatasets.realizedPrice.values()

    //       let liveliness = resourceDatasets.liveliness.values()

    //       const firstRealizedPriceDate = realizedPrice?.[0]?.date
    //       const firstLivelinessDate = liveliness?.[0]?.date

    //       if (
    //         !realizedPrice ||
    //         !liveliness ||
    //         !firstRealizedPriceDate ||
    //         !firstLivelinessDate
    //       )
    //         return []

    //       const realizedOffset = run(() => {
    //         const offset = realizedPrice?.findIndex(
    //           ({ date }) => date === firstLivelinessDate,
    //         )
    //         return offset === -1 ? 0 : offset
    //       })

    //       const livelinessOffset = run(() => {
    //         const offset = liveliness?.findIndex(
    //           ({ date }) => date === firstRealizedPriceDate,
    //         )
    //         return offset === -1 ? 0 : offset
    //       })

    //       return liveliness
    //         .slice(livelinessOffset)
    //         .map(({ date, value }, index) => ({
    //           date,
    //           time: date,
    //           value:
    //             (realizedPrice?.slice(realizedOffset)?.at(index)?.value || 1) /
    //             value,
    //         }))
    //     }),
    //     closes.values,
    //   ),
    // ),
    // hashPrice: addAverages(
    //   createLazyDataset(() => {
    //     const hashRate = resourceDatasets.hashRate.values() || []

    //     const minersRevenue = minersRevenueInDollars.values() || []
    //     const firstMinersRevenue = minersRevenue.at(0)

    //     if (!minersRevenue.length || !hashRate.length || !firstMinersRevenue)
    //       return []

    //     let offset = hashRate.findIndex(
    //       ({ date }) => date === firstMinersRevenue.date,
    //     )

    //     return minersRevenue.map(({ date, time, value }, index) => {
    //       const hashDate = hashRate.at(index + offset)?.date

    //       // TODO: Fill data on backend's side
    //       if (date !== hashDate) {
    //         offset += Math.ceil(
    //           (new Date(date).getTime() - new Date(hashDate || '').getTime()) /
    //             ONE_DAY_IN_MS,
    //         )
    //       }

    //       return {
    //         date,
    //         time,
    //         value: value / (hashRate.at(index + offset)?.value || 0),
    //       }
    //     })
    //   }),
    // ),
    // minersRevenueInDollars,
    // puellMultiple: addAverages(
    //   createLazyDataset(() => {
    //     const dailyDataset = minersRevenueInDollars.values() || []

    //     const yearlyDataset = computeYearlyMovingAverage(dailyDataset)

    //     return dailyDataset.map(({ date, time, value }, index) => {
    //       const yearlyValue = yearlyDataset[index].value

    //       return {
    //         date,
    //         time,
    //         value: value / yearlyValue,
    //       }
    //     })
    //   }),
    // ),
    ...anyPossibleCohortLazyDatasets,
  };
};
