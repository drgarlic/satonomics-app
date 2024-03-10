import { computeBackEndURL, retryingFetch } from "/src/scripts";

import {
  createAgeResources,
  createBackEndResource,
  createCommonAddressResources,
  createCommonResources,
  createCurrencyResources,
  createResourceHTTP,
} from "./creators";

export * from "./creators";

export const scales = ["date" as const, "height" as const];

export const createResourcesHTTP = () => {
  return {
    candlesticks: createResourceHTTP<FetchedCandlestick[]>({
      url: computeBackEndURL("/ohlcv"),
      customFetch: retryingFetch,
    }),

    dateToAltcoinsMarketCapitalization: createBackEndResource(
      `/date-to-altcoins-marketcap`,
    ),
    dateToStablecoinsMarketCapitalization: createBackEndResource(
      `/date-to-stablecoins-marketcap`,
    ),
    heightToTimestamp: createBackEndResource(`/height-to-timestamp`),

    usdtMarketCap: createBackEndResource(`/usdt-marketcap`),
    usdcMarketCap: createBackEndResource(`/usdc-marketcap`),

    sopr: createBackEndResource(`/sopr`),
    terminalPrice: createBackEndResource(`/terminal-price`),
    balancedPrice: createBackEndResource(`/balanced-price`),
    cointimePrice: createBackEndResource(`/cointime-price`),
    cvdd: createBackEndResource(`/cvdd`),
    fundingRates: createBackEndResource(`/funding-rates`),
    vddMultiple: createBackEndResource(`/vdd-multiple`),

    ...createCurrencyResources(),
    ...createCommonResources(),
    ...createAgeResources(),
    ...createCommonAddressResources(),
  };
};
