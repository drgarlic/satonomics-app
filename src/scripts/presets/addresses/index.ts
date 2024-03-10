import {
  applyMultipleSeries,
  colors,
  createCohortPresetList,
  SeriesType,
} from "/src/scripts";

import { liquidities } from "../../resources/http";

export const presets: PresetFolder = {
  id: "addresses",
  name: "Addresses",
  tree: [
    {
      id: `total-non-empty-addresses`,
      name: `Total Non Empty Addresses`,
      title: `Total Non Empty Address`,
      description: "",
      icon: IconTablerWallet,
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: `total-non-empty-addresses`,
              title: `Total Non Empty Address`,
              color: colors.bitcoin,
              seriesType: SeriesType.Area,
              dataset: params.datasets.dateToTotalAddressCount,
            },
          ],
        });
      },
    },
    {
      id: `new-addresses`,
      name: `New Addresses`,
      title: `New Addresses`,
      description: "",
      icon: IconTablerSparkles,
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "total-address-count",
              title: `New Addresses`,
              color: colors.white,
              dataset: params.datasets.dateToNewAddressCount,
            },
          ],
        });
      },
    },
    {
      id: `total-addresses-created`,
      name: `Total Addresses Created`,
      title: `Total Addresses Created`,
      description: "",
      icon: IconTablerArchive,
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "total-addresses-created",
              title: `Total Addresses Created`,
              color: colors.bitcoin,
              seriesType: SeriesType.Area,
              dataset: params.datasets.dateToTotalAddressesCreated,
            },
          ],
        });
      },
    },
    {
      id: `total-empty-addresses`,
      name: `Total Empty Addresses`,
      title: `Total Empty Addresses`,
      description: "",
      icon: IconTablerTrash,
      applyPreset(params) {
        return applyMultipleSeries({
          ...params,
          priceScaleOptions: {
            halved: true,
          },
          list: [
            {
              id: "total-empty-addresses",
              title: `Total Empty Addresses`,
              color: colors.darkWhite,
              seriesType: SeriesType.Area,
              dataset: params.datasets.dateToTotalEmptyAddresses,
            },
          ],
        });
      },
    },
    {
      id: "addresses-by-size",
      name: "By Size",
      tree: [
        createAddressPresetFolder({
          id: "plankton",
          color: colors.plankton,
          name: "Plankton",
          datasetKey: "Plankton",
        }),
        createAddressPresetFolder({
          id: "shrimp",
          color: colors.shrimp,
          name: "Shrimp",
          datasetKey: "Shrimp",
        }),
        createAddressPresetFolder({
          id: "crab",
          color: colors.crab,
          name: "Crab",
          datasetKey: "Crab",
        }),
        createAddressPresetFolder({
          id: "fish",
          color: colors.fish,
          name: "Fish",
          datasetKey: "Fish",
        }),
        createAddressPresetFolder({
          id: "shark",
          color: colors.shark,
          name: "Shark",
          datasetKey: "Shark",
        }),
        createAddressPresetFolder({
          id: "whale",
          color: colors.whale,
          name: "Whale",
          datasetKey: "Whale",
        }),
        createAddressPresetFolder({
          id: "humpback",
          color: colors.humpback,
          name: "Humpback",
          datasetKey: "Humpback",
        }),
        createAddressPresetFolder({
          id: "megalodon",
          color: colors.white,
          name: "Megalodon",
          datasetKey: "Megalodon",
        }),
      ],
    },
    {
      id: "addresses-by-type",
      name: "By Type",
      tree: [
        createAddressPresetFolder({
          id: "p2pk",
          color: colors.plankton,
          name: "P2PK",
          datasetKey: "P2PK",
        }),
        createAddressPresetFolder({
          id: "p2pkh",
          color: colors.shrimp,
          name: "P2PKH",
          datasetKey: "P2PKH",
        }),
        createAddressPresetFolder({
          id: "p2sh",
          color: colors.crab,
          name: "P2SH",
          datasetKey: "P2SH",
        }),
        createAddressPresetFolder({
          id: "p2wpkh",
          color: colors.fish,
          name: "P2WPKH",
          datasetKey: "P2WPKH",
        }),
        createAddressPresetFolder({
          id: "p2wsh",
          color: colors.shark,
          name: "P2WSH",
          datasetKey: "P2WSH",
        }),
        createAddressPresetFolder({
          id: "p2tr",
          color: colors.whale,
          name: "P2TR",
          datasetKey: "P2TR",
        }),
      ],
    },
  ],
};

function createAddressPresetFolder({
  id,
  color,
  name,
  datasetKey,
}: {
  id: string;
  name: string;
  datasetKey: AddressCohortName;
  color: string;
}): PresetFolder {
  return {
    id: `addresses-${id}`,
    name,
    tree: [
      createAddressCountPreset({ id, name, datasetKey, color }),
      ...createCohortPresetList({
        color,
        datasetKey,
        id,
      }),
      {
        id: `addresses-${id}-liquidity`,
        name: `Split By Liquidity`,
        tree: liquidities.map((liquidity): PresetFolder => {
          const _id = `${id}-${liquidity.route}`;
          return {
            id: _id,
            name: liquidity.name,
            tree: createCohortPresetList({
              color,
              datasetKey: `${liquidity.name} ${datasetKey}`,
              id: _id,
            }),
          };
        }),
      },
    ],
  };
}

export function createAddressCountPreset({
  id,
  color,
  name,
  datasetKey,
}: {
  id: string;
  name: string;
  datasetKey: AddressCohortName;
  color: string;
}): PartialPreset {
  return {
    id: `${id}-address-count`,
    name: `Address Count`,
    title: `${name} Address Count`,
    icon: IconTablerAddressBook,
    applyPreset(params) {
      return applyMultipleSeries({
        ...params,
        priceScaleOptions: {
          halved: true,
        },
        list: [
          {
            id: "address-count",
            title: "Address Count",
            color,
            dataset: params.datasets[`dateTo${datasetKey}AddressCount`],
          },
        ],
      });
    },
    description: "",
  };
}
