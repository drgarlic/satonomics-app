import { PriceScaleMode } from "lightweight-charts";

import {
  applyMultipleSeries,
  colors,
  createRatioPresetFolder,
  SeriesType,
} from "/src/scripts";

export const presets: PresetFolder = {
  id: "cointime-economics",
  name: "Cointime Economics",
  tree: [
    {
      id: "coinblocks",
      name: "Coinblocks",
      tree: [
        {
          id: "coinblocks-created",
          icon: IconTablerCube,
          name: "Created",
          title: "Coinblocks Created",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "coinblocks-created",
                  title: "Coinblocks Created",
                  color: colors.coinblocksCreated,
                  dataset: params.datasets.dateToCoinblocksCreated,
                },
              ],
            });
          },
        },
        {
          id: "coinblocks-destroyed",
          icon: IconTablerFileShredder,
          name: "Destroyed",
          title: "Coinblocks Destroyed",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "coinblocks-destroyed",
                  title: "Coinblocks Destroyed",
                  color: colors.coinblocksDestroyed,
                  dataset: params.datasets.dateToCoinblocksDestroyed,
                },
              ],
            });
          },
        },
        {
          id: "coinblocks-stored",
          icon: IconTablerBuildingWarehouse,
          name: "Stored",
          title: "Coinblocks Stored",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "coinblocks-stored",
                  title: "Coinblocks Stored",
                  color: colors.coinblocksStored,
                  dataset: params.datasets.dateToCoinblocksStored,
                },
              ],
            });
          },
        },
        {
          id: "coinblocks-crossed",
          icon: IconTablerArrowsCross,
          name: "Crossed",
          title: "Coinblocks",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "coinblocks-created",
                  title: "Coinblocks Created",
                  color: colors.coinblocksCreated,
                  dataset: params.datasets.dateToCoinblocksCreated,
                },
                {
                  id: "coinblocks-destroyed",
                  title: "Coinblocks Destroyed",
                  color: colors.coinblocksDestroyed,
                  dataset: params.datasets.dateToCoinblocksDestroyed,
                },
                {
                  id: "coinblocks-stored",
                  title: "Coinblocks Stored",
                  color: colors.coinblocksStored,
                  dataset: params.datasets.dateToCoinblocksStored,
                },
              ],
            });
          },
        },
      ],
    },
    {
      id: "cumulated-coinblocks",
      name: "Cumulated Coinblocks",
      tree: [
        {
          id: "cumulated-coinblocks-created",
          icon: IconTablerCube,
          name: "Created",
          title: "Cumulated Coinblocks Created",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "cumulated-coinblocks-created",
                  title: "Cumulated Coinblocks Created",
                  color: colors.coinblocksCreated,
                  dataset: params.datasets.dateToCumulatedCoinblocksCreated,
                },
              ],
            });
          },
        },
        {
          id: "cumulated-coinblocks-destroyed",
          icon: IconTablerFileShredder,
          name: "Destroyed",
          title: "Cumulated Coinblocks Destroyed",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "cumulated-coinblocks-destroyed",
                  title: "Cumulated Coinblocks Destroyed",
                  color: colors.coinblocksDestroyed,
                  dataset: params.datasets.dateToCumulatedCoinblocksDestroyed,
                },
              ],
            });
          },
        },
        {
          id: "cumulated-coinblocks-stored",
          icon: IconTablerBuildingWarehouse,
          name: "Stored",
          title: "Cumulated Coinblocks Stored",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "cumulated-coinblocks-stored",
                  title: "Cumulated Coinblocks Stored",
                  color: colors.coinblocksStored,
                  dataset: params.datasets.dateToCumulatedCoinblocksStored,
                },
              ],
            });
          },
        },
        {
          id: "cumulated-coinblocks-crossed",
          icon: IconTablerArrowsCross,
          name: "Crossed",
          title: "Cumulated Coinblocks (Crossed)",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "coinblocks-created",
                  title: "Cumulated Coinblocks Created",
                  color: colors.coinblocksCreated,
                  dataset: params.datasets.dateToCumulatedCoinblocksCreated,
                },
                {
                  id: "coinblocks-destroyed",
                  title: "Cumulated Coinblocks Destroyed",
                  color: colors.coinblocksDestroyed,
                  dataset: params.datasets.dateToCumulatedCoinblocksDestroyed,
                },
                {
                  id: "coinblocks-stored",
                  title: "Cumulated Coinblocks Stored",
                  color: colors.coinblocksStored,
                  dataset: params.datasets.dateToCumulatedCoinblocksStored,
                },
              ],
            });
          },
        },
        {
          id: "cumulated-coinblocks-stacked",
          icon: IconTablerStack,
          name: "Stacked",
          title: "Cumulated Coinblocks (Stacked)",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "coinblocks-destroyed",
                  title: "Cumulated Coinblocks Destroyed",
                  color: colors.coinblocksDestroyed,
                  seriesType: SeriesType.Stacked,
                  dataset: params.datasets.dateToCumulatedCoinblocksDestroyed,
                },
                {
                  id: "coinblocks-stored",
                  title: "Cumulated Coinblocks Stored",
                  color: colors.coinblocksStored,
                  seriesType: SeriesType.Stacked,
                  dataset: params.datasets.dateToCumulatedCoinblocksStored,
                },
              ],
            });
          },
        },
      ],
    },
    {
      id: "liveliness-and-vaultedness",
      name: "Liveliness & Vaultedness",
      tree: [
        {
          id: "liveliness",
          icon: IconTablerHeartBolt,
          name: "Liveliness - Activity",
          title: "Liveliness (Activity)",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "liveliness",
                  title: "Liveliness",
                  color: colors.liveliness,
                  dataset: params.datasets.dateToLiveliness,
                },
              ],
            });
          },
        },
        {
          id: "vaultedness",
          icon: IconTablerBuildingBank,
          name: "Vaultedness",
          title: "Vaultedness",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "vaultedness",
                  title: "Vaultedness",
                  color: colors.vaultedness,
                  dataset: params.datasets.dateToVaultedness,
                },
              ],
            });
          },
        },
        {
          id: "liveliness-vs-vaultedness-crossed",
          icon: IconTablerArrowsCross,
          name: "Crossed",
          title: "Liveliness VS. Vaultedness (Crossed)",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "liveliness",
                  title: "Liveliness",
                  color: colors.liveliness,
                  dataset: params.datasets.dateToLiveliness,
                },
                {
                  id: "vaultedness",
                  title: "Vaultedness",
                  color: colors.vaultedness,
                  dataset: params.datasets.dateToVaultedness,
                },
              ],
            });
          },
        },
        {
          id: "liveliness-vs-vaultedness-stacked",
          icon: IconTablerStack,
          name: "Stacked",
          title: "Liveliness VS. Vaultedness (Stacked)",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "liveliness",
                  title: "Liveliness",
                  color: colors.liveliness,
                  dataset: params.datasets.dateToLiveliness,
                  seriesType: SeriesType.Stacked,
                },
                {
                  id: "vaultedness",
                  title: "Vaultedness",
                  color: colors.vaultedness,
                  dataset: params.datasets.dateToVaultedness,
                  seriesType: SeriesType.Stacked,
                },
              ],
            });
          },
        },
        {
          id: "activity-to-vaultedness-ratio",
          icon: IconTablerDivide,
          name: "A2VR - Activity To Vaultedness Ratio",
          title: "Activity To Vaultedness Ratio (A2VR)",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "activity-to-vaultedness-ratio",
                  title: "Activity To Vaultedness Ratio",
                  color: colors.activityToVaultednessRatio,
                  dataset: params.datasets.dateToActvityToVaultednessRatio,
                },
              ],
            });
          },
        },
        {
          id: "concurrent-liveliness",
          icon: IconTablerHeartBolt,
          name: "Concurrent Liveliness - Supply Adjusted Coindays Destroyed",
          title: "Concurrent Liveliness - Supply Adjusted Coindays Destroyed",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "concurrent-liveliness",
                  title: "Concurrent Liveliness 14d Median",
                  color: `${colors.liveliness}66`,
                  dataset: params.datasets.dateToConcurrentLiveliness,
                },
                {
                  id: "concurrent-liveliness",
                  title: "Concurrent Liveliness",
                  color: colors.liveliness,
                  dataset: params.datasets.dateToConcurrentLiveliness14dMedian,
                },
              ],
            });
          },
        },
        {
          id: "liveliness-incremental-change",
          icon: IconTablerStairs,
          name: "Liveliness Incremental Change",
          title: "Liveliness Incremental Change",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
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
                  dataset: params.datasets.dateToLivelinessIncrementalChange,
                },
                {
                  id: "liveliness-incremental-change-14d-median",
                  title: "Liveliness Incremental Change 14 Day Median",
                  color: colors.liveliness,
                  seriesType: SeriesType.Based,
                  dataset:
                    params.datasets.dateToLivelinessIncrementalChange14dMedian,
                },
              ],
            });
          },
        },
      ],
    },
    {
      id: "coinblocks-supply",
      name: "Supply",
      tree: [
        {
          id: "vaulted-supply",
          icon: IconTablerBuildingBank,
          name: "Vaulted",
          title: "Vaulted Supply",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "vaulted-supply",
                  title: "Vaulted Supply",
                  color: colors.vaultedness,
                  dataset: params.datasets.dateToVaultedSupply,
                },
              ],
            });
          },
        },
        {
          id: "active-supply",
          icon: IconTablerHeartBolt,
          name: "Active",
          title: "Active Supply",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "active-supply",
                  title: "Active Supply",
                  color: colors.liveliness,
                  dataset: params.datasets.dateToActiveSupply,
                },
              ],
            });
          },
        },
        {
          id: "vaulted-supply-vs-active-supply-crossed",
          icon: IconTablerArrowsCross,
          name: "VS. Crossed",
          title: "Vaulted VS. Active (Crossed)",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "circulating-supply",
                  title: "Circulating Supply",
                  color: colors.coinblocksCreated,
                  dataset: params.datasets.dateToSupplyTotal,
                },
                {
                  id: "vaulted",
                  title: "Vaulted Supply",
                  color: colors.vaultedness,
                  dataset: params.datasets.dateToVaultedSupply,
                },
                {
                  id: "active",
                  title: "Active Supply",
                  color: colors.liveliness,
                  dataset: params.datasets.dateToActiveSupply,
                },
              ],
            });
          },
        },
        {
          id: "vaulted-supply-vs-active-supply-stacked",
          icon: IconTablerStack,
          name: "VS. Stacked",
          title: "Vaulted VS. Active (Stacked)",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "vaulted",
                  title: "Vaulted Supply",
                  color: colors.vaultedness,
                  dataset: params.datasets.dateToVaultedSupply,
                  seriesType: SeriesType.Stacked,
                },
                {
                  id: "active",
                  title: "Active Supply",
                  color: colors.liveliness,
                  dataset: params.datasets.dateToActiveSupply,
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
          id: "vaulted-supply-net-change",
          icon: IconTablerBuildingBank,
          name: "Vaulted Net Change",
          title: "Vaulted Supply Net Change",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "vaulted-supply-net-change",
                  title: "Vaulted Supply Net Change",
                  color: colors.vaultedness,
                  dataset: params.datasets.dateToVaultedSupplyNetChange,
                },
              ],
            });
          },
        },
        {
          id: "active-supply-net-change",
          icon: IconTablerHeartBolt,
          name: "Active Net Change",
          title: "Active Supply Net Change",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "active-supply-net-change",
                  title: "Active Supply Net Change",
                  color: colors.liveliness,
                  dataset: params.datasets.dateToActiveSupplyNetChange,
                },
              ],
            });
          },
        },
        {
          id: "active-vs-vaulted-supply-90d-net-change",
          icon: IconTablerSwords,
          name: "Active VS. Vaulted 90D Net Change",
          title: "Active VS. Vaulted 90 Day Supply Net Change",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "active-supply-net-change",
                  title: "Active Supply Net Change",
                  color: `${colors.liveliness}80`,
                  dataset: params.datasets.dateToActiveSupply90dNetChange,
                  seriesType: SeriesType.Based,
                },
                {
                  id: "vaulted-supply-net-change",
                  title: "Vaulted Supply Net Change",
                  color: `${colors.vaultedPrice}80`,
                  seriesType: SeriesType.Based,
                  dataset: params.datasets.dateToVaultedSupply90dNetChange,
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
        //             params.datasets.dateToVaultedAnnualizedSupplyNetChange,
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
        //           dataset: params.datasets.dateToVaultingRate,
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
        //               .dateToActiveSupplyChangeFromIssuance90dChange,
        //         },
        //         {
        //           id: 'transactions-change',
        //           title: 'Change From Transactions',
        //           color: colors.rose,
        //           dataset:
        //             params.datasets
        //               .dateToActiveSupplyChangeFromTransactions90dChange,
        //         },
        //         // {
        //         //   id: 'active',
        //         //   title: 'Active Supply',
        //         //   color: colors.liveliness,
        //         //   dataset: params.datasets.dateToActiveSupply,
        //         // },
        //       ],
        //     })
        //   },
        // },

        {
          id: "cointime-supply-in-profit",
          icon: IconTablerTrendingUp,
          name: "In Profit",
          title: "Cointime Supply In Profit",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "circulating-supply",
                  title: "Circulating Supply",
                  color: colors.coinblocksCreated,
                  dataset: params.datasets.dateToSupplyTotal,
                },
                {
                  id: "vaulted",
                  title: "Vaulted Supply",
                  color: colors.vaultedness,
                  dataset: params.datasets.dateToVaultedSupply,
                },
                {
                  id: "supply-in-profit",
                  title: "Supply in profit",
                  color: colors.bitcoin,
                  dataset: params.datasets.dateToSupplyInProfit,
                },
              ],
            });
          },
        },
        {
          id: "cointime-supply-in-loss",
          icon: IconTablerTrendingDown,
          name: "In Loss",
          title: "Cointime Supply In Loss",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "circulating-supply",
                  title: "Circulating Supply",
                  color: colors.coinblocksCreated,
                  dataset: params.datasets.dateToSupplyTotal,
                },
                {
                  id: "active",
                  title: "Active Supply",
                  color: colors.liveliness,
                  dataset: params.datasets.dateToActiveSupply,
                },
                {
                  id: "supply-in-loss",
                  title: "Supply in Loss",
                  color: colors.bitcoin,
                  dataset: params.datasets.dateToSupplyInLoss,
                },
              ],
            });
          },
        },
      ],
    },
    {
      id: "cointime-adjusted-yearly-inflation-rate",
      icon: IconTablerBuildingFactory,
      name: "Cointime Yearly Inflation Rate",
      title: "Cointime-Adjusted Yearly Inflation Rate (%)",
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
              id: "cointime-adjusted-yearly-inflation-rate",
              title: "Cointime Adjusted (%)",
              color: colors.coinblocksCreated,
              dataset:
                params.datasets.dateToCointimeAdjustedYearlyInflationRate,
            },
            {
              id: "yearly-inflation-rate",
              title: "Nominal (%)",
              color: colors.bitcoin,
              dataset: params.datasets.dateToYearlyInflationRate,
            },
          ],
        });
      },
    },
    {
      id: "cointime-adjusted-transactions-velocity",
      icon: IconTablerWind,
      name: "Cointime Velocity",
      title: "Cointime-Adjusted Transactions Velocity",
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
              id: "cointime-adjusted-transactions-velocity",
              title: "Cointime Adjusted",
              color: colors.coinblocksCreated,
              dataset: params.datasets.dateToCointimeAdjustedVelocity,
            },
            {
              id: "transactions-velocity",
              title: "Nominal",
              color: colors.bitcoin,
              dataset: params.datasets.dateToTransactionsVelocity,
            },
          ],
        });
      },
    },
    {
      id: "cointime-capitalizations-folder",
      name: "Capitalizations",
      tree: [
        {
          id: "cointime-capitalizations",
          icon: IconTablerArrowsCross,
          name: "All",
          title: "Cointime Capitalizations",
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
                  id: "thermo-cap",
                  title: "Thermo Cap",
                  color: colors.thermoCap,
                  dataset: params.datasets.dateToThermoCap,
                },
                {
                  id: "investor-cap",
                  title: "Investor Cap",
                  color: colors.investorCap,
                  dataset: params.datasets.dateToInvestorCapitalization,
                },
                {
                  id: "realized-cap",
                  title: "Realized Cap",
                  color: colors.realizedCap,
                  dataset:
                    params.datasets.dateToCumulatedNetRealizedProfitAndLoss,
                },
                {
                  id: "market-cap",
                  title: "Market Cap",
                  color: colors.bitcoin,
                  dataset: params.datasets.dateToMarketCapitalization,
                },
              ],
            });
          },
        },
        {
          id: "thermo-cap",
          icon: IconTablerPick,
          name: "Thermo Cap",
          title: "Thermo Cap",
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
                  id: "thermo-cap",
                  title: "Thermo Cap",
                  color: colors.thermoCap,
                  dataset: params.datasets.dateToThermoCap,
                },
              ],
            });
          },
        },
        {
          id: "investor-cap",
          icon: IconTablerTie,
          name: "Investor Cap",
          title: "Investor Cap",
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
                  id: "investor-cap",
                  title: "Investor Cap",
                  color: colors.investorCap,
                  dataset: params.datasets.dateToInvestorCapitalization,
                },
              ],
            });
          },
        },
        {
          id: "thermo-cap-to-investor-cap-ratio",
          icon: IconTablerDivide,
          name: "Thermo To Investor Cap Ratio",
          title: "Thermo To Investor Capitalization Ratio (%)",
          description: "",
          applyPreset(params) {
            return applyMultipleSeries({
              ...params,
              priceScaleOptions: {
                halved: true,
              },
              list: [
                {
                  id: "investor-cap",
                  title: "Investor Cap",
                  color: colors.bitcoin,
                  dataset: params.datasets.dateToThermoCapToInvestorCapRatio,
                },
              ],
            });
          },
        },
      ],
    },
    {
      id: "cointime-prices-folder",
      name: "Prices",
      tree: [
        {
          id: "active-price-folder",
          name: "Active",
          tree: [
            {
              id: "active-price",
              icon: IconTablerHeartBolt,
              name: "Price",
              title: "Active Price",
              description: "",
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  list: [
                    {
                      id: "active-price",
                      title: "Active Price",
                      color: colors.liveliness,
                      dataset: params.datasets.dateToActivePrice,
                    },
                    {
                      id: "realized-price",
                      title: "Realized Price",
                      color: colors.bitcoin,
                      dataset: params.datasets.dateToPricePaidMean,
                    },
                  ],
                });
              },
            },
            createRatioPresetFolder({
              color: colors.liveliness,
              id: "active-price",
              datasetKey: "ActivePrice",
              title: "Active Price",
            }),
          ],
        },
        {
          id: "vaulted-price-folder",
          name: "Vaulted",
          tree: [
            {
              id: "vaulted-price",
              icon: IconTablerBuildingBank,
              name: "Price",
              title: "Vaulted Price",
              description: "",
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  list: [
                    {
                      id: "vaulted-price",
                      title: "Vaulted Price",
                      color: colors.vaultedness,
                      dataset: params.datasets.dateToVaultedPrice,
                    },
                  ],
                });
              },
            },
            createRatioPresetFolder({
              color: colors.vaultedness,
              id: "vaulted-price",
              datasetKey: "VaultedPrice",
              title: "Vaulted Price",
            }),
          ],
        },
        {
          id: "true-market-mean-folder",
          name: "True Market Mean",
          tree: [
            {
              id: "true-market-mean",
              icon: IconTablerStackMiddle,
              name: "Price",
              title: "True Market Mean (Price)",
              description: "",
              applyPreset(params) {
                return applyMultipleSeries({
                  ...params,
                  list: [
                    {
                      id: "true-market-mean",
                      title: "True Market Mean",
                      color: colors.trueMarketMeanPrice,
                      dataset: params.datasets.dateToTrueMarketMean,
                    },
                  ],
                });
              },
            },
            createRatioPresetFolder({
              color: colors.trueMarketMeanPrice,
              id: "true-market-mean",
              datasetKey: "TrueMarketMean",
              title: "True Market Mean",
            }),
          ],
        },
      ],
    },
  ],
};
