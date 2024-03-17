import {
  chartState,
  createChart,
  createLineSeries,
  updateWhitespaceDataset,
} from "/src/scripts";

export const whitespaceDataset: (WhitespaceData & Numbered)[] = [];

let dispose: VoidFunction | undefined = undefined;

export const renderChart = async (params: {
  datasets: Datasets;
  liveCandle: Accessor<DatasetCandlestickData | null>;
  legendSetter: Setter<PresetLegend>;
  preset: Preset;
  presets: Presets;
}) => {
  dispose?.();

  createRoot((_dispose) => {
    dispose = _dispose;

    chartState.reset = () => {
      renderChart(params);
    };

    const { datasets, liveCandle, legendSetter, presets, preset } = params;

    if (!datasets.date.price.values()?.length) return;

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
        presets,
      });

      legendSetter(legend);
    } catch (error) {
      console.error("chart: render: failed", error);
    }
  });
};
