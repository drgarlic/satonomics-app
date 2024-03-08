import { createLazyMemo } from "@solid-primitives/memo";

import {
  allPossibleCohortNames,
  colors,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
} from "/src/scripts";

import { Momentum } from "..";
import { createLazyPercentileDataset, createLazyRatioDataset } from "./ratio";

export function createLazyDataset<T>(
  calc: () => T,
  sourcesList: Accessor<Sources>[],
): Dataset<T> {
  return {
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

export function createTransformedLazyDataset<T = undefined>(
  dataset: Dataset,
  transform: (
    value: number,
    index: number,
    array: DatedSingleValueData[],
    state?: T,
  ) => number,
  state?: T,
) {
  return createLazyDataset(
    () =>
      (dataset.values() || []).map(({ date, value }, index, array) => ({
        date,
        time: date,
        value: transform(value, index, array, state),
      })),
    [dataset.sources],
  );
}

export function createNetChangeLazyDataset(dataset: Dataset, days = 1) {
  return createTransformedLazyDataset(
    dataset,
    (value, index, array) =>
      value - (index >= days ? array[index - days].value : 0),
  );
}

export function createAnnualizedLazyDataset(dataset: Dataset) {
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

export function createMedianLazyDataset(dataset: Dataset, number: number) {
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

function createLazyOffset(source: Dataset, toOffset: Dataset) {
  return createLazyMemo(() => {
    const offset = toOffset
      .values()
      ?.findIndex(({ date }) => date === source.values()?.at(0)?.date);

    return !offset || offset === -1 ? 0 : offset;
  });
}

export function createAddedLazyDataset(
  datasetRef: Dataset,
  datasetToAdd: Dataset,
) {
  const offset = createLazyOffset(datasetRef, datasetToAdd);

  return createLazyDataset(() => {
    let secondValue = 0;
    let index = offset();

    return (datasetRef.values() || []).map(({ date, value }) => {
      const data = datasetToAdd.values()?.at(index);
      if (date === data?.date) {
        secondValue = data.value;
        index += 1;
      }

      return {
        date,
        time: date,
        value: value + secondValue,
      };
    });
  }, [datasetRef.sources, datasetToAdd.sources]);
}

export function createSubtractedLazyDataset(
  datasetRef: Dataset,
  datasetToSubtract: Dataset,
) {
  const offset = createLazyOffset(datasetRef, datasetToSubtract);

  return createLazyDataset(() => {
    let secondValue = 0;
    let index = offset();

    return (datasetRef.values() || []).map(({ date, value }) => {
      const data = datasetToSubtract.values()?.at(index);
      if (date === data?.date) {
        secondValue = data.value;
        index += 1;
      }

      return {
        date,
        time: date,
        value: value - secondValue,
      };
    });
  }, [datasetRef.sources, datasetToSubtract.sources]);
}

export function createMultipliedLazyDataset(
  datasetRef: Dataset,
  multiplierDataset: Dataset,
  defaultMultiplier = 1,
) {
  const offsetRef = createLazyOffset(multiplierDataset, datasetRef);

  const offsetMultiplier = createLazyOffset(datasetRef, multiplierDataset);

  return createLazyDataset(
    () =>
      (datasetRef.values() || [])
        .slice(offsetRef())
        .map(({ date, value }, index) => ({
          date,
          time: date,
          value:
            value *
            // TODO: Move `multiplierDataset.values()` to call once, for all lazy datasets !!
            (multiplierDataset.values()?.at(index + offsetMultiplier())
              ?.value || defaultMultiplier),
        })),
    [datasetRef.sources, multiplierDataset.sources],
  );
}

export const createDividedLazyDataset = (
  datasetRef: Dataset,
  dividerDataset: Dataset,
  isPercentage?: boolean,
) => {
  const offsetRef = createLazyOffset(dividerDataset, datasetRef);

  const offsetDivider = createLazyOffset(datasetRef, dividerDataset);

  return createLazyDataset(
    () =>
      (datasetRef.values() || [])
        .slice(offsetRef())
        .map(({ date, value }, index) => ({
          date,
          time: date,
          value:
            (value /
              (dividerDataset.values()?.at(index + offsetDivider())?.value ||
                1)) *
            (isPercentage ? 100 : 1),
        })),
    [datasetRef.sources, dividerDataset.sources],
  );
};

export const createCumulatedLazyDataset = (dataset: Dataset) =>
  createLazyDataset(() => {
    let sum = 0;

    return (dataset.values() || []).map(({ date, value }) => {
      sum += value;

      return {
        date,
        time: date,
        value: sum,
      };
    });
  }, [dataset.sources]);

export function createPercentageMomentumLazyDataset(dataset: Dataset) {
  return createLazyDataset(() => {
    let momentum = Momentum.green;

    return (dataset.values() || []).map(({ date, value }) => {
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
        date,
        time: date,
        value: _value,
        color:
          _value === Momentum.green
            ? colors.momentumGreen
            : _value === Momentum.yellow
              ? colors.momentumYellow
              : colors.momentumRed,
      };
    });
  }, [dataset.sources]);
}

export function createBLSHBitcoinReturnsLazyDataset({
  momentumDataset,
  closes,
}: {
  momentumDataset: Dataset;
  closes: Dataset;
}) {
  return createLazyDataset(() => {
    let fiatAmount = 0;
    let btcAmount = 0;
    let dcaAmount = 100;
    let momentum = Momentum.green;

    const offset = createLazyMemo(() => {
      const offset = momentumDataset
        .values()
        ?.findIndex((data) => data.date === closes.values()?.[0]?.date);

      return !offset || offset === -1 ? 0 : offset;
    });

    return (closes.values() || []).map(
      ({ date, value: currentPrice }, index) => {
        const momentumI =
          momentumDataset.values()?.[index + offset()]?.value || Momentum.green;

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
          date,
          time: date,
          value: btcAmount + fiatAmount / currentPrice,
          fiat: fiatAmount + btcAmount * currentPrice,
        };
      },
    );
  }, [momentumDataset.sources, closes.sources]);
}

export function createBLSHDollarReturnsLazyDataset({
  bitcoinReturns,
}: {
  bitcoinReturns: ReturnType<typeof createBLSHBitcoinReturnsLazyDataset>;
}) {
  return createLazyDataset(
    () =>
      bitcoinReturns.values()?.map(({ date, fiat: value }) => ({
        date,
        time: date,
        value,
      })) || [],
    [bitcoinReturns.sources],
  );
}

export const createAnyPossibleCohortLazyDatasets = (
  // scale: Scale,
  resourceDatasets: ResourceDatasets,
  { dateToMarketCap }: { dateToMarketCap: Dataset },
) => {
  type PossibleKeys =
    | `dateTo${AnyPossibleCohortName}PricePaidMean`
    | `dateTo${AnyPossibleCohortName}RealizedPrice`
    | `dateTo${AnyPossibleCohortName}RealizedCapitalization30dChange`
    | `dateTo${AnyPossibleCohortName}UnrealizedLossNegative`
    | `dateTo${AnyPossibleCohortName}NetUnrealizedProfitAndLoss`
    | `dateTo${AnyPossibleCohortName}RelativeNetUnrealizedProfitAndLoss`
    | `dateTo${AnyPossibleCohortName}RealizedLossNegative`
    | `dateTo${AnyPossibleCohortName}NetRealizedProfitAndLoss`
    | `dateTo${AnyPossibleCohortName}RelativeNetRealizedProfitAndLoss`
    | `dateTo${AnyPossibleCohortName}CumulatedRealizedProfit`
    | `dateTo${AnyPossibleCohortName}CumulatedRealizedLoss`
    | `dateTo${AnyPossibleCohortName}CumulatedNetRealizedProfitAndLoss`
    | `dateTo${AnyPossibleCohortName}CumulatedNetRealizedProfitAndLoss30dChange`
    | `dateTo${AnyPossibleCohortName}SupplyInLoss`
    | `dateTo${AnyPossibleCohortName}SupplyInLoss%Self`
    | `dateTo${AnyPossibleCohortName}SupplyInLoss%All`
    | `dateTo${AnyPossibleCohortName}SupplyInProfit%Self`
    | `dateTo${AnyPossibleCohortName}SupplyInProfit%All`
    | `dateTo${AnyPossibleCohortName}SupplyPNL%SelfMomentum`
    | `dateTo${AnyPossibleCohortName}SupplyPNL%SelfMomentumBLSHBitcoinReturns`
    | `dateTo${AnyPossibleCohortName}SupplyPNL%SelfMomentumBLSHDollarReturns`
    | `dateTo${AnyPossibleCohortName}SupplyTotal75Percent`
    | `dateTo${AnyPossibleCohortName}SupplyTotal50Percent`
    | `dateTo${AnyPossibleCohortName}SupplyTotal25Percent`
    | `dateTo${AnyPossibleCohortName}SupplyTotal%All`
    | `dateTo${AnyPossibleCohortName}RealizedPrice${RatioKey}`;

  const datasets: Partial<Record<PossibleKeys, Dataset>> = {};

  allPossibleCohortNames.forEach((name) => {
    const allSupplyTotal = resourceDatasets[`dateToSupplyTotal`];
    const supplyTotal = resourceDatasets[`dateTo${name}SupplyTotal`];
    const supplyInProfit = resourceDatasets[`dateTo${name}SupplyInProfit`];
    const realizedLoss = resourceDatasets[`dateTo${name}RealizedLoss`];
    const realizedProfit = resourceDatasets[`dateTo${name}RealizedProfit`];
    const unrealizedLoss = resourceDatasets[`dateTo${name}UnrealizedLoss`];
    const unrealizedProfit = resourceDatasets[`dateTo${name}UnrealizedProfit`];
    const realizedCapitalization =
      resourceDatasets[`dateTo${name}RealizedCapitalization`];

    const realizedNet = createSubtractedLazyDataset(
      realizedProfit,
      realizedLoss,
    );
    const unrealizedNet = createSubtractedLazyDataset(
      unrealizedProfit,
      unrealizedLoss,
    );
    const supplyInLoss = createSubtractedLazyDataset(
      supplyTotal,
      supplyInProfit,
    );
    const supplyInProfitPercentageSelf = createDividedLazyDataset(
      supplyInProfit,
      supplyTotal,
      true,
    );
    const cumulatedNetRealized = createCumulatedLazyDataset(realizedNet);
    const realizedPrice = createDividedLazyDataset(
      realizedCapitalization,
      supplyTotal,
    );

    datasets[`dateTo${name}RealizedLossNegative`] =
      createTransformedLazyDataset(realizedLoss, (v) => -v);

    datasets[`dateTo${name}UnrealizedLossNegative`] =
      createTransformedLazyDataset(unrealizedLoss, (v) => -v);

    datasets[`dateTo${name}CumulatedRealizedProfit`] =
      createCumulatedLazyDataset(realizedProfit);

    datasets[`dateTo${name}CumulatedRealizedLoss`] =
      createCumulatedLazyDataset(realizedLoss);

    datasets[`dateTo${name}NetRealizedProfitAndLoss`] = realizedNet;
    datasets[`dateTo${name}RelativeNetRealizedProfitAndLoss`] =
      createDividedLazyDataset(realizedNet, dateToMarketCap);

    datasets[`dateTo${name}CumulatedNetRealizedProfitAndLoss`] =
      cumulatedNetRealized;
    datasets[`dateTo${name}CumulatedNetRealizedProfitAndLoss30dChange`] =
      createNetChangeLazyDataset(cumulatedNetRealized, 30);

    datasets[`dateTo${name}NetUnrealizedProfitAndLoss`] = unrealizedNet;
    datasets[`dateTo${name}RelativeNetUnrealizedProfitAndLoss`] =
      createDividedLazyDataset(unrealizedNet, dateToMarketCap);

    datasets[`dateTo${name}SupplyTotal%All`] = createDividedLazyDataset(
      supplyTotal,
      allSupplyTotal,
      true,
    );

    datasets[`dateTo${name}SupplyInProfit%All`] = createDividedLazyDataset(
      supplyInProfit,
      allSupplyTotal,
      true,
    );

    datasets[`dateTo${name}SupplyInProfit%Self`] = supplyInProfitPercentageSelf;

    datasets[`dateTo${name}SupplyInLoss`] = supplyInLoss;

    datasets[`dateTo${name}SupplyInLoss%All`] = createDividedLazyDataset(
      supplyInLoss,
      allSupplyTotal,
      true,
    );

    const percentageMomentum = createPercentageMomentumLazyDataset(
      supplyInProfitPercentageSelf,
    );

    datasets[`dateTo${name}SupplyPNL%SelfMomentum`] = percentageMomentum;

    const percentageMomentumBLSHBitcoinReturns =
      createBLSHBitcoinReturnsLazyDataset({
        momentumDataset: percentageMomentum,
        closes: resourceDatasets.closes,
      });

    datasets[`dateTo${name}SupplyPNL%SelfMomentumBLSHBitcoinReturns`] =
      percentageMomentumBLSHBitcoinReturns;

    datasets[`dateTo${name}SupplyPNL%SelfMomentumBLSHDollarReturns`] =
      createBLSHDollarReturnsLazyDataset({
        bitcoinReturns: percentageMomentumBLSHBitcoinReturns,
      });

    datasets[`dateTo${name}SupplyInLoss%Self`] = createDividedLazyDataset(
      supplyInLoss,
      supplyTotal,
      true,
    );

    datasets[`dateTo${name}SupplyTotal75Percent`] =
      createTransformedLazyDataset(supplyTotal, (v) => v * 0.75);
    datasets[`dateTo${name}SupplyTotal50Percent`] =
      createTransformedLazyDataset(supplyTotal, (v) => v * 0.5);
    datasets[`dateTo${name}SupplyTotal25Percent`] =
      createTransformedLazyDataset(supplyTotal, (v) => v * 0.25);

    datasets[`dateTo${name}RealizedPrice`] = realizedPrice;
    datasets[`dateTo${name}PricePaidMean`] = realizedPrice;

    datasets[`dateTo${name}RealizedCapitalization30dChange`] =
      createNetChangeLazyDataset(
        resourceDatasets.dateToRealizedCapitalization,
        30,
      );

    appendRatioLazyDatasets<`${AnyPossibleCohortName}RealizedPrice`>({
      datasets,
      sourceDataset: realizedPrice,
      closes: resourceDatasets.closes,
      key: `${name}RealizedPrice`,
    });
  });

  return datasets as Record<PossibleKeys, Dataset>;
};

export function appendRatioLazyDatasets<
  // Key extends `${AnyPossibleCohortName}PricePaidMean`,
  Key extends
    | `${AnyPossibleCohortName}RealizedPrice`
    | `Closes${AverageName}MA`
    | "ActivePrice"
    | "VaultedPrice"
    | "TrueMarketMean",
>({
  datasets = {},
  sourceDataset,
  closes,
  key,
}: {
  datasets?: Partial<Record<`dateTo${Key}${RatioKey}`, Dataset>>;
  key: Key;
  sourceDataset: Dataset;
  closes: Dataset;
}) {
  const ratio = createLazyRatioDataset(sourceDataset, closes);

  const ratio7DMA = createLazyDataset(
    () => computeWeeklyMovingAverage(ratio.values()),
    [ratio.sources],
  );

  const ratio1YMA = createLazyDataset(
    () => computeYearlyMovingAverage(ratio.values()),
    [ratio.sources],
  );

  const ratioMomentum = createLazyDataset(
    () =>
      (ratio1YMA.values() || []).map(({ date, value }, index) => {
        const ratioValue = ratio.values()?.[index].value || 0;
        const ratio7DMAValue = ratio7DMA.values()?.[index].value || 0;
        const momentum =
          ratio7DMAValue >= value && ratioValue >= value
            ? Momentum.green
            : ratio7DMAValue < value && ratioValue < value
              ? Momentum.red
              : Momentum.yellow;
        return {
          date,
          time: date,
          value: momentum,
          color:
            momentum === Momentum.green
              ? colors.momentumGreen
              : momentum === Momentum.red
                ? colors.momentumRed
                : colors.momentumYellow,
        };
      }),
    [ratio.sources],
  );

  const ratioMomentumBLSHBitcoinReturns = createBLSHBitcoinReturnsLazyDataset({
    momentumDataset: ratioMomentum,
    closes,
  });

  const ratio99p9Percentile = createLazyPercentileDataset(ratio, 99.9);

  const ratio99p5Percentile = createLazyPercentileDataset(ratio, 99.5);

  const ratio99Percentile = createLazyPercentileDataset(ratio, 99);

  const ratio1Percentile = createLazyPercentileDataset(ratio, 1);

  const ratio0p5Percentile = createLazyPercentileDataset(ratio, 0.5);

  const ratio0p1Percentile = createLazyPercentileDataset(ratio, 0.1);

  // Create an object first to be sure that we didn't forget anything
  const ratioDatasets: Record<RatioKey, Dataset> = {
    Ratio: ratio,
    Ratio7DayMovingAverage: ratio7DMA,
    Ratio1YearMovingAverage: ratio1YMA,
    RatioMomentum: ratioMomentum,
    RatioMomentumBLSHBitcoinReturns: ratioMomentumBLSHBitcoinReturns,
    RatioMomentumBLSHDollarReturns: createBLSHDollarReturnsLazyDataset({
      bitcoinReturns: ratioMomentumBLSHBitcoinReturns,
    }),
    "Ratio99.9Percentile": ratio99p9Percentile,
    "Ratio99.5Percentile": ratio99p5Percentile,
    Ratio99Percentile: ratio99Percentile,
    Ratio1Percentile: ratio1Percentile,
    "Ratio0.5Percentile": ratio0p5Percentile,
    "Ratio0.1Percentile": ratio0p1Percentile,
    "Ratio99.9Price": createMultipliedLazyDataset(
      ratio99p9Percentile,
      sourceDataset,
    ),
    "Ratio99.5Price": createMultipliedLazyDataset(
      ratio99p5Percentile,
      sourceDataset,
    ),
    Ratio99Price: createMultipliedLazyDataset(ratio99Percentile, sourceDataset),
    Ratio1Price: createMultipliedLazyDataset(ratio1Percentile, sourceDataset),
    "Ratio0.5Price": createMultipliedLazyDataset(
      ratio0p5Percentile,
      sourceDataset,
    ),
    "Ratio0.1Price": createMultipliedLazyDataset(
      ratio0p1Percentile,
      sourceDataset,
    ),
  };

  for (const [ratioKey, value] of Object.entries(ratioDatasets)) {
    datasets[`dateTo${key}${ratioKey as RatioKey}`] = value;
  }

  return datasets as Record<`dateTo${Key}${RatioKey}`, Dataset>;
}
