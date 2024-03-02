type LazyDatasets = ReturnType<typeof import("./index").createLazyDatasets>;

type AverageName = (typeof import("./index").averages)[number]["key"];

type RatioKey =
  | `Ratio`
  | `Ratio7DayMovingAverage`
  | `Ratio1YearMovingAverage`
  | `RatioMomentum`
  | `RatioMomentumBLSHBitcoinReturns`
  | `RatioMomentumBLSHDollarReturns`
  | `Ratio99.9Percentile`
  | `Ratio99.5Percentile`
  | `Ratio99Percentile`
  | `Ratio1Percentile`
  | `Ratio0.5Percentile`
  | `Ratio0.1Percentile`
  | `Ratio99.9Price`
  | `Ratio99.5Price`
  | `Ratio99Price`
  | `Ratio1Price`
  | `Ratio0.5Price`
  | `Ratio0.1Price`;
