// https://github.com/tradingview/lightweight-charts/tree/master/plugin-examples/src/plugins/stacked-area-series
// Imported: 2024-02-15

import {
  CustomSeriesPricePlotValues,
  ICustomSeriesPaneView,
  PaneRendererCustomData,
  Time,
  WhitespaceData,
} from "lightweight-charts";

import { defaultOptions, StackedAreaSeriesOptions } from "./options";
import { StackedAreaSeriesRenderer } from "./renderer";

export class StackedAreaSeries<TData extends StackedAreaData>
  implements ICustomSeriesPaneView<Time, TData, StackedAreaSeriesOptions>
{
  _renderer: StackedAreaSeriesRenderer<TData>;

  constructor() {
    this._renderer = new StackedAreaSeriesRenderer();
  }

  priceValueBuilder(plotRow: TData): CustomSeriesPricePlotValues {
    return [
      0,
      plotRow.values.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      ),
    ];
  }

  isWhitespace(data: TData | WhitespaceData): data is WhitespaceData {
    return !Boolean((data as Partial<TData>).values?.length);
  }

  renderer(): StackedAreaSeriesRenderer<TData> {
    return this._renderer;
  }

  update(
    data: PaneRendererCustomData<Time, TData>,
    options: StackedAreaSeriesOptions,
  ): void {
    this._renderer.update(data, options);
  }

  defaultOptions() {
    return defaultOptions;
  }
}
