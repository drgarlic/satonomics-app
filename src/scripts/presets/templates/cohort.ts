import { LineStyle, PriceScaleMode } from "lightweight-charts";

import {
  applyMultipleSeries,
  colors,
  percentiles,
  PRICE_SCALE_MOMENTUM_ID,
  SeriesType,
} from "/src/scripts";

export function createCohortPresetFolder({
  id,
  color,
  name,
  datasetKey,
}: {
  id: string;
  name: string;
  datasetKey: AnyPossibleCohortName;
  color: string;
}): PresetFolder {
  return {
    id: `cohort-${id}`,
    name,
    tree: createCohortPresetList({
      color,
      datasetKey,
      id,
    }),
  };
}

export function createCohortPresetList({
  id,
  color,
  datasetKey,
}: {
  id: string;
  datasetKey: AnyPossibleCohortName;
  color: string;
}): PresetTree {
  return [
    {
      id: `${id}-utxos`,
      name: "UTXOs - Unspent Transaction Outputs",
      tree: [
        {
          id: `${id}-utxo-count`,
          name: `Count`,
          title: `${datasetKey} UTXO Count`,
          icon: () => IconTablerTicket,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "utxo-count",
                  title: "UTXO Count",
                  color,
                  seriesType: SeriesType.Area,
                  dataset: params.datasets[`dateTo${datasetKey}UtxoCount`],
                },
              ],
            });
          },
          description: "",
        },
      ],
    },
    {
      id: `${id}-realized`,
      name: "Realized",
      tree: [
        {
          id: `${id}-realized-capitalization`,
          name: `Capitalization`,
          title: `${datasetKey} Realized Capitalization`,
          icon: () => IconTablerPigMoney,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                ...(id && id !== "all"
                  ? [
                      {
                        id: "realized-capitalization",
                        title: "Realized Capitalization",
                        color: colors.bitcoin,
                        dataset:
                          params.datasets[`dateToRealizedCapitalization`],
                      },
                    ]
                  : []),
                {
                  id: `${id}-realized-capitalization`,
                  title: `${datasetKey} Realized Capitalization`,
                  color,
                  seriesType: SeriesType.Area,
                  dataset:
                    params.datasets[
                      `dateTo${datasetKey}RealizedCapitalization`
                    ],
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-realized-capitalization-30d-change`,
          name: `Capitalization 30 Day Change`,
          title: `${datasetKey} Realized Capitalization 30 Day Change`,
          icon: () => IconTablerStatusChange,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: `${id}-realized-capitalization-30d-change`,
                  title: `${datasetKey} Realized Cap. 30 Day Change`,
                  seriesType: SeriesType.Based,
                  dataset:
                    params.datasets[
                      `dateTo${datasetKey}RealizedCapitalization30dChange`
                    ],
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-realized-price-folder`,
          name: "Price",
          tree: [
            {
              id: `${id}-realized-price`,
              name: `Value`,
              title: `${datasetKey} Realized Price`,
              icon: () => IconTablerMathAvg,
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  list: [
                    {
                      id: "realized-price",
                      title: "Realized Price",
                      color,
                      dataset:
                        params.datasets[`dateTo${datasetKey}RealizedPrice`],
                    },
                  ],
                });
              },
              description: "",
            },
            createRatioPresetFolder({
              id: `${id}-realized-price`,
              color,
              title: `${datasetKey} Realized Price`,
              datasetKey: `${datasetKey}RealizedPrice`,
            }),
          ],
        },
        {
          id: `${id}-realized-profit`,
          name: `Profit`,
          title: `${datasetKey} Realized Profit`,
          icon: () => IconTablerCash,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "realized-profit",
                  title: "Realized Profit",
                  dataset: params.datasets[`dateTo${datasetKey}RealizedProfit`],
                  color: colors.profit,
                  seriesType: SeriesType.Area,
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-realized-loss`,
          name: "Loss",
          title: `${datasetKey} Realized Loss`,
          icon: () => IconTablerCoffin,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "realized-loss",
                  title: "Realized Loss",
                  dataset: params.datasets[`dateTo${datasetKey}RealizedLoss`],
                  color: colors.loss,
                  seriesType: SeriesType.Area,
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-realized-profit-and-loss`,
          name: `PNL - Profit And Loss`,
          title: `${datasetKey} PNL - Profit And Loss`,
          icon: () => IconTablerArrowsVertical,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "realized-profit",
                  title: "Realized Profit",
                  color: colors.profit,
                  dataset: params.datasets[`dateTo${datasetKey}RealizedProfit`],
                  seriesType: SeriesType.Based,
                },
                {
                  id: "realized-loss",
                  title: "Realized Loss",
                  color: colors.loss,
                  dataset:
                    params.datasets[`dateTo${datasetKey}RealizedLossNegative`],
                  seriesType: SeriesType.Based,
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-net-realized-profit-and-loss`,
          name: `Net PNL`,
          title: `${datasetKey} Net Realized Profit And Loss`,
          icon: () => IconTablerScale,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "net-realized-profit-and-loss",
                  title: "Net PNL",
                  seriesType: SeriesType.Based,
                  dataset:
                    params.datasets[
                      `dateTo${datasetKey}NetRealizedProfitAndLoss`
                    ],
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-relative-net-realized-profit-and-loss`,
          name: `Relative Net PNL`,
          title: `${datasetKey} Net Realized Profit And Loss Relative To Total Market Capitalization`,
          icon: () => IconTablerDivide,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "relative-net-realized-profit-and-loss",
                  title: "Relative Net PNL",
                  seriesType: SeriesType.Based,
                  dataset:
                    params.datasets[
                      `dateTo${datasetKey}RelativeNetRealizedProfitAndLoss`
                    ],
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-cumulated-realized-profit`,
          name: `Cumulated Profit`,
          title: `${datasetKey} Cumulated Realized Profit`,
          icon: () => IconTablerSum,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "cumulated-realized-profit",
                  title: "Cumulated Realized Profit",
                  color: colors.profit,
                  seriesType: SeriesType.Area,
                  dataset:
                    params.datasets[
                      `dateTo${datasetKey}CumulatedRealizedProfit`
                    ],
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-cumulated-realized-loss`,
          name: "Cumulated Loss",
          title: `${datasetKey} Cumulated Realized Loss`,
          icon: () => IconTablerSum,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "cumulated-realized-loss",
                  title: "Cumulated Realized Loss",
                  color: colors.loss,
                  seriesType: SeriesType.Area,
                  dataset:
                    params.datasets[`dateTo${datasetKey}CumulatedRealizedLoss`],
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-cumulated-net-realized-profit-and-loss`,
          name: `Cumulated Net PNL`,
          title: `${datasetKey} Cumulated Net Realized Profit And Loss`,
          icon: () => IconTablerSum,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "cumulated-net-realized-profit-and-loss",
                  title: "Cumulated Net Realized PNL",
                  seriesType: SeriesType.Based,
                  dataset:
                    params.datasets[
                      `dateTo${datasetKey}CumulatedNetRealizedProfitAndLoss`
                    ],
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-cumulated-net-realized-profit-and-loss-30d-change`,
          name: `Cumulated Net PNL 30 Day Change`,
          title: `${datasetKey} Cumulated Net Realized Profit And Loss 30 Day Change`,
          icon: () => IconTablerTimeDuration30,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "cumulated-net-realized-profit-and-loss-30d-change",
                  title: "Cumulated Net Realized PNL 30d Change",
                  dataset:
                    params.datasets[
                      `dateTo${datasetKey}CumulatedNetRealizedProfitAndLoss30dChange`
                    ],
                  seriesType: SeriesType.Based,
                },
              ],
            });
          },
          description: "",
        },
      ],
    },
    {
      id: `${id}-unrealized`,
      name: "Unrealized",
      tree: [
        {
          id: `${id}-unrealized-profit`,
          name: `Profit`,
          title: `${datasetKey} Unrealized Profit`,
          icon: () => IconTablerMoodDollar,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "unrealized-profit",
                  title: "Unrealized Profit",
                  dataset:
                    params.datasets[`dateTo${datasetKey}UnrealizedProfit`],
                  color: colors.profit,
                  seriesType: SeriesType.Area,
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-unrealized-loss`,
          name: "Loss",
          title: `${datasetKey} Unrealized Loss`,
          icon: () => IconTablerMoodSadDizzy,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "unrealized-loss",
                  title: "Unrealized Loss",
                  dataset: params.datasets[`dateTo${datasetKey}UnrealizedLoss`],
                  color: colors.loss,
                  seriesType: SeriesType.Area,
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-unrealized-profit-and-loss`,
          name: `PNL - Profit And Loss`,
          title: `${datasetKey} Unrealized PNL - Profit And Loss`,
          icon: () => IconTablerArrowsVertical,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "unrealized-loss",
                  title: "Unrealized Profit",
                  color: colors.profit,
                  dataset:
                    params.datasets[`dateTo${datasetKey}UnrealizedProfit`],
                  seriesType: SeriesType.Based,
                },
                {
                  id: "unrealized-loss",
                  title: "Unrealized Loss",
                  color: colors.loss,
                  dataset:
                    params.datasets[
                      `dateTo${datasetKey}UnrealizedLossNegative`
                    ],
                  seriesType: SeriesType.Based,
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-net-unrealized-profit-and-loss`,
          name: `Net PNL`,
          title: `${datasetKey} Net Unrealized Profit And Loss`,
          icon: () => IconTablerScale,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "net-unrealized-profit-and-loss",
                  title: "Net Unrealized PNL",
                  dataset:
                    params.datasets[
                      `dateTo${datasetKey}NetUnrealizedProfitAndLoss`
                    ],
                  seriesType: SeriesType.Based,
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-relative-net-unrealized-profit-and-loss`,
          name: `Relative Net PNL`,
          title: `${datasetKey} Net Unrealized Profit And Loss Relative To Total Market Capitalization`,
          icon: () => IconTablerDivide,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "relative-net-unrealized-profit-and-loss",
                  title: "Relative Net Unrealized PNL",
                  dataset:
                    params.datasets[
                      `dateTo${datasetKey}RelativeNetUnrealizedProfitAndLoss`
                    ],
                  seriesType: SeriesType.Based,
                },
              ],
            });
          },
          description: "",
        },
      ],
    },
    {
      id: `${id}-supply-total`,
      name: "Supply",
      tree: [
        {
          id: `${id}-supply`,
          name: "Total",
          tree: [
            {
              id: `${id}-total-supply-absolute`,
              name: `Absolute`,
              title: `${datasetKey} Total supply`,
              icon: () => IconTablerSum,
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  priceScaleOptions: {
                    halved: true,
                  },
                  list: [
                    {
                      id: "supply-total",
                      title: "Total supply",
                      color,
                      seriesType: SeriesType.Area,
                      dataset:
                        params.datasets[`dateTo${datasetKey}SupplyTotal`],
                    },
                  ],
                });
              },
              description: "",
            },
            {
              id: `${id}-total-supply-percentage-all`,
              name: `% All`,
              title: `${datasetKey} Total supply (% All)`,
              icon: () => IconTablerPercentage,
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  priceScaleOptions: {
                    halved: true,
                  },
                  list: [
                    {
                      id: "supply-total",
                      title: "Total supply",
                      color,
                      seriesType: SeriesType.Area,
                      dataset:
                        params.datasets[`dateTo${datasetKey}SupplyTotal%All`],
                    },
                  ],
                });
              },
              description: "",
            },
          ],
        },
        {
          id: `${id}-supply-in-profit`,
          name: "In Profit",
          tree: [
            {
              id: `${id}-in-profit-absolute`,
              name: "Absolute",
              title: `${datasetKey} Supply in profit`,
              icon: () => IconTablerTrendingUp,
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  priceScaleOptions: {
                    halved: true,
                  },
                  list: [
                    {
                      id: "supply-in-profit",
                      title: "Supply in profit",
                      color: colors.profit,
                      seriesType: SeriesType.Area,
                      dataset:
                        params.datasets[`dateTo${datasetKey}SupplyInProfit`],
                    },
                  ],
                });
              },
              description: "",
            },
            {
              id: `${id}-in-profit-percentage-self`,
              name: "% Self",
              title: `${datasetKey} Supply in profit (% Self)`,
              icon: () => IconTablerPercentage,
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  priceScaleOptions: {
                    halved: true,
                  },
                  list: [
                    {
                      id: "supply-in-profit",
                      title: "Supply in profit",
                      color: colors.profit,
                      seriesType: SeriesType.Area,
                      dataset:
                        params.datasets[
                          `dateTo${datasetKey}SupplyInProfit%Self`
                        ],
                    },
                  ],
                });
              },
              description: "",
            },
            {
              id: `${id}-in-profit-percentage-all`,
              name: "% All",
              title: `${datasetKey} Supply in profit (% All)`,
              icon: () => IconTablerPercentage,
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  priceScaleOptions: {
                    halved: true,
                  },
                  list: [
                    {
                      id: "supply-in-profit",
                      title: "Supply in profit",
                      color: colors.profit,
                      seriesType: SeriesType.Area,
                      dataset:
                        params.datasets[
                          `dateTo${datasetKey}SupplyInProfit%All`
                        ],
                    },
                  ],
                });
              },
              description: "",
            },
          ],
        },
        {
          id: `${id}-supply-in-loss`,
          name: "In Loss",
          tree: [
            {
              id: `${id}-in-loss`,
              name: "Absolute",
              title: `${datasetKey} Supply in loss`,
              icon: () => IconTablerTrendingDown,
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  priceScaleOptions: {
                    halved: true,
                  },
                  list: [
                    {
                      id: "supply-in-loss",
                      title: "Supply in loss",
                      color: colors.loss,
                      seriesType: SeriesType.Area,
                      dataset:
                        params.datasets[`dateTo${datasetKey}SupplyInLoss`],
                    },
                  ],
                });
              },
              description: "",
            },
            {
              id: `${id}-in-loss-percentage-self`,
              name: "% Self",
              title: `${datasetKey} Supply in loss (% Self)`,
              icon: () => IconTablerPercentage,
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  priceScaleOptions: {
                    halved: true,
                  },
                  list: [
                    {
                      id: "supply-in-loss",
                      title: "Supply in loss",
                      seriesType: SeriesType.Area,
                      color: colors.loss,
                      dataset:
                        params.datasets[`dateTo${datasetKey}SupplyInLoss%Self`],
                    },
                  ],
                });
              },
              description: "",
            },
            {
              id: `${id}-in-loss-percentage-all`,
              name: "% All",
              title: `${datasetKey} Supply in loss (% All)`,
              icon: () => IconTablerPercentage,
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  priceScaleOptions: {
                    halved: true,
                  },
                  list: [
                    {
                      id: "supply-in-loss",
                      title: "Supply in loss",
                      seriesType: SeriesType.Area,
                      color: colors.loss,
                      dataset:
                        params.datasets[`dateTo${datasetKey}SupplyInLoss%All`],
                    },
                  ],
                });
              },
              description: "",
            },
          ],
        },
        {
          id: `${id}-supply-in-profit-and-loss`,
          name: "In PNL - Profit And Loss",
          tree: [
            {
              id: `${id}-profit-and-loss-absolute`,
              name: "Absolute",
              tree: [
                {
                  id: `${id}-profit-and-loss-absolute-crossed`,
                  name: "Crossed",
                  title: `${datasetKey} Profit And Loss (Crossed, Absolute)`,
                  icon: () => IconTablerArrowsCross,
                  applyPreset(params) {
                    return applyMultipleSeries({
                      ...params,
                      priceScaleOptions: {
                        halved: true,
                      },
                      list: [
                        {
                          id: "supply-total",
                          title: "Total supply",
                          color: colors.white,
                          dataset:
                            params.datasets[`dateTo${datasetKey}SupplyTotal`],
                          options: {
                            lastValueVisible: false,
                          },
                        },
                        {
                          id: "supply-total-halved",
                          title: "Halved Total Supply",
                          color: colors.gray,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyTotal50Percent`
                            ],
                          options: {
                            lineStyle: LineStyle.SparseDotted,
                            lastValueVisible: false,
                          },
                        },
                        {
                          id: "supply-in-profit",
                          title: "Supply in profit",
                          color: colors.profit,
                          showPriceLine: true,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyInProfit`
                            ],
                        },
                        {
                          id: "supply-in-loss",
                          title: "Supply in loss",
                          color: colors.loss,
                          showPriceLine: true,
                          dataset:
                            params.datasets[`dateTo${datasetKey}SupplyInLoss`],
                        },
                      ],
                    });
                  },
                  description: "",
                },
                {
                  id: `${id}-stacked-profit-and-loss-absolute-stacked`,
                  name: "Stacked",
                  title: `${datasetKey} Profit And Loss (Stacked, Absolute)`,
                  icon: () => IconTablerStack,
                  applyPreset(params) {
                    return applyMultipleSeries({
                      ...params,
                      priceScaleOptions: {
                        halved: true,
                      },
                      list: [
                        {
                          id: "supply-total-halved",
                          title: "Halved Total Supply",
                          color: colors.gray,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyTotal50Percent`
                            ],
                          options: {
                            lineStyle: LineStyle.SparseDotted,
                          },
                        },
                        {
                          id: "supply-in-loss",
                          title: "Supply in loss",
                          color: colors.loss,
                          seriesType: SeriesType.Stacked,
                          dataset:
                            params.datasets[`dateTo${datasetKey}SupplyInLoss`],
                        },
                        {
                          id: "supply-in-profit",
                          title: "Supply in profit",
                          seriesType: SeriesType.Stacked,
                          color: colors.profit,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyInProfit`
                            ],
                        },
                      ],
                    });
                  },
                  description: "",
                },
              ],
            },
            {
              id: `${id}-supply-in-profit-and-loss-percentage-all`,
              name: "% All",
              tree: [
                {
                  id: `${id}-profit-and-loss-percentage-all-crossed`,
                  name: "Crossed",
                  title: `${datasetKey} Profit And Loss (% All) Crossed`,
                  icon: () => IconTablerArrowsCross,
                  applyPreset(params) {
                    return applyMultipleSeries({
                      ...params,
                      priceScaleOptions: {
                        halved: true,
                      },
                      list: [
                        {
                          id: "supply-in-profit",
                          title: "Supply in profit",
                          color: colors.profit,
                          showPriceLine: true,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyInProfit%All`
                            ],
                        },
                        {
                          id: "supply-in-loss",
                          title: "Supply in loss",
                          color: colors.loss,
                          showPriceLine: true,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyInLoss%All`
                            ],
                        },
                      ],
                    });
                  },
                  description: "",
                },
                {
                  id: `${id}-profit-and-loss-percentage-all-stacked`,
                  name: "Stacked",
                  title: `${datasetKey} Profit And Loss (% All) Stacked`,
                  icon: () => IconTablerStack,
                  applyPreset(params) {
                    return applyMultipleSeries({
                      ...params,
                      priceScaleOptions: {
                        halved: true,
                      },
                      list: [
                        {
                          id: "supply-in-profit",
                          title: "Supply in profit",
                          color: colors.profit,
                          seriesType: SeriesType.Stacked,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyInProfit%All`
                            ],
                        },
                        {
                          id: "supply-in-loss",
                          title: "Supply in loss",
                          color: colors.loss,
                          seriesType: SeriesType.Stacked,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyInLoss%All`
                            ],
                        },
                      ],
                    });
                  },
                  description: "",
                },
              ],
            },
            {
              id: `${id}-supply-in-profit-and-loss-percentage-self`,
              name: "% Self",
              tree: [
                {
                  id: `${id}-supply-in-profit-and-loss-percentage-self-crossed`,
                  name: "Crossed",
                  title: `${datasetKey} Supply In Profit And Loss (% Self) Crossed`,
                  icon: () => IconTablerArrowsCross,
                  applyPreset(params) {
                    return applyMultipleSeries({
                      ...params,
                      priceScaleOptions: {
                        halved: true,
                      },
                      list: [
                        {
                          title: "50%",
                          id: "50p",
                          color: colors.gray,
                          dataset: params.datasets.dateTo50,
                          options: {
                            lineStyle: LineStyle.SparseDotted,
                            lastValueVisible: false,
                          },
                        },
                        {
                          id: "100p",
                          title: "100%",
                          color: colors.white,
                          dataset: params.datasets.dateTo100,
                          options: {
                            lastValueVisible: false,
                          },
                        },
                        {
                          id: "supply-in-profit",
                          title: "Supply in profit",
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyInProfit%Self`
                            ],
                          color: colors.profit,
                          showPriceLine: true,
                        },
                        {
                          id: "supply-in-loss",
                          title: "Supply in loss",
                          color: colors.loss,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyInLoss%Self`
                            ],
                          showPriceLine: true,
                        },
                      ],
                    });
                  },
                  description: "",
                },
                {
                  id: `${id}-supply-in-profit-and-loss-percentage-self-stacked`,
                  name: "Stacked",
                  title: `${datasetKey} Supply In Profit And Loss (% Self) Stacked`,
                  icon: () => IconTablerStack,
                  applyPreset(params) {
                    return applyMultipleSeries({
                      ...params,
                      priceScaleOptions: {
                        halved: true,
                      },
                      list: [
                        {
                          id: "50p",
                          title: "50%",
                          color: colors.gray,
                          dataset: params.datasets.dateTo50,
                          options: {
                            lineStyle: LineStyle.SparseDotted,
                            lastValueVisible: false,
                          },
                        },
                        {
                          id: "supply-in-profit",
                          title: "Supply in profit",
                          color: colors.profit,
                          seriesType: SeriesType.Stacked,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyInProfit%Self`
                            ],
                        },
                        {
                          id: "supply-in-loss",
                          title: "Supply in loss",
                          color: colors.loss,
                          seriesType: SeriesType.Stacked,
                          dataset:
                            params.datasets[
                              `dateTo${datasetKey}SupplyInLoss%Self`
                            ],
                        },
                      ],
                    });
                  },
                  description: "",
                },
                createMomentumPresetFolder({
                  id: `${id}-supply-in-profit-and-loss-percentage-self`,
                  title: `${datasetKey} Supply In Profit And Loss (% Self)`,
                  datasetKey: `${datasetKey}SupplyPNL%Self`,
                }),
              ],
            },
          ],
        },
      ],
    },
    {
      id: `${id}-price-paid`,
      name: "Prices Paid",
      tree: [
        {
          id: `${id}-mean-price-paid`,
          name: `Mean`,
          title: `${datasetKey} Mean Price Paid`,
          icon: () => IconTablerMathAvg,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              list: [
                {
                  id: "mean",
                  title: "Mean",
                  color,
                  dataset: params.datasets[`dateTo${datasetKey}PricePaidMean`],
                },
              ],
            });
          },
          description: "",
        },
        {
          id: `${id}-median-price-paid`,
          name: "Median",
          title: `${datasetKey} Median Price Paid`,
          icon: () => IconTablerSquareHalf,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              list: [
                {
                  id: "median",
                  title: "Median",
                  color,
                  dataset:
                    params.datasets[`dateTo${datasetKey}PricePaidMedian`],
                },
              ],
            });
          },
          description: "",
        },

        {
          id: `${id}-price-paid-deciles`,
          name: `Deciles`,
          title: `${datasetKey} deciles`,
          icon: () => IconTablerSquareHalf,
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              list: [
                {
                  id: "median",
                  dataset:
                    params.datasets[`dateTo${datasetKey}PricePaidMedian`],
                  color,
                  title: "Median",
                },
                ...percentiles
                  .filter((percentile) => Number(percentile) % 10 === 0)
                  .map((percentile) => ({
                    id: `${percentile}-percentile`,
                    dataset:
                      params.datasets[
                        `dateTo${datasetKey}PricePaid${percentile}Percentile`
                      ],
                    color,
                    title: `${percentile}th percentile`,
                  })),
              ],
            });
          },
          description: "",
        },
        ...percentiles.map(
          (percentile): PartialPreset => ({
            id: `${id}-price-paid-${percentile}p`,
            name: `${percentile}%`,
            title: `${datasetKey} ${percentile}th percentile`,
            icon: () => IconTablerSquareHalf,
            applyPreset(params) {
              return applyMultipleSeries({
                ...params,
                list: [
                  {
                    id: `${percentile}-percentile`,
                    title: `${percentile}th percentile`,
                    color,
                    dataset:
                      params.datasets[
                        `dateTo${datasetKey}PricePaid${percentile}Percentile`
                      ],
                  },
                ],
              });
            },
            description: "",
          }),
        ),
      ],
    },
  ];
}

export function createRatioPresetFolder({
  id,
  title,
  datasetKey,
  color,
}: {
  id: string;
  title: string;
  color: string;
  datasetKey:
    | `${AnyPossibleCohortName}RealizedPrice`
    | `Closes${AverageName}MA`
    | "ActivePrice"
    | "VaultedPrice"
    | "TrueMarketMean";
}): PresetFolder {
  return {
    id: `${id}-ratio`,
    name: "Ratio",
    tree: [
      {
        id: `${id}-ratio-value`,
        name: `Value`,
        title: `Bitcoin Price to ${title} Ratio`,
        icon: () => IconTablerDivide,
        applyPreset(params) {
          return applyMultipleSeries({
            ...params,
            priceScaleOptions: {
              halved: true,
            },
            list: [
              {
                id: "ratio",
                title: "Ratio",
                seriesType: SeriesType.Based,
                dataset: params.datasets[`dateTo${datasetKey}Ratio`],
                options: {
                  base: 1,
                },
              },
            ],
          });
        },
        description: "",
      },
      {
        id: `${id}-ratio-1y-average`,
        name: "Averages",
        tree: [
          {
            id: `${id}-ratio-averages`,
            name: `7 Day VS. 1 Year`,
            title: `Bitcoin Price to ${title} Ratio Moving Averages`,
            icon: () => IconTablerSwords,
            applyPreset(params) {
              return applyMultipleSeries({
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "ratio",
                    title: "Ratio",
                    seriesType: SeriesType.Based,
                    color: colors.gray,
                    dataset: params.datasets[`dateTo${datasetKey}Ratio`],
                    options: {
                      base: 1,
                    },
                  },
                  {
                    id: "7d",
                    title: "7 Day Moving Average",
                    color: colors.closes7DMA,
                    dataset:
                      params.datasets[
                        `dateTo${datasetKey}Ratio7DayMovingAverage`
                      ],
                  },
                  {
                    id: "1y",
                    title: "1 Year Moving Average",
                    color: colors.closes1YMA,
                    dataset:
                      params.datasets[
                        `dateTo${datasetKey}Ratio1YearMovingAverage`
                      ],
                  },
                ],
              });
            },
            description: "",
          },
          createMomentumPresetFolder({
            id: `${id}-ratio-averages`,
            title: `${datasetKey} Ratio Moving Averages`,
            datasetKey: `${datasetKey}Ratio`,
          }),
        ],
      },
      {
        id: `${id}-ratio-extremes`,
        name: "Extremes",
        tree: [
          {
            id: `${id}-extreme-top-ratios`,
            name: "Top Ratios",
            description: "",
            icon: () => IconTablerJetpack,
            title: `${datasetKey} Extreme Top Ratios`,
            applyPreset(params) {
              return applyMultipleSeries({
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "ratio",
                    title: "Ratio",
                    color: colors.white,
                    seriesType: SeriesType.Based,
                    dataset: params.datasets[`dateTo${datasetKey}Ratio`],
                    options: {
                      base: 1,
                      options: {
                        baseLineColor: color,
                        baseLineVisible: true,
                      },
                    },
                  },
                  {
                    id: "99.9-percentile",
                    title: "99.9th Percentile",
                    dataset:
                      params.datasets[`dateTo${datasetKey}Ratio99.9Percentile`],
                    color: colors.extremeMax,
                  },
                  {
                    id: "99.5-percentile",
                    title: "99.5th Percentile",
                    color: colors.extremeMiddle,
                    dataset:
                      params.datasets[`dateTo${datasetKey}Ratio99.5Percentile`],
                  },
                  {
                    id: "99-percentile",
                    title: "99th Percentile",
                    color: colors.extremeMin,
                    dataset:
                      params.datasets[`dateTo${datasetKey}Ratio99Percentile`],
                  },
                ],
              });
            },
          },
          {
            id: `${id}-extreme-bottom-ratios`,
            name: "Bottom Ratios",
            description: "",
            icon: () => IconTablerScubaMask,
            title: `${datasetKey} Extreme Bottom Ratios`,
            applyPreset(params) {
              return applyMultipleSeries({
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "ratio",
                    title: "Ratio",
                    color: colors.white,
                    seriesType: SeriesType.Based,
                    dataset: params.datasets[`dateTo${datasetKey}Ratio`],
                    options: {
                      base: 1,
                      options: {
                        baseLineColor: color,
                        baseLineVisible: true,
                      },
                    },
                  },
                  {
                    id: "1-percentile",
                    title: "1st Percentile",
                    color: colors.extremeMin,
                    dataset:
                      params.datasets[`dateTo${datasetKey}Ratio1Percentile`],
                  },
                  {
                    id: "0.5-percentile",
                    title: "0.5th Percentile",
                    color: colors.extremeMiddle,
                    dataset:
                      params.datasets[`dateTo${datasetKey}Ratio0.5Percentile`],
                  },
                  {
                    id: "0.1-percentile",
                    title: "0.1th Percentile",
                    color: colors.extremeMax,
                    dataset:
                      params.datasets[`dateTo${datasetKey}Ratio0.1Percentile`],
                  },
                ],
              });
            },
          },
          {
            id: `${id}-extreme-top-prices`,
            name: "Top Prices",
            description: "",
            icon: () => IconTablerRocket,
            title: `${datasetKey} Extreme Top Prices`,
            applyPreset(params) {
              return applyMultipleSeries({
                ...params,
                list: [
                  {
                    id: "99.9-percentile",
                    title: "99.9th Percentile",
                    color: colors.extremeMax,
                    dataset:
                      params.datasets[`dateTo${datasetKey}Ratio99.9Price`],
                  },
                  {
                    id: "99.5-percentile",
                    title: "99.5th Percentile",
                    color: colors.extremeMiddle,
                    dataset:
                      params.datasets[`dateTo${datasetKey}Ratio99.5Price`],
                  },
                  {
                    id: "99-percentile",
                    title: "99th Percentile",
                    color: colors.extremeMin,
                    dataset: params.datasets[`dateTo${datasetKey}Ratio99Price`],
                  },
                ],
              });
            },
          },
          {
            id: `${id}-extreme-bottom-prices`,
            name: "Bottom Prices",
            description: "",
            icon: () => IconTablerSubmarine,
            title: `${datasetKey} Extreme Bottom Prices`,
            applyPreset(params) {
              return applyMultipleSeries({
                ...params,
                list: [
                  {
                    id: "1-percentile",
                    title: "1st Percentile",
                    color: colors.extremeMin,
                    dataset: params.datasets[`dateTo${datasetKey}Ratio1Price`],
                  },
                  {
                    id: "0.5-percentile",
                    title: "0.5th Percentile",
                    color: colors.extremeMiddle,
                    dataset:
                      params.datasets[`dateTo${datasetKey}Ratio0.5Price`],
                  },
                  {
                    id: "0.1-percentile",
                    title: "0.1th Percentile",
                    color: colors.extremeMax,
                    dataset:
                      params.datasets[`dateTo${datasetKey}Ratio0.1Price`],
                  },
                ],
              });
            },
          },
        ],
      },
    ],
  };
}

function createMomentumPresetFolder({
  id,
  title,
  datasetKey,
}: {
  id: string;
  title: string;
  datasetKey:
    | `${AnyPossibleCohortName}SupplyPNL%Self`
    | `${AnyPossibleCohortName}RealizedPriceRatio`
    | `Closes${AverageName}MARatio`
    | "ActivePriceRatio"
    | "VaultedPriceRatio"
    | "TrueMarketMeanRatio";
}): PresetFolder {
  return {
    id: `${id}-momentum`,
    name: "Momentum",
    tree: [
      {
        id: `${id}-momentum-value`,
        name: "Value",
        title: `${title} Momentum`,
        icon: () => IconTablerRollercoaster,
        applyPreset(params) {
          return applyMultipleSeries({
            ...params,
            list: [
              {
                id: "momentum",
                title: "Momentum",
                colors: colors.momentum,
                seriesType: SeriesType.Histogram,
                dataset: params.datasets[`dateTo${datasetKey}Momentum`],
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
        id: `${id}-momentum-buy-low-sell-high`,
        name: "BLSH - Buy Low Sell High",
        tree: [
          {
            id: `${id}-buy-low-sell-high-bitcoin-returns`,
            name: "Bitcoin Returns",
            title: `${title} Momentum Based Buy Low Sell High Bitcoin Returns`,
            icon: () => IconTablerReceiptBitcoin,
            applyPreset(params) {
              return applyMultipleSeries({
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
                      params.datasets[
                        `dateTo${datasetKey}MomentumBLSHBitcoinReturns`
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
            id: `${id}-momentum-buy-low-sell-high-dollar-returns`,
            name: "Dollar Returns",
            title: `${title} Momentum Based Buy Low Sell High Dollar Returns`,
            icon: () => IconTablerReceiptDollar,
            applyPreset(params) {
              return applyMultipleSeries({
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
                      params.datasets[
                        `dateTo${datasetKey}MomentumBLSHDollarReturns`
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
