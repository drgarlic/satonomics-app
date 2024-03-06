import { PriceScaleMode } from "lightweight-charts";

import { applyMultipleSeries, colors } from "/src/scripts";

// export const presets: PresetTree = [
export const presets: PresetFolder = {
  id: "miners",
  name: "Miners",
  tree: [
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
              color: colors.bitcoin,
              dataset: params.datasets.dateToYearlyInflationRate,
            },
          ],
        });
      },
    },
    {
      id: "subsidies",
      name: "Subsidies",
      tree: [
        {
          id: "daily-subsidies",
          name: "Daily",
          tree: [
            {
              id: "daily-subsidies-in-bitcoin",
              icon: IconTablerMoneybag,
              name: "In Bitcoin",
              title: "Daily Subsidies (In Bitcoin)",
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
              id: "daily-subsidies-in-dollars",
              icon: IconTablerCash,
              name: "In Dollars",
              title: "Daily Subsidies (In Dollars)",
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
          ],
        },
        {
          id: "last-subsidy",
          name: "Last",
          tree: [
            {
              id: "last-subsidy-in-bitcoin",
              icon: IconTablerCoinBitcoin,
              name: "In Bitcoin",
              title: "Last Subsidy (In Bitcoin)",
              description: "",
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  priceScaleOptions: {
                    halved: true,
                  },
                  list: [
                    {
                      id: "last",
                      title: "Last",
                      color: colors.bitcoin,
                      dataset: params.datasets.dateToLastSubsidy,
                    },
                  ],
                });
              },
            },
            {
              id: "last-subsidy-in-dollars",
              icon: IconTablerCoin,
              name: "In Dollars",
              title: "Last Subsidy (In Dollars)",
              description: "",
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  priceScaleOptions: {
                    halved: true,
                  },
                  list: [
                    {
                      id: "last",
                      title: "Last",
                      color: colors.dollars,
                      dataset: params.datasets.dateToLastSubsidyInDollars,
                    },
                  ],
                });
              },
            },
          ],
        },
      ],
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
