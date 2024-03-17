import { PriceScaleMode } from "lightweight-charts";

import {
  applyMultipleSeries,
  colors,
  PRICE_SCALE_MOMENTUM_ID,
  SeriesType,
} from "/src/scripts";

type HeightMomentumKey =
  | `${AnyPossibleCohortKey}SupplyPNL%Self`
  | `${AnyPossibleCohortKey}RealizedPriceRatio`
  | "activePriceRatio"
  | "vaultedPriceRatio"
  | "trueMarketMeanRatio";

type DateMomentumKey = HeightMomentumKey | `price${AverageName}MARatio`;

export function createMomentumPresetFolder<
  Scale extends ResourceScale,
  Key extends DateMomentumKey = Scale extends "date"
    ? DateMomentumKey
    : HeightMomentumKey,
>({
  scale,
  id,
  title,
  datasetKey,
}: {
  scale: Scale;
  id: string;
  title: string;
  datasetKey: Key;
}): PresetFolder {
  return {
    id: `${scale}-${id}-momentum`,
    name: "Momentum",
    tree: [
      {
        id: `${scale}-${id}-momentum-value`,
        name: "Value",
        title: `${title} Momentum`,
        icon: () => IconTablerRollercoaster,
        applyPreset(params) {
          return applyMultipleSeries({
            scale,
            ...params,
            list: [
              {
                id: "momentum",
                title: "Momentum",
                colors: colors.momentum,
                seriesType: SeriesType.Histogram,
                dataset: params.datasets[scale][`${datasetKey}Momentum`],
                options: {
                  priceScaleId: PRICE_SCALE_MOMENTUM_ID,
                  lastValueVisible: false,
                },
              },
            ],
          });
        },
        description: "",
      },
      {
        id: `${scale}-${id}-momentum-buy-low-sell-high`,
        name: "BLSH - Buy Low Sell High",
        tree: [
          {
            id: `${scale}-${id}-buy-low-sell-high-bitcoin-returns`,
            name: "Bitcoin Returns",
            title: `${title} Momentum Based Buy Low Sell High Bitcoin Returns`,
            icon: () => IconTablerReceiptBitcoin,
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                  mode: PriceScaleMode.Percentage,
                },
                list: [
                  {
                    id: "bitcoin-returns",
                    title: "Bitcoin Returns",
                    dataset:
                      params.datasets[scale][
                        `${datasetKey}MomentumBLSHBitcoinReturns`
                      ],
                    color: colors.bitcoin,
                    showPriceLine: true,
                  },
                ],
              });
            },
            description: "",
          },
          {
            id: `${scale}-${id}-momentum-buy-low-sell-high-dollar-returns`,
            name: "Dollar Returns",
            title: `${title} Momentum Based Buy Low Sell High Dollar Returns`,
            icon: () => IconTablerReceiptDollar,
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                  mode: PriceScaleMode.Percentage,
                },
                list: [
                  {
                    id: "dollar-returns",
                    title: "Dollar Returns",
                    dataset:
                      params.datasets[scale][
                        `${datasetKey}MomentumBLSHDollarReturns`
                      ],
                    color: colors.dollars,
                    showPriceLine: true,
                  },
                ],
              });
            },
            description: "",
          },
        ],
      },
    ],
  };
}
