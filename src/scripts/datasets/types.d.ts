interface Dataset<
  Scale extends ResourceScale,
  T extends SingleValueData = SingleValueData,
  Value = DatasetValue<T>,
> {
  scale: Scale;
  sources: Accessor<Sources>;
  values: Accessor<Value[]>;
}

type DatasetValue<T> = T & Numbered & Valued;

type Datasets = ReturnType<typeof import("./index").createDatasets>;

type DateDatasets = Datasets["date"];
type HeightDatasets = Datasets["height"];
type AnyDatasets = DateDatasets | HeightDatasets;
