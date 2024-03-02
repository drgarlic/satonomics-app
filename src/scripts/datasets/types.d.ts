interface Dataset<T = DatedSingleValueData[]> {
  values: Accessor<T | null>;
}

type Datasets = Awaited<ReturnType<typeof import("./index").createDatasets>>;
