import { colors } from "/src/scripts";

export const createCandlesticksSeries = (
  chart: IChartApi,
  options: PriceSeriesOptions,
): [ISeriesApi<"Candlestick">, string[]] => {
  const { inverseColors, lowerOpacity } = options;

  const upColor = lowerOpacity
    ? inverseColors
      ? colors.darkLoss
      : colors.darkProfit
    : inverseColors
      ? colors.loss
      : colors.profit;

  const downColor = lowerOpacity
    ? inverseColors
      ? colors.darkProfit
      : colors.darkLoss
    : inverseColors
      ? colors.profit
      : colors.loss;

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
