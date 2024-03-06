import { LineStyle } from "lightweight-charts";

import { applyMultipleSeries, colors, SeriesType } from "/src/scripts";

export const presets: PresetFolder = {
  id: "marketcaps",
  name: "Marketcaps",
  tree: [
    {
      id: "marketcaps-all",
      icon: IconTablerCircles,
      name: "All",
      title: "All Marketcaps",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "all",
              title: "Combined",
              color: colors.white,
              dataset: params.datasets.dateToCryptoMarketCap,
            },
            {
              id: "bitcoin",
              title: "Bitcoin's Market Cap.",
              color: colors.bitcoin,
              dataset: params.datasets.dateToMarketCap,
            },
            {
              id: "scamcoins",
              title: "Scamcoins' Market Cap.",
              color: colors.ethereum,
              dataset: params.datasets.dateToScamcoinsMarketCap,
            },
            {
              id: "fiatcoins",
              title: "Fiatcoins' Market Cap.",
              color: colors.dollars,
              dataset: params.datasets.dateToStablecoinsMarketCap,
            },
          ],
        });
      },
    },
    {
      id: "marketcap-bitcoin",
      icon: IconTablerCurrencyBitcoin,
      name: "Bitcoin",
      title: "Bitcoin Market Capitalization",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "bitcoin",
              title: "Bitcoin's Market Cap.",
              color: colors.bitcoin,
              seriesType: SeriesType.Area,
              dataset: params.datasets.dateToMarketCap,
            },
          ],
        });
      },
    },
    {
      id: "marketcap-scamcoins",
      icon: IconTablerPlayCard,
      name: "Scamcoins",
      title: "Scamcoins Market Capitalization",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "scams",
              title: "Scamcoins' Market Cap.",
              color: colors.ethereum,
              seriesType: SeriesType.Area,
              dataset: params.datasets.dateToScamcoinsMarketCap,
            },
          ],
        });
      },
    },
    {
      id: "marketcap-fiatcoins",
      icon: IconTablerCurrencyDollar,
      name: "Fiatcoins",
      title: "Fiatcoins Market Capitalization",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "fiat",
              title: "Fiatcoins' Market Cap.",
              color: colors.dollars,
              seriesType: SeriesType.Area,
              dataset: params.datasets.dateToStablecoinsMarketCap,
            },
          ],
        });
      },
    },
    {
      id: "fiatcoins-30d-change",
      icon: IconTablerStatusChange,
      name: "Fiatcoins Market Cap. 30 Day Change",
      title: "Fiatcoins Market Capitalization 30 Day Change",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "30d-change",
              title: "30 Day Change",
              seriesType: SeriesType.Based,
              dataset: params.datasets.dateToStablecoinsMarketCap30dChange,
            },
          ],
        });
      },
    },
  ],
};
