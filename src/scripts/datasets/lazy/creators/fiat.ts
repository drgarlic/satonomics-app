import { currencies } from "/src/scripts/resources";

import { createMultipliedLazyDataset } from "./base";

export function createLazyFiatDatasets({
  resourceDatasets,
}: {
  resourceDatasets: ResourceDatasets;
}) {
  type LazyCurrencyDatasets = Record<`dateTo${CurrencyName}MarketCap`, Dataset>;

  const partialCurrencyDatasets: Partial<LazyCurrencyDatasets> = {};

  currencies.forEach(({ name }) => {
    partialCurrencyDatasets[`dateTo${name}MarketCap`] =
      createMultipliedLazyDataset(
        resourceDatasets.dateToSupplyTotal,
        resourceDatasets[`priceIn${name}`],
      );
  });

  return partialCurrencyDatasets as LazyCurrencyDatasets;
}
