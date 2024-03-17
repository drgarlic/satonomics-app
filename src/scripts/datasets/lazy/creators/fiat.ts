import { currencies } from "/src/scripts";

import { createMultipliedLazyDataset } from "./base";

export function createFiatDatasets(resources: DateResourceDatasets) {
  type LazyCurrencyDatasets = Record<
    `marketCapitalizationIn${CurrencyName}`,
    Dataset<"date">
  >;

  const partialCurrencyDatasets: Partial<LazyCurrencyDatasets> = {};

  currencies.forEach(({ name }) => {
    const marketCap = createMultipliedLazyDataset(
      resources.SupplyTotal,
      resources[`priceIn${name}`],
    );

    partialCurrencyDatasets[`marketCapitalizationIn${name}`] = marketCap;
  });

  return partialCurrencyDatasets as LazyCurrencyDatasets;
}
