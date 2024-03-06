import { PriceScaleMode } from "lightweight-charts";

import { applyMultipleSeries, colors, SeriesType } from "/src/scripts";

export const presets: PresetFolder = {
  id: "transactions",
  name: "Transactions",
  tree: [
    {
      id: "transaction-count",
      icon: IconTablerHandThreeFingers,
      name: "Count",
      title: "Transaction Count",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "transaction-count",
              title: "Transaction Count",
              color: colors.bitcoin,
              dataset: params.datasets.dateToTransactionCount,
            },
          ],
        });
      },
    },
    {
      id: "transaction-volume",
      icon: IconTablerVolume2,
      name: "Volume",
      title: "Transaction Volume",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "transaction-volume",
              title: "Transaction Volume",
              color: colors.bitcoin,
              dataset: params.datasets.dateToTransactionVolume,
            },
          ],
        });
      },
    },
    {
      id: "transaction-volume-annualized",
      icon: IconTablerVolume,
      name: "Volume Annualized",
      title: "Transaction Volume Annualized",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "transaction-volume-annualized",
              title: "Transaction Volume Annualized",
              color: colors.bitcoin,
              dataset: params.datasets.dateToTransactionVolumeAnnualized,
            },
          ],
        });
      },
    },
    {
      id: "transactions-velocity",
      icon: IconTablerWind,
      name: "Velocity",
      title: "Transactions Velocity",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "transactions-velocity",
              title: "Transactions Velocity",
              color: colors.bitcoin,
              dataset: params.datasets.dateToTransactionsVelocity,
            },
          ],
        });
      },
    },
  ],
};
