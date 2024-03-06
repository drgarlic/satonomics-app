import {
  colors,
  defaultSeriesOptions,
  showedLastValueConfig,
} from "/src/scripts";

const DEFAULT_BASELINE_TOP_COLOR = colors.profit;
const DEFAULT_BASELINE_BOTTOM_COLOR = colors.loss;

export const DEFAULT_BASELINE_COLORS = [
  DEFAULT_BASELINE_TOP_COLOR,
  DEFAULT_BASELINE_BOTTOM_COLOR,
];

export const createBaseLineSeries = (
  chart: IChartApi,
  options: BaselineSeriesOptions & {
    showPriceLine?: boolean;
  },
) => {
  const {
    title,
    color,
    topColor,
    topLineColor,
    bottomColor,
    bottomLineColor,
    base,
    lineColor,
  } = options;

  const allTopColor = topColor || color || DEFAULT_BASELINE_TOP_COLOR;
  const topFillColor = `${allTopColor}`;
  const allBottomColor = bottomColor || color || DEFAULT_BASELINE_BOTTOM_COLOR;
  const bottomFillColor = `${allBottomColor}`;

  const seriesOptions: DeepPartialBaselineOptions = {
    priceScaleId: "right",
    ...defaultSeriesOptions,
    lineWidth: 1,
    ...options,
    ...options.options,
    ...(base ? { baseValue: { type: "price", price: base } } : {}),
    topLineColor: topLineColor || lineColor || allTopColor,
    topFillColor1: topFillColor,
    topFillColor2: topFillColor,
    bottomLineColor: bottomLineColor || lineColor || allBottomColor,
    bottomFillColor1: bottomFillColor,
    bottomFillColor2: bottomFillColor,
    ...(options?.showPriceLine ? showedLastValueConfig : {}),
    title,
  };

  const series = chart.addBaselineSeries(seriesOptions);

  return series;
};
