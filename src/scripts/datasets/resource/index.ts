import { createLazyMemo } from "@solid-primitives/memo";

import { convertCandlesticksToSingleValueDataset } from "/src/scripts";
import { createASS } from "/src/solid";

import { createLazyDataset } from "../lazy";
import { createResourceDataset } from "./creators";

export function createResourceDatasets(resources: ResourcesHTTP) {
  const cachedCandlesticks = createASS<FetchedCandlestick[] | null>(null);
  import("/src/assets/data/btcusd.json").then((candlesticks) => {
    cachedCandlesticks.set(candlesticks.default);

    resources.candlesticks.url.searchParams.set(
      "since",
      (
        new Date(candlesticks.default.at(-1)?.date || 0).valueOf() / 1000
      ).toString(),
    );

    resources.candlesticks.fetch();
  });

  const candlestickValues = createLazyMemo(() =>
    [
      ...(cachedCandlesticks() || []),
      ...(resources.candlesticks.values() || []),
    ].map(
      (candle): FullCandlestick => ({
        ...candle,
        time: candle.date,
      }),
    ),
  );

  const candlesticks = createResourceDataset({
    fetch: resources.candlesticks.fetch,
    values: candlestickValues,
  });

  const closes = createLazyDataset(() =>
    convertCandlesticksToSingleValueDataset(candlesticks.values()),
  );

  const closesRecord = createLazyDataset(
    createLazyMemo(() =>
      (closes.values() || []).reduce(
        (obj, { date, value }) => {
          obj[date] = value;
          return obj;
        },
        {} as Record<string, number>,
      ),
    ),
  );

  const partialDatasets = {
    candlesticks,
    closes,
    closesRecord,
    // fundingRates: createResourceDataset({
    //   fetch: resources.fundingRates.fetch,
    //   values: createLazyMemo(() =>
    //     (resources.fundingRates.values() || []).map(
    //       ({ date, time, value }) => ({
    //         date,
    //         time,
    //         value: value * 100,
    //         color: value >= 0 ? colors.green : colors.red,
    //       }),
    //     ),
    //   ),
    // }),
    // vddMultiple: createResourceDataset({
    //   fetch: resources.vddMultiple.fetch,
    //   values: createLazyMemo(() =>
    //     (resources.vddMultiple.values() || []).map(({ date, time, value }) => {
    //       const color =
    //         value >= 3 ? colors.red : value >= 1 ? colors.orange : colors.green;

    //       return {
    //         date,
    //         time,
    //         value: value * 100,
    //         color: color,
    //       };
    //     }),
    //   ),
    // }),
  };

  type PartialKeys = keyof typeof partialDatasets;
  type MissingKeys = Exclude<ResourcesHTTPKeys, PartialKeys>;
  type PartialDatasets = typeof partialDatasets &
    Partial<Record<MissingKeys, Dataset>>;

  for (const resource in resources) {
    if (!(resource in partialDatasets)) {
      const _resource = resource as MissingKeys;
      const _partialDatasets = partialDatasets as PartialDatasets;
      const dataset = createResourceDataset(resources[_resource]);
      _partialDatasets[_resource] = dataset;
    }
  }

  const datasets = partialDatasets as typeof partialDatasets &
    Record<MissingKeys, Dataset>;

  return datasets;
}
