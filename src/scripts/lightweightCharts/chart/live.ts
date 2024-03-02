import {
  chartState,
  colors,
  convertCandleToCandleColor,
  convertNormalCandleToGoldPerBitcoinCandle,
  convertNormalCandleToSatCandle,
  run,
} from "/src/scripts";

export const updateLiveCandlestick = ({
  candle,
  datasets,
}: {
  candle: DatedCandlestickData | null;
  datasets: Datasets;
}) => {
  if (!candle || !chartState.chart) return;

  // const priceMode = chartState.priceMode
  // const isInGoldMode = priceMode === 'gold'
  // const isInSatsMode = priceMode === 'sats'
  const isInSatsMode = false;

  try {
    // const candlestick = isInSatsMode
    //   ? convertNormalCandleToSatCandle(candle)
    //   : isInGoldMode
    //     ? run(() => {
    //         const goldPrice = datasets.goldPrice.values()?.at(-1)?.value

    //         return goldPrice
    //           ? convertNormalCandleToGoldPerBitcoinCandle(candle, goldPrice)
    //           : undefined
    //       })
    //     : candle

    const candlestick = candle;

    if (!candlestick) return;

    const extended = {
      ...candlestick,
      value: candlestick.close,
    };

    if (!extended.value) return;

    chartState.priceSeries?.update(extended);

    chartState.priceLine?.applyOptions({
      price: extended.value,
      color:
        chartState.priceSeries?.seriesType() === "Candlestick"
          ? convertCandleToCandleColor(extended, isInSatsMode)
          : colors.white,
    });
  } catch {}
};
