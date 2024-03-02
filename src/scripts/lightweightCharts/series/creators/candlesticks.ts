import { colors } from "/src/scripts";

export const createCandlesticksSeries = (
  chart: IChartApi,
  options: PriceSeriesOptions,
): [ISeriesApi<"Candlestick">, string[]] => {
  const { inverseColors, lowerOpacity } = options;

  const upColor = lowerOpacity
    ? inverseColors
      ? colors.darkRed
      : colors.darkGreen
    : inverseColors
      ? colors.red
      : colors.green;

  const downColor = lowerOpacity
    ? inverseColors
      ? colors.darkGreen
      : colors.darkRed
    : inverseColors
      ? colors.green
      : colors.red;

  const candlestickSeries = chart.addCandlestickSeries({
    baseLineVisible: false,
    upColor,
    wickUpColor: upColor,
    downColor,
    wickDownColor: downColor,
    borderVisible: false,
    priceLineVisible: false,
    lastValueVisible: false,
    ...options.seriesOptions,
  });

  return [candlestickSeries, [upColor, downColor]];
};

export const convertCandlesticksToSingleValueDataset = (
  candlesticks?: DatedCandlestickData[] | null,
): DatedSingleValueData[] =>
  (candlesticks || []).map(({ date, time, close }) => ({
    date,
    time,
    value: close ?? 0,
  }));
