interface FullCandlestick extends DatedCandlestickData {
  volume: number;
}

type FetchedCandlestick = Omit<FullCandlestick, "time">;

interface Dated {
  date: string;
}

type DatedWhitespaceData = WhitespaceData & Dated;
type DatedSingleValueData = SingleValueData & Dated;
type DatedCandlestickData = CandlestickData & Dated;
type DatedLineData = import("lightweight-charts").LineData & Dated;
type DatedAreaData = import("lightweight-charts").AreaData & Dated;
type DatedHistogramData = import("lightweight-charts").HistogramData & Dated;

type DeepPartialLineOptions = DeepPartial<
  LineStyleOptions & SeriesOptionsCommon
>;

type DeepPartialHistogramOptions = DeepPartial<
  HistogramStyleOptions & SeriesOptionsCommon
>;

type DeepPartialBaselineOptions = DeepPartial<
  BaselineStyleOptions & SeriesOptionsCommon
>;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];
