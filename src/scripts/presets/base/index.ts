import { PriceScaleMode } from "lightweight-charts";

import {
  applyMultipleSeries,
  applyPriceSeries,
  colors,
  SeriesType,
} from "/src/scripts";

import { createAddressCountPreset } from "../addresses";
import description from "./description.md?raw";

export const presets: PresetTree = [
  // export const presets: PresetFolder = {
  // id: 'base',
  // name: 'Base',
  // list: [
  {
    id: "price-usd",
    icon: IconTablerCurrencyBitcoin,
    name: "Bitcoin Price",
    title: "Bitcoin Price In US Dollars - USD",
    applyPreset(params) {
      return applyPriceSeries(params);
    },
    description,
  },
  {
    id: "performance-usd",
    icon: IconTablerPercentage,
    name: "Bitcoin Performance",
    title: "Bitcoin Performance",
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
    name: "Bitcoin Marketcap",
    title: "Bitcoin Market Capitalization",
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
  {
    id: "realized-cap",
    icon: IconTablerInfinity,
    name: "Bitcoin Realized Cap. FOR ALL COHORT",
    title: "Bitcoin Realized Capitalization",
    applyPreset(params) {
      return applyMultipleSeries({
        ...params,
        priceScaleOptions: {
          halved: true,
          // mode: PriceScaleMode.Logarithmic,
        },
        list: [
          {
            id: "realized-cap",
            title: "Realized Cap.",
            color: colors.orange,
            dataset: params.datasets.dateToRealizedCap,
          },
        ],
      });
    },
    description,
  },
  {
    id: "realized-cap-net-change",
    icon: IconTablerInfinity,
    name: "Bitcoin Realized Cap. Net Change",
    title: "Bitcoin Realized Capitalization Net Change",
    applyPreset(params) {
      return applyMultipleSeries({
        ...params,
        priceScaleOptions: {
          halved: true,
        },
        list: [
          {
            id: "realized-cap-net-change",
            title: "Realized Cap. Net Change",
            seriesType: SeriesType.Based,
            dataset: params.datasets.dateToRealizedCapNetChange,
          },
        ],
      });
    },
    description,
  },
  {
    id: "realized-cap-net-30d-change",
    icon: IconTablerInfinity,
    name: "Bitcoin Realized Cap. Net 30D Change",
    title: "Bitcoin Realized Capitalization Net 30 Day Change",
    applyPreset(params) {
      return applyMultipleSeries({
        ...params,
        priceScaleOptions: {
          halved: true,
        },
        list: [
          {
            id: "realized-cap-net-30d-change",
            title: "Realized Cap. Net 30D Change",
            seriesType: SeriesType.Based,
            dataset: params.datasets.dateToRealizedCapNet30dChange,
          },
        ],
      });
    },
    description,
  },
];
// }
