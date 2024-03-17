import {
  applyMultipleSeries,
  colors,
  createMomentumPresetFolder,
  SeriesType,
} from "/src/scripts";

type HeightRatioKey =
  | `${AnyPossibleCohortKey}RealizedPrice`
  | "activePrice"
  | "vaultedPrice"
  | "trueMarketMean";

// type DateRatioKey = HeightRatioKey;
type DateRatioKey = HeightRatioKey | `price${AverageName}MA`;

export function createRatioPresetFolder<
  Scale extends ResourceScale,
  Key extends DateRatioKey = Scale extends "date"
    ? DateRatioKey
    : HeightRatioKey,
>({
  scale,
  id,
  title,
  datasetKey,
  color,
}: {
  // scale: Scale;
  scale: ResourceScale;
  id: string;
  title: string;
  color: string;
  datasetKey: Key;
}): PresetFolder {
  return {
    id: `${scale}-${id}-ratio`,
    name: "Ratio",
    tree: [
      {
        id: `${scale}-${id}-ratio-value`,
        name: `Value`,
        title: `Bitcoin Price to ${title} Ratio`,
        icon: () => IconTablerDivide,
        applyPreset(params) {
          return applyMultipleSeries({
            scale,
            ...params,
            priceScaleOptions: {
              halved: true,
            },
            list: [
              {
                id: "ratio",
                title: "Ratio",
                seriesType: SeriesType.Based,
                dataset: params.datasets[scale][`${datasetKey}Ratio`],
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
        id: `${scale}-${id}-ratio-1y-average`,
        name: "Averages",
        tree: [
          {
            id: `${scale}-${id}-ratio-averages`,
            name: `7 Day VS. 1 Year`,
            title: `Bitcoin Price to ${title} Ratio Moving Averages`,
            icon: () => IconTablerSwords,
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
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
                    dataset: params.datasets[scale][`${datasetKey}Ratio`],
                    options: {
                      base: 1,
                    },
                  },
                  {
                    id: "7d",
                    title: "7 Day Moving Average",
                    color: colors.closes7DMA,
                    dataset:
                      params.datasets[scale][
                        `${datasetKey}Ratio7DayMovingAverage`
                      ],
                  },
                  {
                    id: "1y",
                    title: "1 Year Moving Average",
                    color: colors.closes1YMA,
                    dataset:
                      params.datasets[scale][
                        `${datasetKey}Ratio1YearMovingAverage`
                      ],
                  },
                ],
              });
            },
            description: "",
          },
          createMomentumPresetFolder({
            scale,
            id: `${scale}-${id}-ratio-averages`,
            title: `${datasetKey} Ratio Moving Averages`,
            datasetKey: `${datasetKey}Ratio`,
          }),
        ],
      },
      {
        id: `${scale}-${id}-ratio-extremes`,
        name: "Extremes",
        tree: [
          {
            id: `${scale}-${id}-extreme-top-ratios`,
            name: "Top Ratios",
            description: "",
            icon: () => IconTablerJetpack,
            title: `${datasetKey} Extreme Top Ratios`,
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
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
                    dataset: params.datasets[scale][`${datasetKey}Ratio`],
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
                      params.datasets[scale][
                        `${datasetKey}Ratio99.9Percentile`
                      ],
                    color: colors.extremeMax,
                  },
                  {
                    id: "99.5-percentile",
                    title: "99.5th Percentile",
                    color: colors.extremeMiddle,
                    dataset:
                      params.datasets[scale][
                        `${datasetKey}Ratio99.5Percentile`
                      ],
                  },
                  {
                    id: "99-percentile",
                    title: "99th Percentile",
                    color: colors.extremeMin,
                    dataset:
                      params.datasets[scale][`${datasetKey}Ratio99Percentile`],
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-${id}-extreme-bottom-ratios`,
            name: "Bottom Ratios",
            description: "",
            icon: () => IconTablerScubaMask,
            title: `${datasetKey} Extreme Bottom Ratios`,
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
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
                    dataset: params.datasets[scale][`${datasetKey}Ratio`],
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
                      params.datasets[scale][`${datasetKey}Ratio1Percentile`],
                  },
                  {
                    id: "0.5-percentile",
                    title: "0.5th Percentile",
                    color: colors.extremeMiddle,
                    dataset:
                      params.datasets[scale][`${datasetKey}Ratio0.5Percentile`],
                  },
                  {
                    id: "0.1-percentile",
                    title: "0.1th Percentile",
                    color: colors.extremeMax,
                    dataset:
                      params.datasets[scale][`${datasetKey}Ratio0.1Percentile`],
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-${id}-extreme-top-prices`,
            name: "Top Prices",
            description: "",
            icon: () => IconTablerRocket,
            title: `${datasetKey} Extreme Top Prices`,
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                list: [
                  {
                    id: "99.9-percentile",
                    title: "99.9th Percentile",
                    color: colors.extremeMax,
                    dataset:
                      params.datasets[scale][`${datasetKey}Ratio99.9Price`],
                  },
                  {
                    id: "99.5-percentile",
                    title: "99.5th Percentile",
                    color: colors.extremeMiddle,
                    dataset:
                      params.datasets[scale][`${datasetKey}Ratio99.5Price`],
                  },
                  {
                    id: "99-percentile",
                    title: "99th Percentile",
                    color: colors.extremeMin,
                    dataset:
                      params.datasets[scale][`${datasetKey}Ratio99Price`],
                  },
                ],
              });
            },
          },
          {
            id: `${scale}-${id}-extreme-bottom-prices`,
            name: "Bottom Prices",
            description: "",
            icon: () => IconTablerSubmarine,
            title: `${datasetKey} Extreme Bottom Prices`,
            applyPreset(params) {
              return applyMultipleSeries({
                scale,
                ...params,
                list: [
                  {
                    id: "1-percentile",
                    title: "1st Percentile",
                    color: colors.extremeMin,
                    dataset: params.datasets[scale][`${datasetKey}Ratio1Price`],
                  },
                  {
                    id: "0.5-percentile",
                    title: "0.5th Percentile",
                    color: colors.extremeMiddle,
                    dataset:
                      params.datasets[scale][`${datasetKey}Ratio0.5Price`],
                  },
                  {
                    id: "0.1-percentile",
                    title: "0.1th Percentile",
                    color: colors.extremeMax,
                    dataset:
                      params.datasets[scale][`${datasetKey}Ratio0.1Price`],
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
