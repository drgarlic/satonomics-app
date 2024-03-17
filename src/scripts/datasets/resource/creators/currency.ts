import { createResourceDataset } from "./base";

export function createCurrencyResources() {
  type CurrencyResources = Record<
    ReturnType<typeof computeCurrencyAttributeName>,
    ResourceDataset<"date">
  >;

  const partialCurrencyResources: Partial<CurrencyResources> = {};

  currencies.forEach(({ name, symbol }) => {
    const attributeName = computeCurrencyAttributeName(name);
    partialCurrencyResources[attributeName] = createResourceDataset({
      scale: "date",
      path: `/vs-currency?currency=${symbol.toUpperCase()}`,
    });
  });

  return partialCurrencyResources as CurrencyResources;
}

const computeCurrencyAttributeName = (
  currencyName: CurrencyName,
): `priceIn${CurrencyName}` => `priceIn${currencyName}`;

export const currencies = [
  {
    name: "IndonesianRupiah",
    symbol: "IDR",
  },
  {
    name: "NewTaiwanDollar",
    symbol: "TWD",
  },
  {
    name: "Euro",
    symbol: "EUR",
  },
  {
    name: "SouthKoreanWon",
    symbol: "KRW",
  },
  {
    name: "JapaneseYen",
    symbol: "JPY",
  },
  {
    name: "RussianRuble",
    symbol: "RUB",
  },
  {
    name: "ChineseYuan",
    symbol: "CNY",
  },
  {
    name: "UnitedArabEmiratesDirham",
    symbol: "AED",
  },
  {
    name: "ArgentinePeso",
    symbol: "ARS",
  },
  {
    name: "AustralianDollar",
    symbol: "AUD",
  },
  {
    name: "BangladeshiTaka",
    symbol: "BDT",
  },
  {
    name: "BangladeshiTaka",
    symbol: "BDT",
  },
  { name: "BahrainiDinar", symbol: "BHD" },
  { name: "BermudianDollar", symbol: "BMD" },
  { name: "BrazilReal", symbol: "BRL" },
  { name: "CanadianDollar", symbol: "CAD" },
  { name: "SwissFranc", symbol: "CHF" },
  { name: "ChileanPeso", symbol: "CLP" },
  { name: "CzechKoruna", symbol: "CZK" },
  { name: "DanishKrone", symbol: "DKK" },
  { name: "BritishPoundSterling", symbol: "GBP" },
  { name: "GeorgianLari", symbol: "GEL" },
  { name: "HongKongDollar", symbol: "HKD" },
  { name: "HungarianForint", symbol: "HUF" },
  { name: "IsraeliNewShekel", symbol: "ILS" },
  { name: "IndianRupee", symbol: "INR" },
  { name: "KuwaitiDinar", symbol: "KWD" },
  { name: "SriLankanRupee", symbol: "LKR" },
  { name: "BurmeseKyat", symbol: "MMK" },
  { name: "MexicanPeso", symbol: "MXN" },
  { name: "MalaysianRinggit", symbol: "MYR" },
  { name: "NigerianNaira", symbol: "NGN" },
  { name: "NorwegianKrone", symbol: "NOK" },
  { name: "NewZealandDollar", symbol: "NZD" },
  { name: "PhilippinePeso", symbol: "PHP" },
  { name: "PakistaniRupee", symbol: "PKR" },
  { name: "PolishZloty", symbol: "PLN" },
  { name: "SaudiRiyal", symbol: "SAR" },
  { name: "SwedishKrona", symbol: "SEK" },
  { name: "SingaporeDollar", symbol: "SGD" },
  { name: "ThaiBaht", symbol: "THB" },
  { name: "TurkishLira", symbol: "TRY" },
  { name: "UkrainianHryvnia", symbol: "UAH" },
  { name: "VenezuelanBolivarFuerte", symbol: "VEF" },
  { name: "VietnameseDong", symbol: "VND" },
  { name: "SouthAfricanRand", symbol: "ZAR" },

  { name: "Gold", symbol: "XAU" },
  { name: "Silver", symbol: "XAG" },
] as const;
