import { PriceScaleMode } from "lightweight-charts";

import { applyPriceSeries } from "/src/scripts";

export const presets: PresetFolder = {
  id: "fiat",
  name: "Fiat Currencies",
  tree: [
    createPresetFolder({
      id: "aed",
      icon: IconTablerCurrencyDirham,
      name: "United Arab Emirates Dirham",
      getPriceDataset: (datasets) => datasets.priceInUnitedArabEmiratesDirham,
      getMarketCapDataset: (datasets) =>
        datasets.dateToUnitedArabEmiratesDirhamMarketCap,
    }),
    createPresetFolder({
      id: "ars",
      icon: IconTablerCurrencyDollar,
      name: "Argentine Peso",
      getPriceDataset: (datasets) => datasets.priceInArgentinePeso,
      getMarketCapDataset: (datasets) => datasets.dateToArgentinePesoMarketCap,
    }),
    createPresetFolder({
      id: "aud",
      icon: IconTablerCurrencyDollarAustralian,
      name: "Australian Dollar",
      getPriceDataset: (datasets) => datasets.priceInAustralianDollar,
      getMarketCapDataset: (datasets) =>
        datasets.dateToAustralianDollarMarketCap,
    }),
    createPresetFolder({
      id: "bdt",
      icon: IconTablerCurrencyTaka,
      name: "Bangladeshi Taka",
      getPriceDataset: (datasets) => datasets.priceInBangladeshiTaka,
      getMarketCapDataset: (datasets) =>
        datasets.dateToBangladeshiTakaMarketCap,
    }),
    createPresetFolder({
      id: "bhd",
      icon: IconTablerCurrencyBahraini,
      name: "Bahraini Dinar",
      getPriceDataset: (datasets) => datasets.priceInBahrainiDinar,
      getMarketCapDataset: (datasets) => datasets.dateToBahrainiDinarMarketCap,
    }),
    createPresetFolder({
      id: "bmd",
      icon: IconTablerCurrencyDollar,
      name: "Bermudian Dollar",
      getPriceDataset: (datasets) => datasets.priceInBermudianDollar,
      getMarketCapDataset: (datasets) =>
        datasets.dateToBermudianDollarMarketCap,
    }),
    createPresetFolder({
      id: "brl",
      icon: IconTablerCurrencyReal,
      name: "Brazil Real",
      getPriceDataset: (datasets) => datasets.priceInBrazilReal,
      getMarketCapDataset: (datasets) => datasets.dateToBrazilRealMarketCap,
    }),
    createPresetFolder({
      id: "cad",
      icon: IconTablerCurrencyDollarCanadian,
      name: "Canadian Dollar",
      getPriceDataset: (datasets) => datasets.priceInCanadianDollar,
      getMarketCapDataset: (datasets) => datasets.dateToCanadianDollarMarketCap,
    }),
    createPresetFolder({
      id: "chf",
      icon: IconTablerCurrencyFrank,
      name: "Swiss Franc",
      getPriceDataset: (datasets) => datasets.priceInSwissFranc,
      getMarketCapDataset: (datasets) => datasets.dateToSwissFrancMarketCap,
    }),
    createPresetFolder({
      id: "clp",
      icon: IconTablerCurrencyPeso,
      name: "Chilean Peso",
      getPriceDataset: (datasets) => datasets.priceInChileanPeso,
      getMarketCapDataset: (datasets) => datasets.dateToChileanPesoMarketCap,
    }),
    createPresetFolder({
      id: "cny",
      icon: IconTablerCurrencyYuan,
      name: "Chinese Yuan",
      getPriceDataset: (datasets) => datasets.priceInChineseYuan,
      getMarketCapDataset: (datasets) => datasets.dateToChineseYuanMarketCap,
    }),
    createPresetFolder({
      id: "czk",
      icon: IconTablerCurrencyKroneCzech,
      name: "Czech Koruna",
      getPriceDataset: (datasets) => datasets.priceInCzechKoruna,
      getMarketCapDataset: (datasets) => datasets.dateToCzechKorunaMarketCap,
    }),
    createPresetFolder({
      id: "dkk",
      icon: IconTablerCurrencyKroneDanish,
      name: "Danish Krone",
      getPriceDataset: (datasets) => datasets.priceInDanishKrone,
      getMarketCapDataset: (datasets) => datasets.dateToDanishKroneMarketCap,
    }),
    createPresetFolder({
      id: "eur",
      icon: IconTablerCurrencyEuro,
      name: "Euro",
      getPriceDataset: (datasets) => datasets.priceInEuro,
      getMarketCapDataset: (datasets) => datasets.dateToEuroMarketCap,
    }),
    createPresetFolder({
      id: "gbp",
      icon: IconTablerCurrencyPound,
      name: "British Pound Sterling",
      getPriceDataset: (datasets) => datasets.priceInBritishPoundSterling,
      getMarketCapDataset: (datasets) =>
        datasets.dateToBritishPoundSterlingMarketCap,
    }),
    createPresetFolder({
      id: "gel",
      icon: IconTablerCurrencyLari,
      name: "Georgian Lari",
      getPriceDataset: (datasets) => datasets.priceInGeorgianLari,
      getMarketCapDataset: (datasets) => datasets.dateToGeorgianLariMarketCap,
    }),
    createPresetFolder({
      id: "hkd",
      icon: IconTablerCurrencyDollar,
      name: "Hong Kong Dollar",
      getPriceDataset: (datasets) => datasets.priceInHongKongDollar,
      getMarketCapDataset: (datasets) => datasets.dateToHongKongDollarMarketCap,
    }),
    createPresetFolder({
      id: "huf",
      icon: IconTablerCurrencyForint,
      name: "Hungarian Forint",
      getPriceDataset: (datasets) => datasets.priceInHungarianForint,
      getMarketCapDataset: (datasets) =>
        datasets.dateToHungarianForintMarketCap,
    }),
    createPresetFolder({
      id: "idr",
      icon: IconTablerLetterR,
      name: "Indonesian Rupiah",
      getPriceDataset: (datasets) => datasets.priceInIndonesianRupiah,
      getMarketCapDataset: (datasets) => datasets.dateToIndianRupeeMarketCap,
    }),
    createPresetFolder({
      id: "ils",
      icon: IconTablerCurrencyShekel,
      name: "Israeli New Shekel",
      getPriceDataset: (datasets) => datasets.priceInIsraeliNewShekel,
      getMarketCapDataset: (datasets) =>
        datasets.dateToIsraeliNewShekelMarketCap,
    }),
    createPresetFolder({
      id: "inr",
      icon: IconTablerCurrencyRupee,
      name: "Indian Rupee",
      getPriceDataset: (datasets) => datasets.priceInIndianRupee,
      getMarketCapDataset: (datasets) => datasets.dateToIndianRupeeMarketCap,
    }),
    createPresetFolder({
      id: "jpy",
      icon: IconTablerCurrencyYen,
      name: "Japanese Yen",
      getPriceDataset: (datasets) => datasets.priceInJapaneseYen,
      getMarketCapDataset: (datasets) => datasets.dateToJapaneseYenMarketCap,
    }),
    createPresetFolder({
      id: "krw",
      icon: IconTablerCurrencyWon,
      name: "South Korean Won",
      getPriceDataset: (datasets) => datasets.priceInSouthKoreanWon,
      getMarketCapDataset: (datasets) => datasets.dateToSouthKoreanWonMarketCap,
    }),
    createPresetFolder({
      id: "kwd",
      icon: IconTablerCurrencyDinar,
      name: "Kuwaiti Dinar",
      getPriceDataset: (datasets) => datasets.priceInKuwaitiDinar,
      getMarketCapDataset: (datasets) => datasets.dateToKuwaitiDinarMarketCap,
    }),
    createPresetFolder({
      id: "lkr",
      icon: IconTablerLetterR,
      name: "SriLankan Rupee",
      getPriceDataset: (datasets) => datasets.priceInSriLankanRupee,
      getMarketCapDataset: (datasets) => datasets.dateToSriLankanRupeeMarketCap,
    }),
    createPresetFolder({
      id: "mmk",
      icon: IconTablerLetterK,
      name: "Burmese Kyat",
      getPriceDataset: (datasets) => datasets.priceInBurmeseKyat,
      getMarketCapDataset: (datasets) => datasets.dateToBurmeseKyatMarketCap,
    }),
    createPresetFolder({
      id: "mxn",
      icon: IconTablerCurrencyPeso,
      name: "Mexican Peso",
      getPriceDataset: (datasets) => datasets.priceInMexicanPeso,
      getMarketCapDataset: (datasets) => datasets.dateToMexicanPesoMarketCap,
    }),
    createPresetFolder({
      id: "myr",
      icon: IconTablerLetterR,
      name: "Malaysian Ringgit",
      getPriceDataset: (datasets) => datasets.priceInMalaysianRinggit,
      getMarketCapDataset: (datasets) =>
        datasets.dateToMalaysianRinggitMarketCap,
    }),
    createPresetFolder({
      id: "ngn",
      icon: IconTablerCurrencyNaira,
      name: "Nigerian Naira",
      getPriceDataset: (datasets) => datasets.priceInNigerianNaira,
      getMarketCapDataset: (datasets) => datasets.dateToNigerianNairaMarketCap,
    }),
    createPresetFolder({
      id: "nok",
      icon: IconTablerLetterK,
      name: "Norwegian Krone",
      getPriceDataset: (datasets) => datasets.priceInNorwegianKrone,
      getMarketCapDataset: (datasets) => datasets.dateToNorwegianKroneMarketCap,
    }),
    createPresetFolder({
      id: "nzd",
      icon: IconTablerLetterN,
      name: "New Zealand Dollar",
      getPriceDataset: (datasets) => datasets.priceInNewZealandDollar,
      getMarketCapDataset: (datasets) =>
        datasets.dateToNewZealandDollarMarketCap,
    }),
    createPresetFolder({
      id: "php",
      icon: IconTablerCurrencyPeso,
      name: "Philippine Peso",
      getPriceDataset: (datasets) => datasets.priceInPhilippinePeso,
      getMarketCapDataset: (datasets) => datasets.dateToPhilippinePesoMarketCap,
    }),
    createPresetFolder({
      id: "pkr",
      icon: IconTablerLetterR,
      name: "Pakistani Rupee",
      getPriceDataset: (datasets) => datasets.priceInPakistaniRupee,
      getMarketCapDataset: (datasets) => datasets.dateToPakistaniRupeeMarketCap,
    }),
    createPresetFolder({
      id: "pln",
      icon: IconTablerCurrencyZloty,
      name: "Polish Zloty",
      getPriceDataset: (datasets) => datasets.priceInPolishZloty,
      getMarketCapDataset: (datasets) => datasets.dateToPolishZlotyMarketCap,
    }),
    createPresetFolder({
      id: "rub",
      icon: IconTablerCurrencyRubel,
      name: "Russian Ruble",
      getPriceDataset: (datasets) => datasets.priceInRussianRuble,
      getMarketCapDataset: (datasets) => datasets.dateToRussianRubleMarketCap,
    }),
    createPresetFolder({
      id: "sar",
      icon: IconTablerCurrencyRiyal,
      name: "Saudi Riyal",
      getPriceDataset: (datasets) => datasets.priceInSaudiRiyal,
      getMarketCapDataset: (datasets) => datasets.dateToSaudiRiyalMarketCap,
    }),
    createPresetFolder({
      id: "sek",
      icon: IconTablerCurrencyKroneSwedish,
      name: "Swedish Krona",
      getPriceDataset: (datasets) => datasets.priceInSwedishKrona,
      getMarketCapDataset: (datasets) => datasets.dateToSwedishKronaMarketCap,
    }),
    createPresetFolder({
      id: "sgd",
      icon: IconTablerCurrencyDollarSingapore,
      name: "Singapore Dollar",
      getPriceDataset: (datasets) => datasets.priceInSingaporeDollar,
      getMarketCapDataset: (datasets) =>
        datasets.dateToSingaporeDollarMarketCap,
    }),
    createPresetFolder({
      id: "thb",
      icon: IconTablerCurrencyBaht,
      name: "Thai Baht",
      getPriceDataset: (datasets) => datasets.priceInThaiBaht,
      getMarketCapDataset: (datasets) => datasets.dateToThaiBahtMarketCap,
    }),
    createPresetFolder({
      id: "try",
      icon: IconTablerCurrencyLira,
      name: "Turkish Lira",
      getPriceDataset: (datasets) => datasets.priceInTurkishLira,
      getMarketCapDataset: (datasets) => datasets.dateToTurkishLiraMarketCap,
    }),
    createPresetFolder({
      id: "twd",
      icon: IconTablerCurrencyDollar,
      name: "New Taiwan Dollar",
      getPriceDataset: (datasets) => datasets.priceInNewTaiwanDollar,
      getMarketCapDataset: (datasets) =>
        datasets.dateToNewTaiwanDollarMarketCap,
    }),
    createPresetFolder({
      id: "uah",
      icon: IconTablerCurrencyHryvnia,
      name: "Ukrainian Hryvnia",
      getPriceDataset: (datasets) => datasets.priceInUkrainianHryvnia,
      getMarketCapDataset: (datasets) =>
        datasets.dateToUkrainianHryvniaMarketCap,
    }),
    createPresetFolder({
      id: "vef",
      icon: IconTablerLetterB,
      name: "Venezuelan Bolivar Fuerte",
      getPriceDataset: (datasets) => datasets.priceInVenezuelanBolivarFuerte,
      getMarketCapDataset: (datasets) =>
        datasets.dateToVenezuelanBolivarFuerteMarketCap,
    }),
    createPresetFolder({
      id: "vnd",
      icon: IconTablerCurrencyDong,
      name: "Vietnamese Dong",
      getPriceDataset: (datasets) => datasets.priceInVietnameseDong,
      getMarketCapDataset: (datasets) => datasets.dateToVietnameseDongMarketCap,
    }),
    createPresetFolder({
      id: "zar",
      icon: IconTablerLetterR,
      name: "South African Rand",
      getPriceDataset: (datasets) => datasets.priceInSouthAfricanRand,
      getMarketCapDataset: (datasets) =>
        datasets.dateToSouthAfricanRandMarketCap,
    }),
  ],
};

function createPresetFolder({
  id,
  icon,
  name,
  getPriceDataset,
  getMarketCapDataset,
}: {
  id: string;
  name: string;
  icon: JSXElement;
  getPriceDataset: (datasets: Datasets) => Dataset;
  getMarketCapDataset: (datasets: Datasets) => Dataset;
}): PresetFolder {
  return {
    id: `currency-${id}`,
    name: `${id.toUpperCase()} - ${name}`,
    tree: [
      {
        id: `price-${id.toLowerCase()}`,
        icon,
        name: "Price",
        title: `Bitcoin Price In ${name}`,
        applyPreset({ chart, datasets, preset }) {
          return applyPriceSeries({
            chart,
            datasets,
            preset,
            dataset: getPriceDataset(datasets),
          });
        },
        description: "",
      },
      {
        id: `performance-${id.toLowerCase()}`,
        icon: IconTablerPercentage,
        name: `Performance`,
        title: `Bitcoin ${name} Performance`,
        applyPreset({ chart, datasets, preset }) {
          return applyPriceSeries({
            chart,
            datasets,
            preset,
            dataset: getPriceDataset(datasets),
            options: {
              id: "performance",
              title: "Performance",
              priceScaleOptions: {
                mode: PriceScaleMode.Percentage,
              },
            },
          });
        },
        description: "",
      },
      {
        id: `marketcap-${id.toLowerCase()}`,
        icon: IconTablerInfinity,
        name: `Market Capitalization`,
        title: `Bitcoin ${name} Market Capitalization`,
        applyPreset({ chart, datasets, preset }) {
          return applyPriceSeries({
            chart,
            datasets,
            preset,
            dataset: getMarketCapDataset(datasets),
            options: {
              id: "marketcap",
              title: "Market Capitalization",
              // priceScaleOptions: {
              //   mode: PriceScaleMode.Percentage,
              // },
            },
          });
        },
        description: "",
      },
    ],
  };
}
