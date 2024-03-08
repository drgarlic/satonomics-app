import { createLazyMemo } from "@solid-primitives/memo";

import { sortedInsert } from "/src/scripts";

import { createLazyDataset } from "./base";

const MEDIAN = 0.5;
const FIRST_USABLE_MEAN_RATIO_DATE = "2012-01-01";
// export const FIRST_USABLE_MEAN_RATIO_DATE = '2014-01-01'

export function createLazyPercentileDataset(ratio: Dataset, quantile: number) {
  return createLazyDataset(() => {
    const ratioValues = ratio.values();

    if (!ratioValues?.length) return [];

    let sortedRatios: number[] = [];

    const index = ratioValues.findIndex(
      ({ date }) => date === FIRST_USABLE_MEAN_RATIO_DATE,
    );

    if (index === -1) return [];

    return ratioValues.slice(index).map(({ date, value: ratio }, dataIndex) => {
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
        date,
        time: date,
        value,
      };
    });
  }, [ratio.sources]);
}

// TODO: Replace those with createDividerDataset
export function createLazyRatioDataset(dataset: Dataset, closes: Dataset) {
  const firstIndexWithData = createLazyMemo(() => {
    const index = closes
      .values()
      ?.findIndex((close) => close.date === dataset.values()?.at(0)?.date);

    return !index || index === -1 ? 0 : index;
  });

  // const firstUsableCloseIndex = createLazyMemo(
  //   () =>
  //     closes()?.findIndex(
  //       (close) => close.date === USABLE_CANDLESTICKS_START_DATE,
  //     ) || 0,
  // )

  // const firstCloseIndex = createLazyMemo(() =>
  //   Math.max(firstIndexWithData(), firstUsableCloseIndex()),
  // )

  const usableCandlesticks = createLazyMemo(() =>
    (closes.values() || []).slice(
      // firstCloseIndex(),
      firstIndexWithData(),
      (dataset.values()?.length ?? 0) + firstIndexWithData(),
    ),
  );

  const slicedValues = createLazyMemo(() =>
    dataset.values()?.slice(
      dataset
        .values()!
        .findIndex(
          (data) => data.date === closes.values()![firstIndexWithData()].date,
        ),
      // .findIndex((data) => data.date === closes()![firstCloseIndex()].date),
    ),
  );

  return createLazyDataset(
    () => computeRatios(slicedValues() || [], usableCandlesticks()),
    [dataset.sources, closes.sources],
  );
}

const computeRatios = (
  dataset: DatedSingleValueData[],
  closes: DatedSingleValueData[],
) => {
  if (!dataset.length || !closes.length) return [];

  return dataset.map(({ time, date, value }, index) => {
    const closeData = closes[index];

    if (date !== closeData.date) {
      console.log({ dataset, closes });
      throw Error(`Unsynced data (${date} vs ${closeData.date})`);
    }

    return {
      time,
      date,
      value: closeData.value / value,
    };
  });
};
