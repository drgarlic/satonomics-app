import { createLazyDatasets } from "./lazy";
import { createResourceDatasets } from "./resource";

export * from "./resource";

export function createDatasets() {
  const resources = createResourceDatasets();

  const lazyDatasets = createLazyDatasets(resources);

  const datasets = {
    date: {
      ...resources.date,
      ...lazyDatasets.date,
    },
    height: {
      ...resources.height,
      ...lazyDatasets.height,
    },
  };

  t({ datasets: datasets.date, key: "price7DMA" });

  function t<Datasets extends AnyDatasets, Key extends keyof Datasets>({
    datasets,
    key,
  }: {
    datasets: Datasets;
    key: Key;
  }) {}

  return datasets;
}
