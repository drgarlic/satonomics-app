import { createLazyMemo } from "@solid-primitives/memo";

import {
  allPossibleCohortKeys,
  colors,
  computeMovingAverage,
  sortedInsert,
} from "/src/scripts";

import { appendRatioLazyDatasets } from "./ratio";

const MEDIAN = 0.5;
const FIRST_USABLE_MEAN_RATIO_DATE = "2012-01-01";

export enum Momentum {
  red = 1,
  yellow = 2,
  green = 3,
}

function createLazyDataset<
  Scale extends ResourceScale,
  T extends SingleValueData = SingleValueData,
>(
  scale: Scale,
  calc: () => DatasetValue<T>[],
  sourcesList: Accessor<Sources>[],
): Dataset<Scale, T> {
  return {
    scale,
    values: createLazyMemo(calc),
    sources: createLazyMemo(() => {
      const map = new Map<string, Source>();
      sourcesList.forEach((sources) => {
        sources().forEach((value, key) => {
          map.set(key, value);
        });
      });
      return map;
    }),
  };
}

export function createTransformedLazyDataset<
  Scale extends ResourceScale,
  T = undefined,
>(
  dataset: Dataset<Scale>,
  transform: (
    value: number,
    index: number,
    array: SingleValueData[],
    state?: T,
  ) => number,
  state?: T,
) {
  return createLazyDataset(
    dataset.scale,
    () =>
      (dataset.values() || []).map(({ time, number, value }, index, array) => ({
        number,
        time,
        value: transform(value, index, array, state),
      })),
    [dataset.sources],
  );
}

export function createNetChangeLazyDataset<Scale extends ResourceScale>(
  dataset: Dataset<Scale>,
  days = 1,
) {
  return createTransformedLazyDataset(
    dataset,
    (value, index, array) =>
      value - (index >= days ? array[index - days].value : 0),
  );
}

export function createAnnualizedLazyDataset<Scale extends ResourceScale>(
  dataset: Dataset<Scale>,
) {
  return createTransformedLazyDataset(
    dataset,
    (value, _, __, state) => {
      if (state!.last365values.length > 365) {
        throw Error("unreachable!");
      } else if (state!.last365values.length === 365) {
        state!.sum -= state!.last365values[0];
        state!.last365values = state!.last365values.slice(1);
      }

      state!.last365values.push(value);
      state!.sum += value;

      return state!.sum;
    },
    {
      last365values: [] as number[],
      sum: 0,
    },
  );
}

export function createMedianLazyDataset<Scale extends ResourceScale>(
  dataset: Dataset<Scale>,
  number: number,
) {
  if (!number) {
    throw Error("Median cannot be less than 1");
  }

  const isEven = number % 2 === 0;
  const halvedNumber = isEven ? number / 2 : Math.floor(number / 2);

  return createTransformedLazyDataset(
    dataset,
    (value, _, __, state) => {
      if (state!.lastXValues.length === number) {
        state!.lastXValues = state!.lastXValues.slice(1);
      }
      state!.lastXValues.push(value);
      const sorted = [...state!.lastXValues].sort();
      if (isEven) {
        return (sorted[halvedNumber - 1] + sorted[halvedNumber]) / 2;
      } else {
        return sorted[halvedNumber];
      }
    },
    {
      lastXValues: [] as number[],
    },
  );
}

function createLazyOffset<Scale extends ResourceScale>(
  source: Dataset<Scale>,
  toOffset: Dataset<Scale>,
) {
  return createLazyMemo(() => {
    const offset = toOffset
      .values()
      ?.findIndex(({ number }) => number === source.values()?.at(0)?.number);

    return !offset || offset === -1 ? 0 : offset;
  });
}

export function createAddedLazyDataset<Scale extends ResourceScale>(
  datasetRef: Dataset<Scale>,
  datasetToAdd: Dataset<Scale>,
) {
  const offset = createLazyOffset(datasetRef, datasetToAdd);

  return createLazyDataset(
    datasetRef.scale,
    () => {
      let secondValue = 0;
      let index = offset();

      const adders = datasetToAdd.values();

      return (datasetRef.values() || []).map(({ number, time, value }) => {
        const data = adders?.at(index);
        if (number === data?.number) {
          secondValue = data.value;
          index += 1;
        }

        return {
          number,
          time,
          value: value + secondValue,
        };
      });
    },
    [datasetRef.sources, datasetToAdd.sources],
  );
}

export function createSubtractedLazyDataset<Scale extends ResourceScale>(
  datasetRef: Dataset<Scale>,
  datasetToSubtract: Dataset<Scale>,
) {
  const offset = createLazyOffset(datasetRef, datasetToSubtract);

  return createLazyDataset(
    datasetRef.scale,
    () => {
      let toSubtract = 0;

      let index = offset();

      const subtracters = datasetToSubtract.values();

      return (datasetRef.values() || []).map(({ time, value, number }) => {
        const data = subtracters?.at(index);

        if (number === data?.number) {
          toSubtract = data.value;
          index += 1;
        }

        return {
          number,
          time,
          value: value - toSubtract,
        };
      });
    },
    [datasetRef.sources, datasetToSubtract.sources],
  );
}

export function createMultipliedLazyDataset<Scale extends ResourceScale>(
  datasetRef: Dataset<Scale>,
  multiplierDataset: Dataset<Scale>,
  defaultMultiplier = 1,
) {
  const offsetRef = createLazyOffset(multiplierDataset, datasetRef);

  const offsetMultiplier = createLazyOffset(datasetRef, multiplierDataset);

  return createLazyDataset(
    datasetRef.scale,
    () => {
      const multipliers = multiplierDataset.values();

      return (datasetRef.values() || [])
        .slice(offsetRef())
        .map(({ number, time, value }, index) => ({
          number,
          time,
          value:
            value *
            (multipliers?.at(index + offsetMultiplier())?.value ||
              defaultMultiplier),
        }));
    },
    [datasetRef.sources, multiplierDataset.sources],
  );
}

export const createDividedLazyDataset = <Scale extends ResourceScale>(
  datasetRef: Dataset<Scale>,
  dividerDataset: Dataset<Scale>,
  isPercentage?: boolean,
) => {
  const offsetRef = createLazyOffset(dividerDataset, datasetRef);

  const offsetDivider = createLazyOffset(datasetRef, dividerDataset);

  return createLazyDataset(
    datasetRef.scale,
    () => {
      const dividers = dividerDataset.values();

      return (datasetRef.values() || [])
        .slice(offsetRef())
        .map(({ number, time, value }, index) => ({
          number,
          time,
          value:
            (value / (dividers?.at(index + offsetDivider())?.value || 1)) *
            (isPercentage ? 100 : 1),
        }));
    },
    [datasetRef.sources, dividerDataset.sources],
  );
};

export const createCumulatedLazyDataset = <Scale extends ResourceScale>(
  dataset: Dataset<Scale>,
) =>
  createLazyDataset(
    dataset.scale,
    () => {
      let sum = 0;

      return (dataset.values() || []).map(({ number, time, value }) => {
        sum += value;

        return {
          number,
          time,
          value: sum,
        };
      });
    },
    [dataset.sources],
  );

export function createPercentageMomentumLazyDataset<
  Scale extends ResourceScale,
>(dataset: Dataset<Scale>) {
  return createLazyDataset(
    dataset.scale,
    () => {
      let momentum = Momentum.green;

      return (dataset.values() || []).map(({ number, time, value }) => {
        let _value: Momentum;

        if (momentum === Momentum.green) {
          if (value <= 45) {
            momentum = Momentum.red;
            _value = momentum;
          } else if (value < 50) {
            _value = Momentum.yellow;
          } else {
            _value = momentum;
          }
        } else {
          if (value >= 55) {
            momentum = Momentum.green;
            _value = momentum;
          } else if (value > 50) {
            _value = Momentum.yellow;
          } else {
            _value = momentum;
          }
        }

        return {
          number,
          time,
          value: _value,
          color:
            _value === Momentum.green
              ? colors.momentumGreen
              : _value === Momentum.yellow
                ? colors.momentumYellow
                : colors.momentumRed,
        };
      });
    },
    [dataset.sources],
  );
}

export function createBLSHBitcoinReturnsLazyDataset<
  Scale extends ResourceScale,
>({
  momentumDataset,
  price,
}: {
  momentumDataset: Dataset<Scale>;
  price: Dataset<Scale, DatasetCandlestickData>;
}) {
  return createLazyDataset(
    momentumDataset.scale,
    () => {
      let fiatAmount = 0;
      let btcAmount = 0;
      let dcaAmount = 100;
      let momentum = Momentum.green;

      const offset = createLazyOffset(price, momentumDataset);

      return (price.values() || []).map(
        ({ number, time, value: currentPrice }, index) => {
          const momentumI =
            momentumDataset.values()?.[index + offset()]?.value ||
            Momentum.green;

          if (momentum !== momentumI) {
            if (momentumI === Momentum.green) {
              momentum = momentumI;
              btcAmount = (fiatAmount + dcaAmount) / currentPrice;
              fiatAmount = 0;
            } else if (momentumI === Momentum.red) {
              momentum = momentumI;
              fiatAmount = btcAmount * currentPrice + dcaAmount;
              btcAmount = 0;
            }
          } else {
            if (momentum === Momentum.green) {
              btcAmount += dcaAmount / currentPrice;
            } else if (momentum === Momentum.red) {
              fiatAmount += dcaAmount;
            } else {
              throw Error("Unreachable");
            }
          }

          return {
            number,
            time,
            value: btcAmount + fiatAmount / currentPrice,
            fiat: fiatAmount + btcAmount * currentPrice,
          };
        },
      );
    },
    [momentumDataset.sources, price.sources],
  );
}

export function createBLSHDollarReturnsLazyDataset<
  Scale extends ResourceScale,
>({
  bitcoinReturns,
}: {
  bitcoinReturns: ReturnType<typeof createBLSHBitcoinReturnsLazyDataset<Scale>>;
}) {
  return createLazyDataset(
    bitcoinReturns.scale,
    () =>
      bitcoinReturns.values()?.map(({ number, time, fiat: value }) => ({
        number,
        time,
        value,
      })) || [],
    [bitcoinReturns.sources],
  );
}

export const createAnyPossibleCohortLazyDatasets = <
  Resources extends AnyResourceDatasets,
  Scale extends ResourceScale = Resources extends DateResourceDatasets
    ? "date"
    : "height",
>({
  resources,
  marketCapitalization,
}: {
  marketCapitalization: Dataset<Scale>;
  resources: Resources;
}) => {
  type PossibleKeys =
    | `${AnyPossibleCohortKey}PricePaidMean`
    | `${AnyPossibleCohortKey}RealizedPrice`
    | `${AnyPossibleCohortKey}RealizedCapitalization30dChange`
    | `${AnyPossibleCohortKey}UnrealizedLossNegative`
    | `${AnyPossibleCohortKey}NetUnrealizedProfitAndLoss`
    | `${AnyPossibleCohortKey}RelativeNetUnrealizedProfitAndLoss`
    | `${AnyPossibleCohortKey}RealizedLossNegative`
    | `${AnyPossibleCohortKey}NetRealizedProfitAndLoss`
    | `${AnyPossibleCohortKey}RelativeNetRealizedProfitAndLoss`
    | `${AnyPossibleCohortKey}CumulatedRealizedProfit`
    | `${AnyPossibleCohortKey}CumulatedRealizedLoss`
    | `${AnyPossibleCohortKey}CumulatedNetRealizedProfitAndLoss`
    | `${AnyPossibleCohortKey}CumulatedNetRealizedProfitAndLoss30dChange`
    | `${AnyPossibleCohortKey}SupplyInLoss`
    | `${AnyPossibleCohortKey}SupplyInLoss%Self`
    | `${AnyPossibleCohortKey}SupplyInLoss%All`
    | `${AnyPossibleCohortKey}SupplyInProfit%Self`
    | `${AnyPossibleCohortKey}SupplyInProfit%All`
    | `${AnyPossibleCohortKey}SupplyPNL%Self${MomentumKey}`
    | `${AnyPossibleCohortKey}SupplyTotal75Percent`
    | `${AnyPossibleCohortKey}SupplyTotal50Percent`
    | `${AnyPossibleCohortKey}SupplyTotal25Percent`
    | `${AnyPossibleCohortKey}SupplyTotal%All`
    | `${AnyPossibleCohortKey}RealizedPrice${RatioKey}`;

  const datasets: Partial<Record<PossibleKeys, Dataset<Scale>>> = {};

  allPossibleCohortKeys.forEach((name) => {
    const supplyTotal = resources.SupplyTotal as ResourceDataset<Scale>;
    const cohortSupplyTotal = resources[
      `${name}SupplyTotal`
    ] as ResourceDataset<Scale>;
    const supplyInProfit = resources[
      `${name}SupplyInProfit`
    ] as ResourceDataset<Scale>;
    const realizedLoss = resources[
      `${name}RealizedLoss`
    ] as ResourceDataset<Scale>;
    const realizedProfit = resources[
      `${name}RealizedProfit`
    ] as ResourceDataset<Scale>;
    const unrealizedLoss = resources[
      `${name}UnrealizedLoss`
    ] as ResourceDataset<Scale>;
    const unrealizedProfit = resources[
      `${name}UnrealizedProfit`
    ] as ResourceDataset<Scale>;
    const realizedCapitalization = resources[
      `${name}RealizedCapitalization`
    ] as ResourceDataset<Scale>;

    const realizedNet = createSubtractedLazyDataset(
      realizedProfit,
      realizedLoss,
    );
    const unrealizedNet = createSubtractedLazyDataset(
      unrealizedProfit,
      unrealizedLoss,
    );
    const supplyInLoss = createSubtractedLazyDataset(
      cohortSupplyTotal,
      supplyInProfit,
    );
    const supplyInProfitPercentageSelf = createDividedLazyDataset(
      supplyInProfit,
      cohortSupplyTotal,
      true,
    );
    const cumulatedNetRealized = createCumulatedLazyDataset(realizedNet);
    const realizedPrice = createDividedLazyDataset(
      realizedCapitalization,
      cohortSupplyTotal,
    );

    datasets[`${name}RealizedLossNegative`] = createTransformedLazyDataset(
      realizedLoss,
      (v) => -v,
    );

    datasets[`${name}UnrealizedLossNegative`] = createTransformedLazyDataset(
      unrealizedLoss,
      (v) => -v,
    );

    datasets[`${name}CumulatedRealizedProfit`] =
      createCumulatedLazyDataset(realizedProfit);

    datasets[`${name}CumulatedRealizedLoss`] =
      createCumulatedLazyDataset(realizedLoss);

    datasets[`${name}NetRealizedProfitAndLoss`] = realizedNet;
    datasets[`${name}RelativeNetRealizedProfitAndLoss`] =
      createDividedLazyDataset(realizedNet, marketCapitalization);

    datasets[`${name}CumulatedNetRealizedProfitAndLoss`] = cumulatedNetRealized;
    datasets[`${name}CumulatedNetRealizedProfitAndLoss30dChange`] =
      createNetChangeLazyDataset(cumulatedNetRealized, 30);

    datasets[`${name}NetUnrealizedProfitAndLoss`] = unrealizedNet;
    datasets[`${name}RelativeNetUnrealizedProfitAndLoss`] =
      createDividedLazyDataset(unrealizedNet, marketCapitalization);

    datasets[`${name}SupplyTotal%All`] = createDividedLazyDataset(
      cohortSupplyTotal,
      supplyTotal,
      true,
    );

    datasets[`${name}SupplyInProfit%All`] = createDividedLazyDataset(
      supplyInProfit,
      supplyTotal,
      true,
    );

    datasets[`${name}SupplyInProfit%Self`] = supplyInProfitPercentageSelf;

    datasets[`${name}SupplyInLoss`] = supplyInLoss;

    datasets[`${name}SupplyInLoss%All`] = createDividedLazyDataset(
      supplyInLoss,
      supplyTotal,
      true,
    );

    const percentageMomentum = createPercentageMomentumLazyDataset(
      supplyInProfitPercentageSelf,
    );

    datasets[`${name}SupplyPNL%SelfMomentum`] = percentageMomentum;

    const percentageMomentumBLSHBitcoinReturns =
      createBLSHBitcoinReturnsLazyDataset({
        momentumDataset: percentageMomentum,
        // TODO: Fix types
        price: resources.price as any as Dataset<Scale, DatasetCandlestickData>,
      });

    datasets[`${name}SupplyPNL%SelfMomentumBLSHBitcoinReturns`] =
      percentageMomentumBLSHBitcoinReturns;

    datasets[`${name}SupplyPNL%SelfMomentumBLSHDollarReturns`] =
      createBLSHDollarReturnsLazyDataset({
        bitcoinReturns: percentageMomentumBLSHBitcoinReturns,
      });

    datasets[`${name}SupplyInLoss%Self`] = createDividedLazyDataset(
      supplyInLoss,
      cohortSupplyTotal,
      true,
    );

    datasets[`${name}SupplyTotal75Percent`] = createTransformedLazyDataset(
      cohortSupplyTotal,
      (v) => v * 0.75,
    );

    datasets[`${name}SupplyTotal50Percent`] = createTransformedLazyDataset(
      cohortSupplyTotal,
      (v) => v * 0.5,
    );

    datasets[`${name}SupplyTotal25Percent`] = createTransformedLazyDataset(
      cohortSupplyTotal,
      (v) => v * 0.25,
    );

    datasets[`${name}RealizedPrice`] = realizedPrice;
    datasets[`${name}PricePaidMean`] = realizedPrice;

    datasets[`${name}RealizedCapitalization30dChange`] =
      createNetChangeLazyDataset(realizedCapitalization, 30);

    // TODO: Fix `ResourceScale`
    appendRatioLazyDatasets<
      `${AnyPossibleCohortKey}RealizedPrice`,
      ResourceScale
    >({
      datasets,
      sourceDataset: realizedPrice,
      price: resources.price,
      key: `${name}RealizedPrice`,
    });
  });

  return datasets as Record<PossibleKeys, Dataset<Scale>>;
};

export function createLazyAverageDataset<Scale extends ResourceScale>(
  dataset: Dataset<Scale>,
  days: number,
) {
  return createLazyDataset(
    dataset.scale,
    () => computeMovingAverage(dataset.values(), days),
    [dataset.sources],
  );
}

export function createLazyPercentileDataset<Scale extends ResourceScale>(
  ratio: Dataset<Scale>,
  quantile: number,
) {
  return createLazyDataset(
    ratio.scale,
    () => {
      const ratioValues = ratio.values();

      if (!ratioValues?.length) return [];

      let sortedRatios: number[] = [];

      // const index = ratioValues.findIndex(
      //   ({ date }) => date === FIRST_USABLE_MEAN_RATIO_DATE,
      // );
      const index = 0;

      // if (index === -1) return [];

      return ratioValues
        .slice(index)
        .map(({ number, time, value: ratio }, dataIndex) => {
          sortedInsert(sortedRatios, ratio);

          const length = dataIndex + 1;

          const quantileValue = quantile / 100;

          let value: number;

          if (quantileValue !== MEDIAN || length % 2 !== 0) {
            const sortedIndex = Math.floor(length * quantileValue);

            value = sortedRatios[sortedIndex];
          } else {
            const mid = Math.floor(length / 2);

            value = (sortedRatios[mid - 1] + sortedRatios[mid]) / 2;
          }

          return {
            number,
            time,
            value,
          };
        });
    },
    [ratio.sources],
  );
}

export function createLazyMomentumDataset<Scale extends ResourceScale>(
  raw: Dataset<Scale>,
  smoothed: Dataset<Scale>,
  extraSmoothed: Dataset<Scale>,
) {
  return createLazyDataset(
    raw.scale,
    () =>
      (extraSmoothed.values() || []).map(({ number, time, value }, index) => {
        const rawValue = raw.values()?.[index].value || 0;
        const smoothedValue = smoothed.values()?.[index].value || 0;

        const momentum =
          smoothedValue >= value && rawValue >= value
            ? Momentum.green
            : smoothedValue < value && rawValue < value
              ? Momentum.red
              : Momentum.yellow;

        return {
          number,
          time,
          value: momentum,
          color:
            momentum === Momentum.green
              ? colors.momentumGreen
              : momentum === Momentum.red
                ? colors.momentumRed
                : colors.momentumYellow,
        };
      }),
    [raw.sources],
  );
}
