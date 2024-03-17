import { createLazyAverageDataset } from "./base";
import { appendRatioLazyDatasets } from "./ratio";

export const averages = [
  { name: "7 Day", key: "7D" as const, days: 7 },
  { name: "30 Day", key: "30D" as const, days: 30 },
  { name: "111 Day", key: "111D" as const, days: 111 },
  { name: "200 Day", key: "200D" as const, days: 200 },
  { name: "1 Year", key: "1Y" as const, days: 365 },
  { name: "2 Year", key: "2Y" as const, days: 730 },
  { name: "4 Year", key: "4Y" as const, days: 1460 },
] as const;

export function createPriceAveragesDatasets(resources: DateResourceDatasets) {
  type AverageDatasets = Record<
    `price${AverageName}MA${"" | RatioKey}`,
    Dataset<"date">
  >;

  const partialDatasets: Partial<AverageDatasets> = {};

  averages.forEach(({ key: averageName, days }) => {
    const averageDataset = createLazyAverageDataset(resources.price, days);

    const key: `price${AverageName}MA` = `price${averageName}MA`;

    partialDatasets[key] = averageDataset;

    appendRatioLazyDatasets<typeof key, "date">({
      datasets: partialDatasets,
      sourceDataset: averageDataset,
      key,
      price: resources.price,
    });
  });

  return partialDatasets as AverageDatasets;
}
