interface Dataset<T = DatedSingleValueData[]> {
  sources: Accessor<Sources>;
  values: Accessor<T | null>;
}

type Datasets = Awaited<ReturnType<typeof import("./index").createDatasets>>;
