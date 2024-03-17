import {
  applyMultipleSeries,
  colors,
  createRatioPresetFolder,
} from "/src/scripts";

import { averages } from "../../datasets/lazy";

export const presets: PresetFolder = {
  id: "averages",
  name: "Averages",
  tree: averages.map(({ name, key }) =>
    createPresetFolder({
      id: `${key.toLowerCase()}-sma`,
      color: colors[`closes${key}MA`],
      name,
      key,
    }),
  ),
};

function createPresetFolder({
  id,
  color,
  name,
  key,
}: {
  id: string;
  color: string;
  name: string;
  key: AverageName;
}): PresetFolder {
  return {
    id,
    name,
    tree: [
      {
        id: `${id}-value`,
        name: `Value`,
        description: "",
        icon: IconTablerMathAvg,
        title: `${name} Moving Average`,
        applyPreset(params) {
          return applyMultipleSeries({
            scale: "date",
            ...params,
            list: [
              {
                id,
                title: `${name} Moving Average`,
                color,
                dataset: params.datasets.date[`price${key}MA`],
              },
            ],
          });
        },
      },
      createRatioPresetFolder({
        scale: "date",
        id,
        color,
        title: `${name} Moving Average`,
        datasetKey: `price${key}MA`,
      }),
    ],
  };
}
