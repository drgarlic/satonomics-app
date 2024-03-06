import { PriceScaleMode } from "lightweight-charts";

import {
  applyMultipleSeries,
  applyPriceSeries,
  colors,
  SeriesType,
} from "/src/scripts";

import description from "./description.md?raw";

export const presets: PresetFolder = {
  id: "currency-usd",
  name: "USD - United States Dollar",
  tree: [
    {
      id: "price-usd",
      icon: IconTablerCurrencyDollar,
      name: "Price",
      title: "Bitcoin Price In US Dollars - USD",
      applyPreset(params) {
        return applyPriceSeries(params);
      },
      description,
    },
    {
      id: "performance-usd",
      icon: IconTablerPercentage,
      name: "Performance",
      title: "Bitcoin USD Performance",
      applyPreset(params) {
        return applyPriceSeries({
          ...params,
          options: {
            id: "performance",
            title: "Performance",
            priceScaleOptions: {
              mode: PriceScaleMode.Percentage,
            },
          },
        });
      },
      description,
    },
    {
      id: "marketcap",
      icon: IconTablerInfinity,
      name: "Marketcap",
      title: "Bitcoin USD Market Capitalization",
      applyPreset(params) {
        return applyPriceSeries({
          options: {
            id: "marketcap",
            title: "Marketcap",
          },
          ...params,
          dataset: params.datasets.dateToMarketCap,
        });
      },
      description,
    },
  ],
};
