type ResourcesHTTP = ReturnType<typeof import("./index").createResourcesHTTP>;

type ResourcesHTTPKeys = keyof ResourcesHTTP;

interface ResourceHTTP<T extends Array<any> = DatedSingleValueData[]> {
  fetch: VoidFunction;
  values: ASS<T | null>;
  loading: ASS<boolean>;
  url: URL;
  source: ASS<Source | undefined>;
  drop: VoidFunction;
}

interface Source {
  name: string;
  url: string;
  color: string;
}

type CurrencyName = (typeof import("./index").currencies)[number]["name"];
type AnyCohortAttributeKey =
  (typeof import("./index").anyCohortAttributes)[number]["key"];
type AgeCohortKey = (typeof import("./index").ageCohorts)[number]["key"];
type AgeCohortAttributeKey = AnyCohortAttributeKey;
type AddressOnlyCohortAttributeKey =
  (typeof import("./index").addressOnlyCohortAttributes)[number]["key"];

type AddressCohortAttributeName =
  | AnyCohortAttributeKey
  | AddressOnlyCohortAttributeKey;
type AnyCohortName = AgeCohortKey | AddressCohortName;
type AnyPossibleCohortName = AnyCohortName | AddressCohortNameSplitByLiquidity;

type AddressCohortName =
  (typeof import("./index").addressCohorts)[number]["name"];
type LiquidityName = (typeof import("./index").liquidities)[number]["name"];
type AddressCohortNameSplitByLiquidity =
  `${LiquidityName} ${AddressCohortName}`;

type ResourceScale = (typeof import("./index").scales)[index];
