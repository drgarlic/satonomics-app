import { computeMovingAverage } from "/src/scripts/utils";

import { appendRatioLazyDatasets, createLazyDataset } from "./base";

export const averages = [
  { name: "7 Day", key: "7D" as const, days: 7 },
  { name: "30 Day", key: "30D" as const, days: 30 },
  { name: "111 Day", key: "111D" as const, days: 111 },
  { name: "200 Day", key: "200D" as const, days: 200 },
  { name: "1 Year", key: "1Y" as const, days: 365 },
  { name: "2 Year", key: "2Y" as const, days: 730 },
  { name: "4 Year", key: "4Y" as const, days: 1460 },
] as const;

export function createClosesAveragesDatasets({
  resourceDatasets,
}: {
  resourceDatasets: ResourceDatasets;
}) {
  // It's not great for sure but at least it's trivial for the TS server
  type AverageDatasets = Record<
    `dateToCloses${AverageName}MA` | `dateToCloses${AverageName}MA${RatioKey}`,
    Dataset
  >;

  let partialAveragesDatasets: Partial<AverageDatasets> = {};
  averages.forEach(({ key: averageName, days }) => {
    const averageDataset = createLazyDataset(
      () => computeMovingAverage(resourceDatasets.closes.values(), days),
      [resourceDatasets.closes.sources],
    );

    const key: `Closes${AverageName}MA` = `Closes${averageName}MA`;

    partialAveragesDatasets[`dateTo${key}` as const] = averageDataset;

    appendRatioLazyDatasets<typeof key>({
      datasets: partialAveragesDatasets,
      sourceDataset: averageDataset,
      key,
      closes: resourceDatasets.closes,
    });
  });

  return partialAveragesDatasets as AverageDatasets;
}
