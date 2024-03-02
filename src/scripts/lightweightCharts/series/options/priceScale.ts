export const resetRightPriceScale = (
  chart: IChartApi,
  options?: FullPriceScaleOptions,
) =>
  chart.priceScale("right").applyOptions({
    ...options,
    scaleMargins: {
      ...(options?.halved
        ? {
            top: 0.5,
            bottom: 0.01,
          }
        : {
            top: 0.1,
            bottom: 0.1,
          }),
      ...options?.scaleMargins,
    },
  });

export const resetLeftPriceScale = (
  chart: IChartApi,
  options?: FullPriceScaleOptions,
) =>
  chart.priceScale("left").applyOptions({
    visible: false,
    ...options,
    scaleMargins: {
      ...(options?.halved
        ? {
            top: 0.475,
            bottom: 0.025,
          }
        : {
            top: 0.1,
            bottom: 0.1,
          }),
      ...options?.scaleMargins,
    },
  });
