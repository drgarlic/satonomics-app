import { computeBackEndURL, retryingFetch } from "/src/scripts";
import { createASS } from "/src/solid";

import { createBackEndResource, createResourceHTTP } from "./base";

export const currencies = [
  {
    name: "IndonesianRupiah" as const,
    symbol: "IDR",
  },
  {
    name: "NewTaiwanDollar" as const,
    symbol: "TWD",
  },
  {
    name: "Euro" as const,
    symbol: "EUR",
  },
  {
    name: "SouthKoreanWon" as const,
    symbol: "KRW",
  },
  {
    name: "JapaneseYen" as const,
    symbol: "JPY",
  },
  {
    name: "RussianRuble" as const,
    symbol: "RUB",
  },
  {
    name: "ChineseYuan" as const,
    symbol: "CNY",
  },
  {
    name: "UnitedArabEmiratesDirham" as const,
    symbol: "AED",
  },
  {
    name: "ArgentinePeso" as const,
    symbol: "ARS",
  },
  {
    name: "AustralianDollar" as const,
    symbol: "AUD",
  },
  {
    name: "BangladeshiTaka" as const,
    symbol: "BDT",
  },
  {
    name: "BangladeshiTaka" as const,
    symbol: "BDT",
  },
  { name: "BahrainiDinar" as const, symbol: "BHD" },
  { name: "BermudianDollar" as const, symbol: "BMD" },
  { name: "BrazilReal" as const, symbol: "BRL" },
  { name: "CanadianDollar" as const, symbol: "CAD" },
  { name: "SwissFranc" as const, symbol: "CHF" },
  { name: "ChileanPeso" as const, symbol: "CLP" },
  { name: "CzechKoruna" as const, symbol: "CZK" },
  { name: "DanishKrone" as const, symbol: "DKK" },
  { name: "BritishPoundSterling" as const, symbol: "GBP" },
  { name: "GeorgianLari" as const, symbol: "GEL" },
  { name: "HongKongDollar" as const, symbol: "HKD" },
  { name: "HungarianForint" as const, symbol: "HUF" },
  { name: "IsraeliNewShekel" as const, symbol: "ILS" },
  { name: "IndianRupee" as const, symbol: "INR" },
  { name: "KuwaitiDinar" as const, symbol: "KWD" },
  { name: "SriLankanRupee" as const, symbol: "LKR" },
  { name: "BurmeseKyat" as const, symbol: "MMK" },
  { name: "MexicanPeso" as const, symbol: "MXN" },
  { name: "MalaysianRinggit" as const, symbol: "MYR" },
  { name: "NigerianNaira" as const, symbol: "NGN" },
  { name: "NorwegianKrone" as const, symbol: "NOK" },
  { name: "NewZealandDollar" as const, symbol: "NZD" },
  { name: "PhilippinePeso" as const, symbol: "PHP" },
  { name: "PakistaniRupee" as const, symbol: "PKR" },
  { name: "PolishZloty" as const, symbol: "PLN" },
  { name: "SaudiRiyal" as const, symbol: "SAR" },
  { name: "SwedishKrona" as const, symbol: "SEK" },
  { name: "SingaporeDollar" as const, symbol: "SGD" },
  { name: "ThaiBaht" as const, symbol: "THB" },
  { name: "TurkishLira" as const, symbol: "TRY" },
  { name: "UkrainianHryvnia" as const, symbol: "UAH" },
  { name: "VenezuelanBolivarFuerte" as const, symbol: "VEF" },
  { name: "VietnameseDong" as const, symbol: "VND" },
  { name: "SouthAfricanRand" as const, symbol: "ZAR" },
  { name: "Gold" as const, symbol: "XAU" },
  { name: "Silver" as const, symbol: "XAG" },
];

export const ageCohorts = [
  {
    name: "" as const,
    route: "",
  },
  {
    name: "Lth" as const,
    route: "lth",
  },
  {
    name: "Sth" as const,
    route: "sth",
  },
  { name: "UpTo1d" as const, route: "up_to_1d" },
  { name: "UpTo7d" as const, route: "up_to_7d" },
  { name: "UpTo1m" as const, route: "up_to_1m" },
  { name: "UpTo2m" as const, route: "up_to_2m" },
  { name: "UpTo3m" as const, route: "up_to_3m" },
  { name: "UpTo4m" as const, route: "up_to_4m" },
  { name: "UpTo5m" as const, route: "up_to_5m" },
  { name: "UpTo6m" as const, route: "up_to_6m" },
  { name: "UpTo1y" as const, route: "up_to_1y" },
  { name: "UpTo2y" as const, route: "up_to_2y" },
  { name: "UpTo3y" as const, route: "up_to_3y" },
  { name: "UpTo5y" as const, route: "up_to_5y" },
  { name: "UpTo7y" as const, route: "up_to_7y" },
  { name: "UpTo10y" as const, route: "up_to_10y" },
  { name: "From1dTo7d" as const, route: "from_1d_to_7d" },
  { name: "From7dTo1m" as const, route: "from_7d_to_1m" },
  { name: "From1mTo3m" as const, route: "from_1m_to_3m" },
  { name: "From3mTo6m" as const, route: "from_3m_to_6m" },
  { name: "From6mTo1y" as const, route: "from_6m_to_1y" },
  { name: "From1yTo2y" as const, route: "from_1y_to_2y" },
  { name: "From2yTo3y" as const, route: "from_2y_to_3y" },
  { name: "From3yTo5y" as const, route: "from_3y_to_5y" },
  { name: "From5yTo7y" as const, route: "from_5y_to_7y" },
  { name: "From7yTo10y" as const, route: "from_7y_to_10y" },
  { name: "From10yToEnd" as const, route: "from_10y_to_end" },
  { name: "2009" as const, route: "2009" },
  { name: "2010" as const, route: "2010" },
  { name: "2011" as const, route: "2011" },
  { name: "2012" as const, route: "2012" },
  { name: "2013" as const, route: "2013" },
  { name: "2014" as const, route: "2014" },
  { name: "2015" as const, route: "2015" },
  { name: "2016" as const, route: "2016" },
  { name: "2017" as const, route: "2017" },
  { name: "2018" as const, route: "2018" },
  { name: "2019" as const, route: "2019" },
  { name: "2020" as const, route: "2020" },
  { name: "2021" as const, route: "2021" },
  { name: "2022" as const, route: "2022" },
  { name: "2023" as const, route: "2023" },
  { name: "2024" as const, route: "2024" },
];

export const ageCohortsNames = ageCohorts.map(({ name }) => name);

export const percentiles = [
  "95" as const,
  "90" as const,
  "85" as const,
  "80" as const,
  "75" as const,
  "70" as const,
  "65" as const,
  "60" as const,
  "55" as const,
  "45" as const,
  "40" as const,
  "35" as const,
  "30" as const,
  "25" as const,
  "20" as const,
  "15" as const,
  "10" as const,
  "05" as const,
];

export const anyCohortAttributes = [
  {
    name: "RealizedCapitalization" as const,
    route: "realized-capitalization",
  },
  {
    name: "RealizedLoss" as const,
    route: "realized-loss",
  },
  {
    name: "RealizedProfit" as const,
    route: "realized-profit",
  },
  {
    name: "UnrealizedLoss" as const,
    route: "unrealized-loss",
  },
  {
    name: "UnrealizedProfit" as const,
    route: "unrealized-profit",
  },
  {
    name: "UnrealizedLoss" as const,
    route: "unrealized-loss",
  },
  {
    name: "SupplyTotal" as const,
    route: "supply-total",
  },
  {
    name: "SupplyInProfit" as const,
    route: "supply-in_profit",
  },
  {
    name: "UtxoCount" as const,
    route: "utxo_count",
  },
  {
    name: "PricePaidMedian" as const,
    route: "price_paid-median",
  },
  {
    name: "PricePaid95Percentile" as const,
    route: "price_paid-95p",
  },
  {
    name: "PricePaid90Percentile" as const,
    route: "price_paid-90p",
  },
  {
    name: "PricePaid85Percentile" as const,
    route: "price_paid-85p",
  },
  {
    name: "PricePaid80Percentile" as const,
    route: "price_paid-80p",
  },
  {
    name: "PricePaid75Percentile" as const,
    route: "price_paid-75p",
  },
  {
    name: "PricePaid70Percentile" as const,
    route: "price_paid-70p",
  },
  {
    name: "PricePaid65Percentile" as const,
    route: "price_paid-65p",
  },
  {
    name: "PricePaid60Percentile" as const,
    route: "price_paid-60p",
  },
  {
    name: "PricePaid55Percentile" as const,
    route: "price_paid-55p",
  },
  {
    name: "PricePaid45Percentile" as const,
    route: "price_paid-45p",
  },
  {
    name: "PricePaid40Percentile" as const,
    route: "price_paid-40p",
  },
  {
    name: "PricePaid35Percentile" as const,
    route: "price_paid-35p",
  },
  {
    name: "PricePaid30Percentile" as const,
    route: "price_paid-30p",
  },
  {
    name: "PricePaid25Percentile" as const,
    route: "price_paid-25p",
  },
  {
    name: "PricePaid20Percentile" as const,
    route: "price_paid-20p",
  },
  {
    name: "PricePaid15Percentile" as const,
    route: "price_paid-15p",
  },
  {
    name: "PricePaid10Percentile" as const,
    route: "price_paid-10p",
  },
  {
    name: "PricePaid05Percentile" as const,
    route: "price_paid-05p",
  },
];

export const addressOnlyCohortAttributes = [
  {
    name: "AddressCount" as const,
    route: "address_count",
  },
];

export const addressCohorts = [
  {
    name: "Plankton" as const,
    route: "plankton",
  },
  {
    name: "Shrimp" as const,
    route: "shrimp",
  },
  { name: "Crab" as const, route: "crab" },
  { name: "Fish" as const, route: "fish" },
  { name: "Shark" as const, route: "shark" },
  { name: "Whale" as const, route: "whale" },
  { name: "Humpback" as const, route: "humpback" },
  { name: "Megalodon" as const, route: "megalodon" },
  { name: "P2PK" as const, route: "p2pk" },
  { name: "P2PKH" as const, route: "p2pkh" },
  { name: "P2SH" as const, route: "p2sh" },
  { name: "P2WPKH" as const, route: "p2wpkh" },
  { name: "P2WSH" as const, route: "p2wsh" },
  { name: "P2TR" as const, route: "p2tr" },
];

export const addressCohortsNames = addressCohorts.map(({ name }) => name);

export const liquidities = [
  { name: "Illiquid" as const, route: "illiquid" },
  { name: "Liquid" as const, route: "liquid" },
  { name: "Highly liquid" as const, route: "highly_liquid" },
];

export const liquidityNames = liquidities.map(({ name }) => name);

export const allCohortNames = [...ageCohortsNames, ...addressCohortsNames];

export const allPossibleCohortNames: AnyPossibleCohortName[] = [
  ...ageCohortsNames,
  ...addressCohortsNames,
  ...addressCohortsNames.flatMap((name) =>
    liquidityNames.map(
      (liquidityName): AddressCohortNameSplitByLiquidity =>
        `${name}${liquidityName}`,
    ),
  ),
];

export const createResourcesHTTP = () => {
  const baseResources = {
    candlesticks: createResourceHTTP<FetchedCandlestick[]>({
      url: computeBackEndURL("/ohlcv"),
      customFetch: retryingFetch,
    }),
    dateToNewBlocks: createBackEndResource(`/date-to-block_count`),
    dateToTransactionCount: createBackEndResource(`/date-to-transaction-count`),
    dateToTransactionVolume: createBackEndResource(
      `/date-to-transaction-volume`,
    ),
    dateToSubsidy: createBackEndResource(`/date-to-subsidy`),
    dateToSubsidyInDollars: createBackEndResource(
      `/date-to-subsidy_in_dollars`,
    ),
    dateToLastSubsidy: createBackEndResource(`/date-to-last_subsidy`),
    dateToFees: createBackEndResource(`/date-to-fees-sumed`),
    dateToTotalAddressesCreated: createBackEndResource(
      `/date-to-total_addresses_created`,
    ),
    dateToCoinblocksDestroyed: createBackEndResource(
      `/date-to-coinblocks-destroyed`,
    ),
    dateToTotalEmptyAddresses: createBackEndResource(
      `/date-to-total_empty_addresses`,
    ),

    dateToAltcoinsMarketCap: createBackEndResource(
      `/date-to-altcoins-marketcap`,
    ),
    dateToStablecoinsMarketCap: createBackEndResource(
      `/date-to-stablecoins-marketcap`,
    ),

    usdtMarketCap: createBackEndResource(`/usdt-marketcap`),
    usdcMarketCap: createBackEndResource(`/usdc-marketcap`),

    sopr: createBackEndResource(`/sopr`),
    terminalPrice: createBackEndResource(`/terminal-price`),
    balancedPrice: createBackEndResource(`/balanced-price`),
    cointimePrice: createBackEndResource(`/cointime-price`),
    cvdd: createBackEndResource(`/cvdd`),
    fundingRates: createBackEndResource(`/funding-rates`),
    vddMultiple: createBackEndResource(`/vdd-multiple`),
    minersRevenue: createBackEndResource(`/miners-revenue`),
  };

  // ---
  // Fiat
  // ---

  const computeCurrencyAttributeName = (
    currencyName: CurrencyName,
  ): `priceIn${CurrencyName}` => `priceIn${currencyName}`;

  type CurrencyResources = Record<
    ReturnType<typeof computeCurrencyAttributeName>,
    ResourceHTTP
  >;

  const partialCurrencyResources: Partial<CurrencyResources> = {};

  currencies.forEach(({ name, symbol }) => {
    const attributeName = computeCurrencyAttributeName(name);
    partialCurrencyResources[attributeName] = createBackEndResource(
      `/vs-currency?currency=${symbol.toUpperCase()}`,
    );
  });

  const currencyResources = partialCurrencyResources as CurrencyResources;

  // ---
  // Cohort
  // ---

  const ageCohortAttributes = [...anyCohortAttributes];

  const computeAgeAttributeName = (
    ageCohortName: AgeCohortName,
    ageCohortAttributeName: AgeCohortAttributeName,
  ): `dateTo${AgeCohortName}${AgeCohortAttributeName}` =>
    `dateTo${ageCohortName}${ageCohortAttributeName}`;

  type AgeResources = Record<
    ReturnType<typeof computeAgeAttributeName>,
    ResourceHTTP
  >;

  const partialAgeResources: Partial<AgeResources> = {};

  ageCohorts.forEach(({ name: ageName, route: ageRoute }) => {
    ageCohortAttributes.forEach(
      ({ name: cohortAttributeName, route: cohortAttributeRoute }) => {
        const attributeName = computeAgeAttributeName(
          ageName,
          cohortAttributeName,
        );
        partialAgeResources[attributeName] = createBackEndResource(
          `/date-to-${ageRoute ? ageRoute + "-" : ""}${cohortAttributeRoute}`,
        );
      },
    );
  });

  const ageResources = partialAgeResources as AgeResources;

  const addressCohortAttributes = [
    ...anyCohortAttributes,
    ...addressOnlyCohortAttributes,
  ];

  function computeAddressAttributeName(
    addressCohortName: AddressCohortName,
    addressCohortAttributeName: AddressCohortAttributeName,
  ): `dateTo${AddressCohortName}${AddressCohortAttributeName}` {
    return `dateTo${addressCohortName}${addressCohortAttributeName}`;
  }

  function computeAddressSplitByLiquidityAttributeName(
    addressCohortName: AddressCohortName,
    addressCohortAttributeName: AddressCohortAttributeName,
    liquidity: LiquidityName,
  ): `dateTo${AddressCohortName}${LiquidityName}${AddressCohortAttributeName}` {
    return `dateTo${addressCohortName}${liquidity}${addressCohortAttributeName}`;
  }

  type AddressResources = Record<
    | ReturnType<typeof computeAddressAttributeName>
    | ReturnType<typeof computeAddressSplitByLiquidityAttributeName>,
    ResourceHTTP
  >;

  const partialAddressResources: Partial<AddressResources> = {};
  addressCohorts.forEach(({ name: addressName, route: addressRoute }) => {
    addressCohortAttributes.forEach(
      ({ name: cohortAttributeName, route: cohortAttributeRoute }) => {
        const attributeName = computeAddressAttributeName(
          addressName,
          cohortAttributeName,
        );
        partialAddressResources[attributeName] = createBackEndResource(
          `/date-to-${addressRoute}-${cohortAttributeRoute}`,
        );

        liquidities.forEach((liquidity) => {
          const attributeName = computeAddressSplitByLiquidityAttributeName(
            addressName,
            cohortAttributeName,
            liquidity.name,
          );

          partialAddressResources[attributeName] = createBackEndResource(
            `/date-to-${addressRoute}-${liquidity.route}-${cohortAttributeRoute}`,
          );
        });
      },
    );
  });
  const addressResources = partialAddressResources as AddressResources;

  return {
    ...baseResources,
    ...currencyResources,
    ...ageResources,
    ...addressResources,
  };
};
