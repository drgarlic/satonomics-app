import { LineStyle } from "lightweight-charts";

import {
  applyPriceSeries,
  createAreaSeries,
  createBaseLineSeries,
  createHistogramSeries,
  createLineSeries,
  createSeriesLegend,
  DEFAULT_BASELINE_COLORS,
  resetRightPriceScale,
  StackedAreaSeries,
} from "/src/scripts";

export enum SeriesType {
  Normal,
  Stacked,
  Based,
  Area,
  Histogram,
}

export const applyMultipleSeries = ({
  chart,
  list,
  liveCandle,
  preset,
  priceScaleOptions,
  datasets,
}: {
  chart: IChartApi;
  preset: Preset;
  priceScaleOptions?: FullPriceScaleOptions;
  liveCandle?: Accessor<FullCandlestick | null>;
  list: (
    | {
        id: string;
        dataset: Dataset;
        color?: string;
        colors?: undefined;
        seriesType: SeriesType.Based;
        showPriceLine?: boolean;
        title: string;
        options?: BaselineSeriesOptions;
        priceLine?: {
          value: number;
          color: string;
        };
      }
    | {
        id: string;
        dataset: Dataset;
        color: string;
        seriesType: SeriesType.Stacked;
        title: string;
        options?: BaselineSeriesOptions;
        priceLine?: {
          value: number;
          color: string;
        };
      }
    | {
        id: string;
        dataset: Dataset;
        color?: string;
        colors?: string[];
        showPriceLine?: boolean;
        seriesType: SeriesType.Histogram;
        title: string;
        options?: DeepPartialHistogramOptions;
        priceLine?: undefined;
      }
    | {
        id: string;
        dataset: Dataset;
        color: string;
        colors?: undefined;
        showPriceLine?: boolean;
        seriesType?: SeriesType.Normal | SeriesType.Area;
        title: string;
        options?: DeepPartialLineOptions;
        priceLine?: {
          value: number;
          color: string;
        };
      }
  )[];
  datasets: Datasets;
}): PresetLegend => {
  const { halved } = priceScaleOptions || {};

  const legend: PresetLegend = [];

  const isAnyBased = list.find(
    (config) => config.seriesType === SeriesType.Based,
  );

  const isAnyStacked = list.find(
    (config) => config.seriesType === SeriesType.Stacked,
  );

  resetRightPriceScale(chart, {
    ...priceScaleOptions,
    ...(isAnyBased
      ? {
          scaleMargins: {
            bottom: 0.05,
          },
        }
      : {}),
    ...(isAnyStacked
      ? {
          scaleMargins: {
            bottom: 0,
          },
        }
      : {}),
  });

  const stacked = list.flatMap((config) =>
    config.seriesType === SeriesType.Stacked ? [config] : [],
  );

  if (stacked.length) {
    const series = chart.addCustomSeries(new StackedAreaSeries(), {
      colors: stacked.map(({ color }) => ({
        line: color,
        area: `${color}11`,
      })),
      lineWidth: 1.5,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    stacked.forEach(({ title, color, id }) => {
      legend.push(
        createSeriesLegend({
          title,
          presetId: preset.id,
          color: () => color,
          series,
          id,
        }),
      );
    });

    createEffect(() =>
      series.setData(
        (stacked.at(0)?.dataset.values() || []).map(({ date }, index) => ({
          time: date,
          values: stacked.map(
            ({ dataset }) => dataset.values()?.at(index)?.value,
          ),
        })),
      ),
    );
  }

  list
    .flatMap((config) =>
      config.seriesType !== SeriesType.Stacked ? [config] : [],
    )
    .forEach(
      ({
        id,
        dataset,
        color,
        colors,
        seriesType: type,
        showPriceLine: _showPriceLine,
        title,
        options,
        priceLine,
      }) => {
        let series: ISeriesApi<"Baseline" | "Line" | "Area" | "Histogram">;

        const showPriceLine = halved && (_showPriceLine || list.length === 1);

        if (type === SeriesType.Based) {
          series = createBaseLineSeries(chart, {
            color,
            showPriceLine,
            ...options,
          });
        } else if (type === SeriesType.Area) {
          series = createAreaSeries(chart, {
            color,
            showPriceLine,
            ...options,
          });
        } else if (type === SeriesType.Histogram) {
          series = createHistogramSeries(chart, {
            color,
            ...options,
          });
        } else {
          series = createLineSeries(chart, {
            color,
            showPriceLine,
            ...options,
          });
        }

        if (priceLine) {
          series.createPriceLine({
            price: priceLine.value,
            lineStyle: LineStyle.Solid,
            axisLabelVisible: false,
            ...priceLine,
          });
        }

        legend.push(
          createSeriesLegend({
            id,
            presetId: preset.id,
            title,
            series,
            color: () => colors || color || DEFAULT_BASELINE_COLORS,
          }),
        );

        createEffect(() => series.setData(dataset?.values() || []));
      },
    );

  const priceLegend = applyPriceSeries({
    chart,
    datasets,
    liveCandle,
    preset,
    options: {
      halved,
    },
  });

  return [...priceLegend, ...legend.reverse()];
};
