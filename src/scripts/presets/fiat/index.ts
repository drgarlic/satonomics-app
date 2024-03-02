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
      getDataset: (datasets) => datasets.priceInUnitedArabEmiratesDirham,
    }),
    createPresetFolder({
      id: "ars",
      icon: IconTablerCurrencyDollar,
      name: "Argentine Peso",
      getDataset: (datasets) => datasets.priceInArgentinePeso,
    }),
    createPresetFolder({
      id: "aud",
      icon: IconTablerCurrencyDollarAustralian,
      name: "Australian Dollar",
      getDataset: (datasets) => datasets.priceInAustralianDollar,
    }),
    createPresetFolder({
      id: "bdt",
      icon: IconTablerCurrencyTaka,
      name: "Bangladeshi Taka",
      getDataset: (datasets) => datasets.priceInBangladeshiTaka,
    }),
    createPresetFolder({
      id: "bhd",
      icon: IconTablerCurrencyBahraini,
      name: "Bahraini Dinar",
      getDataset: (datasets) => datasets.priceInBahrainiDinar,
    }),
    createPresetFolder({
      id: "bmd",
      icon: IconTablerCurrencyDollar,
      name: "Bermudian Dollar",
      getDataset: (datasets) => datasets.priceInBermudianDollar,
    }),
    createPresetFolder({
      id: "brl",
      icon: IconTablerCurrencyReal,
      name: "Brazil Real",
      getDataset: (datasets) => datasets.priceInBrazilReal,
    }),
    createPresetFolder({
      id: "cad",
      icon: IconTablerCurrencyDollarCanadian,
      name: "Canadian Dollar",
      getDataset: (datasets) => datasets.priceInCanadianDollar,
    }),
    createPresetFolder({
      id: "chf",
      icon: IconTablerCurrencyFrank,
      name: "Swiss Franc",
      getDataset: (datasets) => datasets.priceInSwissFranc,
    }),
    createPresetFolder({
      id: "clp",
      icon: IconTablerCurrencyPeso,
      name: "Chilean Peso",
      getDataset: (datasets) => datasets.priceInChileanPeso,
    }),
    createPresetFolder({
      id: "cny",
      icon: IconTablerCurrencyYuan,
      name: "Chinese Yuan",
      getDataset: (datasets) => datasets.priceInChineseYuan,
    }),
    createPresetFolder({
      id: "czk",
      icon: IconTablerCurrencyKroneCzech,
      name: "Czech Koruna",
      getDataset: (datasets) => datasets.priceInCzechKoruna,
    }),
    createPresetFolder({
      id: "dkk",
      icon: IconTablerCurrencyKroneDanish,
      name: "Danish Krone",
      getDataset: (datasets) => datasets.priceInDanishKrone,
    }),
    createPresetFolder({
      id: "eur",
      icon: IconTablerCurrencyEuro,
      name: "Euro",
      getDataset: (datasets) => datasets.priceInEuro,
    }),
    createPresetFolder({
      id: "gbp",
      icon: IconTablerCurrencyPound,
      name: "British Pound Sterling",
      getDataset: (datasets) => datasets.priceInBritishPoundSterling,
    }),
    createPresetFolder({
      id: "gel",
      icon: IconTablerCurrencyLari,
      name: "Georgian Lari",
      getDataset: (datasets) => datasets.priceInGeorgianLari,
    }),
    createPresetFolder({
      id: "hkd",
      icon: IconTablerCurrencyDollar,
      name: "Hong Kong Dollar",
      getDataset: (datasets) => datasets.priceInHongKongDollar,
    }),
    createPresetFolder({
      id: "huf",
      icon: IconTablerCurrencyForint,
      name: "Hungarian Forint",
      getDataset: (datasets) => datasets.priceInHungarianForint,
    }),
    createPresetFolder({
      id: "idr",
      icon: IconTablerLetterR,
      name: "Indonesian Rupiah",
      getDataset: (datasets) => datasets.priceInIndonesianRupiah,
    }),
    createPresetFolder({
      id: "ils",
      icon: IconTablerCurrencyShekel,
      name: "Israeli New Shekel",
      getDataset: (datasets) => datasets.priceInIsraeliNewShekel,
    }),
    createPresetFolder({
      id: "inr",
      icon: IconTablerCurrencyRupee,
      name: "Indian Rupee",
      getDataset: (datasets) => datasets.priceInIndianRupee,
    }),
    createPresetFolder({
      id: "jpy",
      icon: IconTablerCurrencyYen,
      name: "Japanese Yen",
      getDataset: (datasets) => datasets.priceInJapaneseYen,
    }),
    createPresetFolder({
      id: "krw",
      icon: IconTablerCurrencyWon,
      name: "South Korean Won",
      getDataset: (datasets) => datasets.priceInSouthKoreanWon,
    }),
    createPresetFolder({
      id: "kwd",
      icon: IconTablerCurrencyDinar,
      name: "Kuwaiti Dinar",
      getDataset: (datasets) => datasets.priceInKuwaitiDinar,
    }),
    createPresetFolder({
      id: "lkr",
      icon: IconTablerLetterR,
      name: "SriLankan Rupee",
      getDataset: (datasets) => datasets.priceInSriLankanRupee,
    }),
    createPresetFolder({
      id: "mmk",
      icon: IconTablerLetterK,
      name: "Burmese Kyat",
      getDataset: (datasets) => datasets.priceInBurmeseKyat,
    }),
    createPresetFolder({
      id: "mxn",
      icon: IconTablerCurrencyPeso,
      name: "Mexican Peso",
      getDataset: (datasets) => datasets.priceInMexicanPeso,
    }),
    createPresetFolder({
      id: "myr",
      icon: IconTablerLetterR,
      name: "Malaysian Ringgit",
      getDataset: (datasets) => datasets.priceInMalaysianRinggit,
    }),
    createPresetFolder({
      id: "ngn",
      icon: IconTablerCurrencyNaira,
      name: "Nigerian Naira",
      getDataset: (datasets) => datasets.priceInNigerianNaira,
    }),
    createPresetFolder({
      id: "nok",
      icon: IconTablerLetterK,
      name: "Norwegian Krone",
      getDataset: (datasets) => datasets.priceInNorwegianKrone,
    }),
    createPresetFolder({
      id: "nzd",
      icon: IconTablerLetterN,
      name: "New Zealand Dollar",
      getDataset: (datasets) => datasets.priceInNewZealandDollar,
    }),
    createPresetFolder({
      id: "php",
      icon: IconTablerCurrencyPeso,
      name: "Philippine Peso",
      getDataset: (datasets) => datasets.priceInPhilippinePeso,
    }),
    createPresetFolder({
      id: "pkr",
      icon: IconTablerLetterR,
      name: "Pakistani Rupee",
      getDataset: (datasets) => datasets.priceInPakistaniRupee,
    }),
    createPresetFolder({
      id: "pln",
      icon: IconTablerCurrencyZloty,
      name: "Polish Zloty",
      getDataset: (datasets) => datasets.priceInPolishZloty,
    }),
    createPresetFolder({
      id: "rub",
      icon: IconTablerCurrencyRubel,
      name: "Russian Ruble",
      getDataset: (datasets) => datasets.priceInRussianRuble,
    }),
    createPresetFolder({
      id: "sar",
      icon: IconTablerCurrencyRiyal,
      name: "Saudi Riyal",
      getDataset: (datasets) => datasets.priceInSaudiRiyal,
    }),
    createPresetFolder({
      id: "sek",
      icon: IconTablerCurrencyKroneSwedish,
      name: "Swedish Krona",
      getDataset: (datasets) => datasets.priceInSwedishKrona,
    }),
    createPresetFolder({
      id: "sgd",
      icon: IconTablerCurrencyDollarSingapore,
      name: "Singapore Dollar",
      getDataset: (datasets) => datasets.priceInSingaporeDollar,
    }),
    createPresetFolder({
      id: "thb",
      icon: IconTablerCurrencyBaht,
      name: "Thai Baht",
      getDataset: (datasets) => datasets.priceInThaiBaht,
    }),
    createPresetFolder({
      id: "try",
      icon: IconTablerCurrencyLira,
      name: "Turkish Lira",
      getDataset: (datasets) => datasets.priceInTurkishLira,
    }),
    createPresetFolder({
      id: "twd",
      icon: IconTablerCurrencyDollar,
      name: "New Taiwan Dollar",
      getDataset: (datasets) => datasets.priceInNewTaiwanDollar,
    }),
    createPresetFolder({
      id: "uah",
      icon: IconTablerCurrencyHryvnia,
      name: "Ukrainian Hryvnia",
      getDataset: (datasets) => datasets.priceInUkrainianHryvnia,
    }),
    createPresetFolder({
      id: "vef",
      icon: IconTablerLetterB,
      name: "Venezuelan Bolivar Fuerte",
      getDataset: (datasets) => datasets.priceInVenezuelanBolivarFuerte,
    }),
    createPresetFolder({
      id: "vnd",
      icon: IconTablerCurrencyDong,
      name: "Vietnamese Dong",
      getDataset: (datasets) => datasets.priceInVietnameseDong,
    }),
    createPresetFolder({
      id: "zar",
      icon: IconTablerLetterR,
      name: "South African Rand",
      getDataset: (datasets) => datasets.priceInSouthAfricanRand,
    }),
  ],
};

function createPresetFolder({
  id,
  icon,
  name,
  getDataset,
}: {
  id: string;
  name: string;
  icon: JSXElement;
  getDataset: (datasets: Datasets) => Dataset;
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
            dataset: getDataset(datasets),
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
            dataset: getDataset(datasets),
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
    ],
  };
}
