import {
  chartState,
  createChart,
  createLineSeries,
  updateWhitespaceDataset,
} from "/src/scripts";

export const whitespaceDataset: DatedWhitespaceData[] = [];

let dispose: VoidFunction | undefined = undefined;

export const renderChart = async (params: {
  preset: Preset;
  datasets: Datasets;
  liveCandle: Accessor<FullCandlestick | null>;
  legendSetter: Setter<PresetLegend>;
}) => {
  dispose?.();

  createRoot((_dispose) => {
    dispose = _dispose;

    chartState.reset = () => {
      renderChart(params);
    };

    const { preset, datasets, liveCandle, legendSetter } = params;

    if (!datasets.candlesticks.values()?.length) return;

    createChart();

    const { chart } = chartState;

    if (!chart) return;

    try {
      const whitespaceSeries = createLineSeries(chart);

      updateWhitespaceDataset(whitespaceDataset);

      whitespaceSeries.setData(whitespaceDataset.map((data) => ({ ...data })));

      console.log(`preset: ${preset.id}`);

      const legend = preset.applyPreset({
        chart,
        datasets,
        liveCandle,
        preset,
      });

      legendSetter(legend);
    } catch (error) {
      console.error("chart: render: failed", error);
    }
  });
};
