import { computeSum } from "./sum";

export const computeAverage = (values: number[]) =>
  computeSum(values) / values.length;

export const computeMovingAverage = <
  T extends DatedWhitespaceData = DatedSingleValueData,
>(
  dataset: T[] | null,
  interval: number,
): DatedSingleValueData[] => {
  if (!dataset?.length) return [];

  return dataset.map((data, index) => ({
    date: data.date,
    time: data.time,
    value: computeAverage(
      dataset
        .slice(Math.max(index - interval + 1, 0), index + 1)
        // TODO: Type this
        .map((data: any) => data.value || data.close || 1),
    ),
  }));
};

export const computeWeeklyMovingAverage = <
  T extends DatedWhitespaceData = DatedSingleValueData,
>(
  dataset: T[] | null,
) => computeMovingAverage(dataset, 7);

export const computeMonthlyMovingAverage = <
  T extends DatedWhitespaceData = DatedSingleValueData,
>(
  dataset: T[] | null,
) => computeMovingAverage(dataset, 30);

export const computeYearlyMovingAverage = <
  T extends DatedWhitespaceData = DatedSingleValueData,
>(
  dataset: T[] | null,
) => computeMovingAverage(dataset, 365);
