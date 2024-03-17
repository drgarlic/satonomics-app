import { PriceScaleMode } from "lightweight-charts";

import {
  applyMultipleSeries,
  colors,
  createRatioPresetFolder,
  SeriesType,
} from "/src/scripts";

export function createPresets(scale: ResourceScale) {
  return {
    id: `${scale}-cointime-economics`,
    name: "Cointime Economics",
    tree: [
      {
        id: `${scale}-coinblocks`,
        name: "Coinblocks",
        tree: [
          {
            id: `${scale}-coinblocks-created`,
            icon: IconTablerCube,
            name: "Created",
            title: "Coinblocks Created",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "coinblocks-created",
                    title: "Coinblocks Created",
                    color: colors.coinblocksCreated,
                    dataset: params.datasets[scale].coinblocksCreated,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-coinblocks-destroyed`,
            icon: IconTablerFileShredder,
            name: "Destroyed",
            title: "Coinblocks Destroyed",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "coinblocks-destroyed",
                    title: "Coinblocks Destroyed",
                    color: colors.coinblocksDestroyed,
                    dataset: params.datasets[scale].coinblocksDestroyed,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-coinblocks-stored`,
            icon: IconTablerBuildingWarehouse,
            name: "Stored",
            title: "Coinblocks Stored",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "coinblocks-stored",
                    title: "Coinblocks Stored",
                    color: colors.coinblocksStored,
                    dataset: params.datasets[scale].coinblocksStored,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-coinblocks-crossed`,
            icon: IconTablerArrowsCross,
            name: "Crossed",
            title: "Coinblocks",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "coinblocks-created",
                    title: "Coinblocks Created",
                    color: colors.coinblocksCreated,
                    dataset: params.datasets[scale].coinblocksCreated,
                  },
                  {
                    id: "coinblocks-destroyed",
                    title: "Coinblocks Destroyed",
                    color: colors.coinblocksDestroyed,
                    dataset: params.datasets[scale].coinblocksDestroyed,
                  },
                  {
                    id: "coinblocks-stored",
                    title: "Coinblocks Stored",
                    color: colors.coinblocksStored,
                    dataset: params.datasets[scale].coinblocksStored,
                  },
                ],
              });
            },
          },
        ],
      },
      {
        id: `${scale}-cumulative-coinblocks`,
        name: "Cumulative Coinblocks",
        tree: [
          {
            id: `${scale}-cumulative-coinblocks-created`,
            icon: IconTablerCube,
            name: "Created",
            title: "Cumulative Coinblocks Created",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "cumulative-coinblocks-created",
                    title: "Cumulative Coinblocks Created",
                    color: colors.coinblocksCreated,
                    dataset: params.datasets[scale].cumulatedCoinblocksCreated,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-cumulative-coinblocks-destroyed`,
            icon: IconTablerFileShredder,
            name: "Destroyed",
            title: "Cumulative Coinblocks Destroyed",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "cumulative-coinblocks-destroyed",
                    title: "Cumulative Coinblocks Destroyed",
                    color: colors.coinblocksDestroyed,
                    dataset:
                      params.datasets[scale].cumulatedCoinblocksDestroyed,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-cumulative-coinblocks-stored`,
            icon: IconTablerBuildingWarehouse,
            name: "Stored",
            title: "Cumulative Coinblocks Stored",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "cumulative-coinblocks-stored",
                    title: "Cumulative Coinblocks Stored",
                    color: colors.coinblocksStored,
                    dataset: params.datasets[scale].cumulatedCoinblocksStored,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-cumulative-coinblocks-crossed`,
            icon: IconTablerArrowsCross,
            name: "Crossed",
            title: "Cumulative Coinblocks (Crossed)",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "coinblocks-created",
                    title: "Cumulative Coinblocks Created",
                    color: colors.coinblocksCreated,
                    dataset: params.datasets[scale].cumulatedCoinblocksCreated,
                  },
                  {
                    id: "coinblocks-destroyed",
                    title: "Cumulative Coinblocks Destroyed",
                    color: colors.coinblocksDestroyed,
                    dataset:
                      params.datasets[scale].cumulatedCoinblocksDestroyed,
                  },
                  {
                    id: "coinblocks-stored",
                    title: "Cumulative Coinblocks Stored",
                    color: colors.coinblocksStored,
                    dataset: params.datasets[scale].cumulatedCoinblocksStored,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-cumulative-coinblocks-stacked`,
            icon: IconTablerStack,
            name: "Stacked",
            title: "Cumulative Coinblocks (Stacked)",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "coinblocks-destroyed",
                    title: "Cumulative Coinblocks Destroyed",
                    color: colors.coinblocksDestroyed,
                    seriesType: SeriesType.Stacked,
                    dataset:
                      params.datasets[scale].cumulatedCoinblocksDestroyed,
                  },
                  {
                    id: "coinblocks-stored",
                    title: "Cumulative Coinblocks Stored",
                    color: colors.coinblocksStored,
                    seriesType: SeriesType.Stacked,
                    dataset: params.datasets[scale].cumulatedCoinblocksStored,
                  },
                ],
              });
            },
          },
        ],
      },
      {
        id: `${scale}-liveliness-and-vaultedness`,
        name: "Liveliness & Vaultedness",
        tree: [
          {
            id: `${scale}-liveliness`,
            icon: IconTablerHeartBolt,
            name: "Liveliness - Activity",
            title: "Liveliness (Activity)",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "liveliness",
                    title: "Liveliness",
                    color: colors.liveliness,
                    dataset: params.datasets[scale].liveliness,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-vaultedness`,
            icon: IconTablerBuildingBank,
            name: "Vaultedness",
            title: "Vaultedness",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "vaultedness",
                    title: "Vaultedness",
                    color: colors.vaultedness,
                    dataset: params.datasets[scale].vaultedness,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-liveliness-vs-vaultedness-crossed`,
            icon: IconTablerArrowsCross,
            name: "Crossed",
            title: "Liveliness VS. Vaultedness (Crossed)",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "liveliness",
                    title: "Liveliness",
                    color: colors.liveliness,
                    dataset: params.datasets[scale].liveliness,
                  },
                  {
                    id: "vaultedness",
                    title: "Vaultedness",
                    color: colors.vaultedness,
                    dataset: params.datasets[scale].vaultedness,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-liveliness-vs-vaultedness-stacked`,
            icon: IconTablerStack,
            name: "Stacked",
            title: "Liveliness VS. Vaultedness (Stacked)",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "liveliness",
                    title: "Liveliness",
                    color: colors.liveliness,
                    dataset: params.datasets[scale].liveliness,
                    seriesType: SeriesType.Stacked,
                  },
                  {
                    id: "vaultedness",
                    title: "Vaultedness",
                    color: colors.vaultedness,
                    dataset: params.datasets[scale].vaultedness,
                    seriesType: SeriesType.Stacked,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-activity-to-vaultedness-ratio`,
            icon: IconTablerDivide,
            name: "A2VR - Activity To Vaultedness Ratio",
            title: "Activity To Vaultedness Ratio (A2VR)",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "activity-to-vaultedness-ratio",
                    title: "Activity To Vaultedness Ratio",
                    color: colors.activityToVaultednessRatio,
                    dataset: params.datasets[scale].actvityToVaultednessRatio,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-concurrent-liveliness`,
            icon: IconTablerHeartBolt,
            name: "Concurrent Liveliness - Supply Adjusted Coindays Destroyed",
            title: "Concurrent Liveliness - Supply Adjusted Coindays Destroyed",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "concurrent-liveliness",
                    title: "Concurrent Liveliness 14d Median",
                    color: `${colors.liveliness}66`,
                    dataset: params.datasets[scale].concurrentLiveliness,
                  },
                  {
                    id: "concurrent-liveliness",
                    title: "Concurrent Liveliness",
                    color: colors.liveliness,
                    dataset:
                      params.datasets[scale].concurrentLiveliness14dMedian,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-liveliness-incremental-change`,
            icon: IconTablerStairs,
            name: "Liveliness Incremental Change",
            title: "Liveliness Incremental Change",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "liveliness-incremental-change",
                    title: "Liveliness Incremental Change",
                    color: colors.darkLiveliness,
                    seriesType: SeriesType.Based,
                    dataset: params.datasets[scale].livelinessIncrementalChange,
                  },
                  {
                    id: "liveliness-incremental-change-14d-median",
                    title: "Liveliness Incremental Change 14 Day Median",
                    color: colors.liveliness,
                    seriesType: SeriesType.Based,
                    dataset:
                      params.datasets[scale]
                        .livelinessIncrementalChange14dMedian,
                  },
                ],
              });
            },
          },
        ],
      },
      {
        id: `${scale}-coinblocks-supply`,
        name: "Supply",
        tree: [
          {
            id: `${scale}-vaulted-supply`,
            icon: IconTablerBuildingBank,
            name: "Vaulted",
            title: "Vaulted Supply",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "vaulted-supply",
                    title: "Vaulted Supply",
                    color: colors.vaultedness,
                    dataset: params.datasets[scale].vaultedSupply,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-active-supply`,
            icon: IconTablerHeartBolt,
            name: "Active",
            title: "Active Supply",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "active-supply",
                    title: "Active Supply",
                    color: colors.liveliness,
                    dataset: params.datasets[scale].activeSupply,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-vaulted-supply-vs-active-supply-crossed`,
            icon: IconTablerArrowsCross,
            name: "VS. Crossed",
            title: "Vaulted VS. Active (Crossed)",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "circulating-supply",
                    title: "Circulating Supply",
                    color: colors.coinblocksCreated,
                    dataset: params.datasets[scale].SupplyTotal,
                  },
                  {
                    id: "vaulted",
                    title: "Vaulted Supply",
                    color: colors.vaultedness,
                    dataset: params.datasets[scale].vaultedSupply,
                  },
                  {
                    id: "active",
                    title: "Active Supply",
                    color: colors.liveliness,
                    dataset: params.datasets[scale].activeSupply,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-vaulted-supply-vs-active-supply-stacked`,
            icon: IconTablerStack,
            name: "VS. Stacked",
            title: "Vaulted VS. Active (Stacked)",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "vaulted",
                    title: "Vaulted Supply",
                    color: colors.vaultedness,
                    dataset: params.datasets[scale].vaultedSupply,
                    seriesType: SeriesType.Stacked,
                  },
                  {
                    id: "active",
                    title: "Active Supply",
                    color: colors.liveliness,
                    dataset: params.datasets[scale].activeSupply,
                    seriesType: SeriesType.Stacked,
                  },
                ],
              });
            },
          },
          // TODO: Fix, Bad data
          // {
          //   id: 'asymptomatic-supply-regions',
          //   icon: IconTablerDirections,
          //   name: 'Asymptomatic Supply Regions',
          //   title: 'Asymptomatic Supply Regions',
          //   description: '',
          //   applyPreset(params) {
          //     return applyMultipleSeries({
          //       ...params,
          //       priceScaleOptions: {
          //         halved: true,
          //       },
          //       list: [
          //         {
          //           id: 'min-vaulted',
          //           title: 'Min Vaulted Supply',
          //           color: colors.vaultedness,
          //           dataset: params.datasets.dateToMinVaultedSupply,
          //         },
          //         {
          //           id: 'max-active',
          //           title: 'Max Active Supply',
          //           color: colors.liveliness,
          //           dataset: params.datasets.dateToMaxActiveSupply,
          //         },
          //       ],
          //     })
          //   },
          // },
          {
            id: `${scale}-vaulted-supply-net-change`,
            icon: IconTablerBuildingBank,
            name: "Vaulted Net Change",
            title: "Vaulted Supply Net Change",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "vaulted-supply-net-change",
                    title: "Vaulted Supply Net Change",
                    color: colors.vaultedness,
                    dataset: params.datasets[scale].vaultedSupplyNetChange,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-active-supply-net-change`,
            icon: IconTablerHeartBolt,
            name: "Active Net Change",
            title: "Active Supply Net Change",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "active-supply-net-change",
                    title: "Active Supply Net Change",
                    color: colors.liveliness,
                    dataset: params.datasets[scale].activeSupplyNetChange,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-active-vs-vaulted-supply-90d-net-change`,
            icon: IconTablerSwords,
            name: "Active VS. Vaulted 90D Net Change",
            title: "Active VS. Vaulted 90 Day Supply Net Change",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "active-supply-net-change",
                    title: "Active Supply Net Change",
                    color: `${colors.liveliness}80`,
                    dataset: params.datasets[scale].activeSupply90dNetChange,
                    seriesType: SeriesType.Based,
                  },
                  {
                    id: "vaulted-supply-net-change",
                    title: "Vaulted Supply Net Change",
                    color: `${colors.vaultedPrice}80`,
                    seriesType: SeriesType.Based,
                    dataset: params.datasets[scale].vaultedSupply90dNetChange,
                  },
                ],
              });
            },
          },
          // TODO: Fix, Bad data
          // {
          //   id: 'vaulted-supply-annualized-net-change',
          //   icon: IconTablerBuildingBank,
          //   name: 'Vaulted Annualized Net Change',
          //   title: 'Vaulted Supply Annualized Net Change',
          //   description: '',
          //   applyPreset(params) {
          //     return applyMultipleSeries({
          //       ...params,
          //       priceScaleOptions: {
          //         halved: true,
          //       },
          //       list: [
          //         {
          //           id: 'vaulted-annualized-supply-net-change',
          //           title: 'Vaulted Supply Annualized Net Change',
          //           color: colors.vaultedness,
          //           dataset:
          //             params.datasets[scale].vaultedAnnualizedSupplyNetChange,
          //         },
          //       ],
          //     })
          //   },
          // },

          // TODO: Fix, Bad data
          // {
          //   id: 'vaulting-rate',
          //   icon: IconTablerBuildingBank,
          //   name: 'Vaulting Rate',
          //   title: 'Vaulting Rate',
          //   description: '',
          //   applyPreset(params) {
          //     return applyMultipleSeries({
          //       ...params,
          //       priceScaleOptions: {
          //         halved: true,
          //       },
          //       list: [
          //         {
          //           id: 'vaulting-rate',
          //           title: 'Vaulting Rate',
          //           color: colors.vaultedness,
          //           dataset: params.datasets[scale].vaultingRate,
          //         },
          //         {
          //           id: 'nominal-inflation-rate',
          //           title: 'Nominal Inflation Rate',
          //           color: colors.orange,
          //           dataset: params.datasets.dateToYearlyInflationRate,
          //         },
          //       ],
          //     })
          //   },
          // },

          // TODO: Fix, Bad data
          // {
          //   id: 'active-supply-net-change-decomposition',
          //   icon: IconTablerArrowsCross,
          //   name: 'Active Supply Net Change Decomposition (90D)',
          //   title: 'Active Supply Net 90 Day Change Decomposition',
          //   description: '',
          //   applyPreset(params) {
          //     return applyMultipleSeries({
          //       ...params,
          //       priceScaleOptions: {
          //         halved: true,
          //       },
          //       list: [
          //         {
          //           id: 'issuance-change',
          //           title: 'Change From Issuance',
          //           color: colors.emerald,
          //           dataset:
          //             params.datasets
          //               [scale].activeSupplyChangeFromIssuance90dChange,
          //         },
          //         {
          //           id: 'transactions-change',
          //           title: 'Change From Transactions',
          //           color: colors.rose,
          //           dataset:
          //             params.datasets
          //               [scale].activeSupplyChangeFromTransactions90dChange,
          //         },
          //         // {
          //         //   id: 'active',
          //         //   title: 'Active Supply',
          //         //   color: colors.liveliness,
          //         //   dataset: params.datasets[scale].activeSupply,
          //         // },
          //       ],
          //     })
          //   },
          // },

          {
            id: `${scale}-cointime-supply-in-profit`,
            icon: IconTablerTrendingUp,
            name: "In Profit",
            title: "Cointime Supply In Profit",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "circulating-supply",
                    title: "Circulating Supply",
                    color: colors.coinblocksCreated,
                    dataset: params.datasets[scale].SupplyTotal,
                  },
                  {
                    id: "vaulted",
                    title: "Vaulted Supply",
                    color: colors.vaultedness,
                    dataset: params.datasets[scale].vaultedSupply,
                  },
                  {
                    id: "supply-in-profit",
                    title: "Supply in profit",
                    color: colors.bitcoin,
                    dataset: params.datasets[scale].SupplyInProfit,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-cointime-supply-in-loss`,
            icon: IconTablerTrendingDown,
            name: "In Loss",
            title: "Cointime Supply In Loss",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "circulating-supply",
                    title: "Circulating Supply",
                    color: colors.coinblocksCreated,
                    dataset: params.datasets[scale].SupplyTotal,
                  },
                  {
                    id: "active",
                    title: "Active Supply",
                    color: colors.liveliness,
                    dataset: params.datasets[scale].activeSupply,
                  },
                  {
                    id: "supply-in-loss",
                    title: "Supply in Loss",
                    color: colors.bitcoin,
                    dataset: params.datasets[scale].SupplyInLoss,
                  },
                ],
              });
            },
          },
        ],
      },
      {
        id: `${scale}-cointime-adjusted-yearly-inflation-rate`,
        icon: IconTablerBuildingFactory,
        name: "Cointime Yearly Inflation Rate",
        title: "Cointime-Adjusted Yearly Inflation Rate (%)",
        description: "",
        applyPreset(params) {
          return applyMultipleSeries({
            scale,
            ...params,
            priceScaleOptions: {
              halved: true,
              mode: PriceScaleMode.Logarithmic,
            },
            list: [
              {
                id: "cointime-adjusted-yearly-inflation-rate",
                title: "Cointime Adjusted (%)",
                color: colors.coinblocksCreated,
                dataset:
                  params.datasets[scale].cointimeAdjustedYearlyInflationRate,
              },
              {
                id: "yearly-inflation-rate",
                title: "Nominal (%)",
                color: colors.bitcoin,
                dataset: params.datasets[scale].yearlyInflationRate,
              },
            ],
          });
        },
      },
      {
        id: `${scale}-cointime-adjusted-transactions-velocity`,
        icon: IconTablerWind,
        name: "Cointime Velocity",
        title: "Cointime-Adjusted Transactions Velocity",
        description: "",
        applyPreset(params) {
          return applyMultipleSeries({
            scale,
            ...params,
            priceScaleOptions: {
              halved: true,
              mode: PriceScaleMode.Logarithmic,
            },
            list: [
              {
                id: "cointime-adjusted-transactions-velocity",
                title: "Cointime Adjusted",
                color: colors.coinblocksCreated,
                dataset: params.datasets[scale].cointimeAdjustedVelocity,
              },
              {
                id: "transactions-velocity",
                title: "Nominal",
                color: colors.bitcoin,
                dataset: params.datasets[scale].transactionsVelocity,
              },
            ],
          });
        },
      },
      {
        id: `${scale}-cointime-capitalizations-folder`,
        name: "Capitalizations",
        tree: [
          {
            id: `${scale}-cointime-capitalizations`,
            icon: IconTablerArrowsCross,
            name: "All",
            title: "Cointime Capitalizations",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                  mode: PriceScaleMode.Logarithmic,
                },
                list: [
                  {
                    id: "thermo-cap",
                    title: "Thermo Cap",
                    color: colors.thermoCap,
                    dataset: params.datasets[scale].thermoCap,
                  },
                  {
                    id: "investor-cap",
                    title: "Investor Cap",
                    color: colors.investorCap,
                    dataset: params.datasets[scale].investorCapitalization,
                  },
                  {
                    id: "realized-cap",
                    title: "Realized Cap",
                    color: colors.realizedCap,
                    dataset:
                      params.datasets[scale].CumulatedNetRealizedProfitAndLoss,
                  },
                  {
                    id: "market-cap",
                    title: "Market Cap",
                    color: colors.bitcoin,
                    dataset: params.datasets[scale].marketCapitalization,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-thermo-cap`,
            icon: IconTablerPick,
            name: "Thermo Cap",
            title: "Thermo Cap",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                  mode: PriceScaleMode.Logarithmic,
                },
                list: [
                  {
                    id: "thermo-cap",
                    title: "Thermo Cap",
                    color: colors.thermoCap,
                    dataset: params.datasets[scale].thermoCap,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-investor-cap`,
            icon: IconTablerTie,
            name: "Investor Cap",
            title: "Investor Cap",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                  mode: PriceScaleMode.Logarithmic,
                },
                list: [
                  {
                    id: "investor-cap",
                    title: "Investor Cap",
                    color: colors.investorCap,
                    dataset: params.datasets[scale].investorCapitalization,
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-thermo-cap-to-investor-cap-ratio`,
            icon: IconTablerDivide,
            name: "Thermo To Investor Cap Ratio",
            title: "Thermo To Investor Capitalization Ratio (%)",
            description: "",
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                priceScaleOptions: {
                  halved: true,
                },
                list: [
                  {
                    id: "investor-cap",
                    title: "Investor Cap",
                    color: colors.bitcoin,
                    dataset: params.datasets[scale].thermoCapToInvestorCapRatio,
                  },
                ],
              });
            },
          },
        ],
      },
      {
        id: `${scale}-cointime-prices-folder`,
        name: "Prices",
        tree: [
          {
            id: `${scale}-active-price-folder`,
            name: "Active",
            tree: [
              {
                id: `${scale}-active-price`,
                icon: IconTablerHeartBolt,
                name: "Price",
                title: "Active Price",
                description: "",
                applyPreset(params) {
                  return applyMultipleSeries({
                    scale,
                    ...params,
                    list: [
                      {
                        id: "active-price",
                        title: "Active Price",
                        color: colors.liveliness,
                        dataset: params.datasets[scale].activePrice,
                      },
                      {
                        id: "realized-price",
                        title: "Realized Price",
                        color: colors.bitcoin,
                        dataset: params.datasets[scale].PricePaidMean,
                      },
                    ],
                  });
                },
              },
              createRatioPresetFolder({
                scale,
                color: colors.liveliness,
                id: "active-price",
                datasetKey: "activePrice",
                title: "Active Price",
              }),
            ],
          },
          {
            id: `${scale}-vaulted-price-folder`,
            name: "Vaulted",
            tree: [
              {
                id: `${scale}-vaulted-price`,
                icon: IconTablerBuildingBank,
                name: "Price",
                title: "Vaulted Price",
                description: "",
                applyPreset(params) {
                  return applyMultipleSeries({
                    scale,
                    ...params,
                    list: [
                      {
                        id: "vaulted-price",
                        title: "Vaulted Price",
                        color: colors.vaultedness,
                        dataset: params.datasets[scale].vaultedPrice,
                      },
                    ],
                  });
                },
              },
              createRatioPresetFolder({
                scale,
                color: colors.vaultedness,
                id: "vaulted-price",
                datasetKey: "vaultedPrice",
                title: "Vaulted Price",
              }),
            ],
          },
          {
            id: `${scale}-true-market-mean-folder`,
            name: "True Market Mean",
            tree: [
              {
                id: `${scale}-true-market-mean`,
                icon: IconTablerStackMiddle,
                name: "Price",
                title: "True Market Mean (Price)",
                description: "",
                applyPreset(params) {
                  return applyMultipleSeries({
                    scale,
                    ...params,
                    list: [
                      {
                        id: "true-market-mean",
                        title: "True Market Mean",
                        color: colors.trueMarketMeanPrice,
                        dataset: params.datasets[scale].trueMarketMean,
                      },
                    ],
                  });
                },
              },
              createRatioPresetFolder({
                scale,
                color: colors.trueMarketMeanPrice,
                id: "true-market-mean",
                datasetKey: "trueMarketMean",
                title: "True Market Mean",
              }),
            ],
          },
        ],
      },
    ],
  } as PresetFolder;
}
