import {
  createBLSHBitcoinReturnsLazyDataset,
  createBLSHDollarReturnsLazyDataset,
  createDividedLazyDataset,
  createLazyAverageDataset,
  createLazyMomentumDataset,
  createLazyPercentileDataset,
  createMultipliedLazyDataset,
} from "./base";

// export const FIRST_USABLE_MEAN_RATIO_DATE = '2014-01-01'

export function appendRatioLazyDatasets<
  Key extends
    | `${AnyPossibleCohortKey}RealizedPrice`
    | `price${AverageName}MA`
    | "activePrice"
    | "vaultedPrice"
    | "trueMarketMean",
  Scale extends ResourceScale,
>({
  datasets = {},
  sourceDataset,
  price,
  key,
}: {
  datasets?: Partial<Record<`${Key}${RatioKey}`, Dataset<Scale>>>;
  key: Key;
  sourceDataset: Dataset<Scale>;
  price: Dataset<Scale, DatasetCandlestickData>;
}) {
  const ratio = createDividedLazyDataset(sourceDataset, price);

  const ratio7DMA = createLazyAverageDataset(ratio, 7);

  const ratio1YMA = createLazyAverageDataset(ratio, 365);

  const ratioMomentum = createLazyMomentumDataset(ratio, ratio7DMA, ratio1YMA);

  const ratioMomentumBLSHBitcoinReturns = createBLSHBitcoinReturnsLazyDataset({
    momentumDataset: ratioMomentum,
    price,
  });

  const ratio99p9Percentile = createLazyPercentileDataset(ratio, 99.9);

  const ratio99p5Percentile = createLazyPercentileDataset(ratio, 99.5);

  const ratio99Percentile = createLazyPercentileDataset(ratio, 99);

  const ratio1Percentile = createLazyPercentileDataset(ratio, 1);

  const ratio0p5Percentile = createLazyPercentileDataset(ratio, 0.5);

  const ratio0p1Percentile = createLazyPercentileDataset(ratio, 0.1);

  // Create an object first to be sure that we didn't forget anything
  const ratioDatasets: Record<RatioKey, Dataset<Scale>> = {
    Ratio: ratio,
    Ratio7DayMovingAverage: ratio7DMA,
    Ratio1YearMovingAverage: ratio1YMA,
    RatioMomentum: ratioMomentum,
    RatioMomentumBLSHBitcoinReturns: ratioMomentumBLSHBitcoinReturns,
    RatioMomentumBLSHDollarReturns: createBLSHDollarReturnsLazyDataset({
      bitcoinReturns: ratioMomentumBLSHBitcoinReturns,
    }),
    "Ratio99.9Percentile": ratio99p9Percentile,
    "Ratio99.5Percentile": ratio99p5Percentile,
    Ratio99Percentile: ratio99Percentile,
    Ratio1Percentile: ratio1Percentile,
    "Ratio0.5Percentile": ratio0p5Percentile,
    "Ratio0.1Percentile": ratio0p1Percentile,
    "Ratio99.9Price": createMultipliedLazyDataset(
      ratio99p9Percentile,
      sourceDataset,
    ),
    "Ratio99.5Price": createMultipliedLazyDataset(
      ratio99p5Percentile,
      sourceDataset,
    ),
    Ratio99Price: createMultipliedLazyDataset(ratio99Percentile, sourceDataset),
    Ratio1Price: createMultipliedLazyDataset(ratio1Percentile, sourceDataset),
    "Ratio0.5Price": createMultipliedLazyDataset(
      ratio0p5Percentile,
      sourceDataset,
    ),
    "Ratio0.1Price": createMultipliedLazyDataset(
      ratio0p1Percentile,
      sourceDataset,
    ),
  };

  for (const [ratioKey, value] of Object.entries(ratioDatasets)) {
    datasets[`${key}${ratioKey as RatioKey}`] = value;
  }

  return datasets as Record<`${Key}${RatioKey}`, Dataset<Scale>>;
}

// // TODO: Replace those with createDividerDataset
// export function createLazyRatioDataset(dataset: Dataset, closes: Dataset) {
//   const firstIndexWithData = createLazyMemo(() => {
//     const index = closes
//       .values()
//       ?.findIndex((close) => close.date === dataset.values()?.at(0)?.date);

//     return !index || index === -1 ? 0 : index;
//   });

//   // const firstUsableCloseIndex = createLazyMemo(
//   //   () =>
//   //     closes()?.findIndex(
//   //       (close) => close.date === USABLE_CANDLESTICKS_START_DATE,
//   //     ) || 0,
//   // )

//   // const firstCloseIndex = createLazyMemo(() =>
//   //   Math.max(firstIndexWithData(), firstUsableCloseIndex()),
//   // )

//   const usableCandlesticks = createLazyMemo(() =>
//     (closes.values() || []).slice(
//       // firstCloseIndex(),
//       firstIndexWithData(),
//       (dataset.values()?.length ?? 0) + firstIndexWithData(),
//     ),
//   );

//   const slicedValues = createLazyMemo(() =>
//     dataset.values()?.slice(
//       dataset
//         .values()!
//         .findIndex(
//           (data) => data.date === closes.values()![firstIndexWithData()].date,
//         ),
//       // .findIndex((data) => data.date === closes()![firstCloseIndex()].date),
//     ),
//   );

//   return createLazyDataset(
//     () => computeRatios(slicedValues() || [], usableCandlesticks()),
//     [dataset.sources, closes.sources],
//   );
// }

// const computeRatios = (
//   dataset: SingleValueData[],
//   closes: SingleValueData[],
// ) => {
//   if (!dataset.length || !closes.length) return [];

//   return dataset.map(({ time, date, value }, index) => {
//     const closeData = closes[index];

//     if (date !== closeData.date) {
//       console.log({ dataset, closes });
//       throw Error(`Unsynced data (${date} vs ${closeData.date})`);
//     }

//     return {
//       time,
//       date,
//       value: closeData.value / value,
//     };
//   });
// };
