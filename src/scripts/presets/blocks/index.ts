import { LineStyle } from "lightweight-charts";

import { applyMultipleSeries, colors, SeriesType } from "/src/scripts";

export const presets: PresetFolder = {
  id: "blocks",
  name: "Blocks",
  tree: [
    {
      id: "blocks-new",
      icon: IconTablerCube,
      name: "New",
      title: "New Blocks",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "new-blocks",
              title: "New",
              color: colors.darkBitcoin,
              dataset: params.datasets.dateToNewBlocks,
            },
            {
              id: "new-blocks",
              title: "30 Day Moving Average",
              color: colors.bitcoin,
              dataset: params.datasets.dateToNewBlocks30dSMA,
            },
            {
              id: "target",
              title: "Target",
              color: colors.white,
              dataset: params.datasets.dateTo144,
              options: {
                lineStyle: LineStyle.LargeDashed,
              },
            },
          ],
        });
      },
    },
    {
      id: "blocks-total",
      icon: IconTablerWall,
      name: "Total",
      title: "Total Blocks",
      description: "",
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "total-blocks",
              title: "Total",
              color: colors.bitcoin,
              seriesType: SeriesType.Area,
              dataset: params.datasets.dateToBlocksTotal,
            },
          ],
        });
      },
    },
  ],
};
