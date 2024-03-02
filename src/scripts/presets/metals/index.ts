import { PriceScaleMode } from "lightweight-charts";

import { applyPriceSeries } from "/src/scripts";

export const presets: PresetFolder = {
  id: "metals",
  name: "Metals",
  tree: [
    createPresetFolder({
      id: "xau",
      icon: IconTablerLetterG,
      name: "Gold",
      getDataset: (datasets) => datasets.priceInGold,
    }),
    createPresetFolder({
      id: "xag",
      icon: IconTablerLetterS,
      name: "Silver",
      getDataset: (datasets) => datasets.priceInSilver,
    }),
  ],
};

function createPresetFolder({
  id,
  icon,
  name,
  getDataset,
}: {
  id: string;
  name: string;
  icon: JSXElement;
  getDataset: (datasets: Datasets) => Dataset;
}): PresetFolder {
  return {
    id: `currency-${id}`,
    name: `${id.toUpperCase()} - ${name}`,
    tree: [
      {
        id: `price-${id.toLowerCase()}`,
        icon,
        name: "Price",
        title: `Bitcoin Price In ${name} (Troy Ounce)`,
        applyPreset({ chart, datasets, preset }) {
          return applyPriceSeries({
            chart,
            datasets,
            preset,
            dataset: getDataset(datasets),
          });
        },
        description: "",
      },
      {
        id: `performance-${id.toLowerCase()}`,
        icon: IconTablerPercentage,
        name: `Performance`,
        title: `Bitcoin ${name} (Troy Ounce) Performance`,
        applyPreset({ chart, datasets, preset }) {
          return applyPriceSeries({
            chart,
            datasets,
            preset,
            dataset: getDataset(datasets),
            options: {
              priceScaleOptions: {
                mode: PriceScaleMode.Percentage,
              },
            },
          });
        },
        description: "",
      },
    ],
  };
}
