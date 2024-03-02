import { PriceScaleMode } from "lightweight-charts";

import { applyMultipleSeries, colors } from "/src/scripts";

// export const presets: PresetTree = [
export const presets: PresetFolder = {
  id: "miners",
  name: "Miners",
  tree: [
    {
      id: "daily-block-count",
      icon: IconTablerCube,
      name: "Daily Block Count",
      title: "Daily Block Count VS. Target",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "daily-block-count",
              title: "Daily Block Count",
              color: colors.orange,
              dataset: params.datasets.dateToDailyBlockCount,
              priceLine: {
                value: 144,
                color: colors.white,
              },
            },
          ],
        });
      },
    },
    {
      id: "yearly-inflation-rate",
      icon: IconTablerBuildingFactory,
      name: "Yearly Inflation Rate",
      title: "Yearly Inflation Rate (%)",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
            mode: PriceScaleMode.Logarithmic,
          },
          list: [
            {
              id: "yearly-inflation-rate",
              title: "Yearly Inflation Rate (%)",
              color: colors.orange,
              dataset: params.datasets.dateToYearlyInflationRate,
            },
          ],
        });
      },
    },
    {
      id: "subsidy",
      icon: IconTablerMoneybag,
      name: "Subsidy",
      title: "Daily Subsidy",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "subsidy",
              title: "Subsidy",
              color: colors.bitcoin,
              dataset: params.datasets.dateToSubsidy,
            },
          ],
        });
      },
    },
    {
      id: "subsidy-in-dollars",
      icon: IconTablerCash,
      name: "Subsidy In Dollars",
      title: "Daily Subsidy In Dollars",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "subsidy-in-dollars",
              title: "Subsidy In Dollars",
              color: colors.dollars,
              dataset: params.datasets.dateToSubsidyInDollars,
            },
          ],
        });
      },
    },
    {
      id: "last-subsidy",
      icon: IconTablerMoneybag,
      name: "Last Subsidy",
      title: "Last Subsidy",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "last-subsidy",
              title: "Last Subsidy",
              color: colors.bitcoin,
              dataset: params.datasets.dateToLastSubsidy,
            },
          ],
        });
      },
    },
    {
      id: "fees",
      icon: IconTablerCut,
      name: "Fees",
      title: "Daily Fees",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "fees",
              title: "Fees",
              color: colors.bitcoin,
              dataset: params.datasets.dateToFees,
            },
          ],
        });
      },
    },
  ],
};
