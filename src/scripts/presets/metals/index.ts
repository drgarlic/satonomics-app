import { PriceScaleMode } from "lightweight-charts";

import { applyMultipleSeries, applyPriceSeries } from "/src/scripts";

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
        // TODO: Fix types
        icon: icon as any,
        name: "Price",
        title: `Bitcoin Price In ${name} (Troy Ounce)`,
        applyPreset(params) {
          return applyMultipleSeries({
            ...params,
            priceDataset: getDataset(params.datasets),
          });
        },
        description: "",
      },
      {
        id: `performance-${id.toLowerCase()}`,
        icon: IconTablerPercentage,
        name: `Performance`,
        title: `Bitcoin ${name} (Troy Ounce) Performance`,
        applyPreset(params) {
          return applyMultipleSeries({
            ...params,
            priceDataset: getDataset(params.datasets),
            priceOptions: {
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
