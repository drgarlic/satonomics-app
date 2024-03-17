import { createLazyMemo } from "@solid-primitives/memo";

import { ONE_DAY_IN_MS } from "/src/scripts";
import { createASS } from "/src/solid";

import {
  _createResourceDataset,
  createAddressResources,
  createAgeResources,
  createCommonResources,
  createCurrencyResources,
  createResourceDataset,
} from "./creators";

export * from "./creators";

export const scales = ["date" as const, "height" as const];

function transform(values: FetchedCandlestickData[] | null) {
  return (values || []).map((value) => ({
    ...value,
    number: new Date(value.date).valueOf() / ONE_DAY_IN_MS,
    value: value.close,
    time: value.date,
  }));
}

export function createResourceDatasets() {
  const dateToCachedPrice = createASS<DatasetCandlestickData[] | null>(null);

  const dateToFetchedPrice = _createResourceDataset<
    "date",
    FetchedCandlestickData[],
    DatasetCandlestickData
  >({
    scale: "date",
    path: "/ohlcv",
    autoFetch: false,
    transform,
  });

  import("/src/assets/data/btcusd.json").then((candlesticks) => {
    dateToCachedPrice.set(transform(candlesticks.default));

    dateToFetchedPrice.url.searchParams.set(
      "since",
      (
        new Date(candlesticks.default.at(-1)?.date || 0).valueOf() / 1000
      ).toString(),
    );

    dateToFetchedPrice.fetch();
  });

  const dateToCandlestick = createLazyMemo(() => [
    ...(dateToCachedPrice() || []),
    ...(dateToFetchedPrice.values() || []),
  ]);

  const dateToPrice = {
    scale: "date" as const,
    values: dateToCandlestick,
    sources: dateToFetchedPrice.sources,
    url: dateToFetchedPrice.url,
  };

  const heightToPrice = {
    scale: "height" as const,
    values: () => [] as DatasetCandlestickData[],
    sources: dateToFetchedPrice.sources,
    url: dateToFetchedPrice.url,
  };

  return {
    // usdtMarketCap: createResourceHTTP(`/usdt-marketcap`),
    // usdcMarketCap: createResourceHTTP(`/usdc-marketcap`),

    // sopr: createResourceHTTP(`/sopr`),
    // terminalPrice: createResourceHTTP(`/terminal-price`),
    // balancedPrice: createResourceHTTP(`/balanced-price`),
    // cointimePrice: createResourceHTTP(`/cointime-price`),
    // cvdd: createResourceHTTP(`/cvdd`),
    // fundingRates: createResourceHTTP(`/funding-rates`),
    // vddMultiple: createResourceHTTP(`/vdd-multiple`),

    date: {
      price: dateToPrice,
      altcoinsMarketCapitalization: createResourceDataset({
        scale: "date",
        path: `/date-to-altcoins-marketcap`,
      }),
      stablecoinsMarketCapitalization: createResourceDataset({
        scale: "date",
        path: `/date-to-stablecoins-marketcap`,
      }),
      ...createCurrencyResources(),
      ...createCommonResources("date"),
      ...createAgeResources("date"),
      ...createAddressResources("date"),
    } satisfies Record<string, Dataset<"date">>,
    height: {
      price: heightToPrice,
      timestamp: createResourceDataset({
        scale: "height",
        path: `/height-to-timestamp`,
      }),
      ...createCommonResources("height"),
      ...createAgeResources("height"),
      ...createAddressResources("height"),
    } satisfies Record<string, Dataset<"height">>,
  };
}
