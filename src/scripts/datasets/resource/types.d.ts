type ResourceDatasets = ReturnType<
  typeof import("./index").createResourceDatasets
>;

type DateResourceDatasets = ResourceDatasets["date"];
type HeightResourceDatasets = ResourceDatasets["height"];
type AnyResourceDatasets = DateResourceDatasets | HeightResourceDatasets;

type FetchedDateDataset = Record<string, number>;
type FetchedHeightDataset = number[];
type FetchedPriceDataset = FetchedCandlestickData[];

interface ResourceDataset<
  Scale extends ResourceScale,
  Fetched = Scale extends "date" ? FetchedDateDataset : FetchedHeightDataset,
  T extends SingleValueData = SingleValueData,
  Value = DatasetValue<T>,
> extends Dataset<Scale, T, Value> {
  url: URL;
  fetch: VoidFunction;
  fetchedValues: Accessor<Fetched | null>;
  loading: ASS<boolean>;
  source: Accessor<Source | null>;
  drop: VoidFunction;
}

interface Source {
  name: string;
  url: string;
  color: string;
}

type CurrencyName = (typeof import("./index").currencies)[number]["name"];

type AnyCohortDatasetKey =
  (typeof import("./index").anyCohortDatasets)[number]["key"];

type AgeCohortKey = (typeof import("./index").ageCohorts)[number]["key"];

type AgeCohortDatasetKey = AnyCohortDatasetKey;

type AddressOnlyCohortAttributeKey =
  (typeof import("./index").addressOnlyDatasets)[number]["key"];

type AddressCohortDatasetKey =
  | AnyCohortDatasetKey
  | AddressOnlyCohortAttributeKey;

type AnyCohortName = AgeCohortKey | AddressCohortKey;

type AnyPossibleCohortKey = AnyCohortName | AddressCohortKeySplitByLiquidity;

type AddressCohortName =
  (typeof import("./index").addressCohorts)[number]["name"];

type AddressCohortKey =
  (typeof import("./index").addressCohorts)[number]["key"];

type LiquidityKey = (typeof import("./index").liquidities)[number]["key"];

type AddressCohortKeySplitByLiquidity = `${AddressCohortKey}${LiquidityKey}`;

type ResourceScale = (typeof import("./index").scales)[index];

interface FetchedCandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
