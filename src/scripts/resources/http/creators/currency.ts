import { createBackEndResource } from "./base";

export function createCurrencyResources() {
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

  return partialCurrencyResources as CurrencyResources;
}

const computeCurrencyAttributeName = (
  currencyName: CurrencyName,
): `priceIn${CurrencyName}` => `priceIn${currencyName}`;

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
