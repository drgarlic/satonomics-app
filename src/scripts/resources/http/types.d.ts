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
type AnyCohortAttributeName =
  (typeof import("./index").anyCohortAttributes)[number]["name"];
type AgeCohortName = (typeof import("./index").ageCohorts)[number]["name"];
type AgeCohortAttributeName = AnyCohortAttributeName;
type AddressOnlyCohortAttributeName =
  (typeof import("./index").addressOnlyCohortAttributes)[number]["name"];
type AddressCohortName =
  (typeof import("./index").addressCohorts)[number]["name"];
type AddressCohortNameSplitByLiquidity = `${AddressCohortName}${LiquidityName}`;
type AddressCohortAttributeName =
  | AnyCohortAttributeName
  | AddressOnlyCohortAttributeName;
type AnyCohortName = AgeCohortName | AddressCohortName;
type AnyPossibleCohortName = AnyCohortName | AddressCohortNameSplitByLiquidity;
type LiquidityName = (typeof import("./index").liquidities)[number]["name"];

type Scale = (typeof import("./index").scales)[index];
