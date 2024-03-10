import {
  createAddressesDatasets,
  createAnyPossibleCohortLazyDatasets,
  createClosesAveragesDatasets,
  createCointimeDatasets,
  createLazyFiatDatasets,
  createLazyMarketCapDatasets,
  createLazyMiningDatasets,
  createTransactionsDatasets,
  createTransformedLazyDataset,
} from "./creators";

export * from "./creators";
export * from "./converters";

export const createLazyDatasets = (resourceDatasets: ResourceDatasets) => {
  // const satsPrice = createLazyDataset(
  //   createLazyMemo(() =>
  //     (candlesticks.values() || [])
  //       .map(convertNormalCandleToSatCandle)
  //       .filter(
  //         ({ open, high, low, close }) =>
  //           open !== Infinity &&
  //           high !== Infinity &&
  //           low !== Infinity &&
  //           close !== Infinity,
  //       ),
  //   ),
  //   [candlesticks.sources],
  // );

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

  const dateTo50 = createTransformedLazyDataset(
    resourceDatasets.closes,
    () => 50,
  );
  const dateTo100 = createTransformedLazyDataset(
    resourceDatasets.closes,
    () => 100,
  );
  const dateTo144 = createTransformedLazyDataset(
    resourceDatasets.closes,
    () => 144,
  );

  const marketCapDatasets = createLazyMarketCapDatasets({
    resourceDatasets,
  });

  const anyPossibleCohortLazyDatasets = createAnyPossibleCohortLazyDatasets(
    resourceDatasets,
    {
      dateToMarketCap: marketCapDatasets.dateToMarketCapitalization,
    },
  );

  const transactionsDatasets = createTransactionsDatasets({ resourceDatasets });

  const miningDatasets = createLazyMiningDatasets({
    resourceDatasets,
  });

  return {
    dateTo50,
    dateTo100,
    dateTo144,

    ...transactionsDatasets,
    ...anyPossibleCohortLazyDatasets,
    ...marketCapDatasets,
    ...miningDatasets,

    ...createAddressesDatasets({ resourceDatasets }),

    ...createClosesAveragesDatasets({ resourceDatasets }),

    ...createLazyFiatDatasets({
      resourceDatasets,
    }),

    ...createCointimeDatasets({
      resourceDatasets,
      dateToCumulatedNetRealizedProfitAndLoss:
        anyPossibleCohortLazyDatasets.dateToCumulatedNetRealizedProfitAndLoss,
      dateToRealizedPrice: anyPossibleCohortLazyDatasets.dateToRealizedPrice,
      dateToSupplyTotalAtMinus1Block:
        miningDatasets.dateToSupplyTotalAtMinus1Block,
      dateToYearlyInflationRate: miningDatasets.dateToYearlyInflationRate,
      dateToTransactionVolumeAnnualized:
        transactionsDatasets.dateToTransactionVolumeAnnualized,
    }),
    // satsPrice,
    // satsPriceCloses: createLazyDataset(() =>
    //   convertCandlesticksToSingleValueDataset(satsPrice.values()),
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
  };
};
