import { anyCohortDatasets, createResourceDataset } from ".";

export function createAddressResources<Scale extends ResourceScale>(
  scale: Scale,
) {
  const addressDatasets = [...anyCohortDatasets, ...addressOnlyDatasets];

  type Resources = Record<
    | ReturnType<typeof computeAddressKey>
    | ReturnType<typeof computeAddressSplitByLiquidityKey>,
    ResourceDataset<Scale>
  >;

  const partialResources: Partial<Resources> = {};

  addressCohorts.forEach(({ key: addressKey, route: addressRoute }) => {
    addressDatasets.forEach(
      ({ key: cohortKey, route: cohortAttributeRoute }) => {
        const attributeName = computeAddressKey(addressKey, cohortKey);

        const resource = createResourceDataset({
          scale,
          path: `/${scale}-to-${addressRoute}-${cohortAttributeRoute}`,
        });

        // @ts-ignore
        partialResources[attributeName] = resource;

        liquidities.forEach((liquidity) => {
          const attributeName = computeAddressSplitByLiquidityKey(
            addressKey,
            liquidity.key,
            cohortKey,
          );

          const resource = createResourceDataset({
            scale,
            path: `/${scale}-to-${addressRoute}-${liquidity.route}-${cohortAttributeRoute}`,
          });

          // @ts-ignore
          partialResources[attributeName] = resource;
        });
      },
    );
  });

  return partialResources as Resources;
}

function computeAddressKey(
  addressKey: AddressCohortKey,
  addressCohortAttributeName: AddressCohortDatasetKey,
): `${AddressCohortKey}${AddressCohortDatasetKey}` {
  return `${addressKey}${addressCohortAttributeName}`;
}

function computeAddressSplitByLiquidityKey(
  addressKey: AddressCohortKey,
  liquidity: LiquidityKey,
  addressCohortAttributeName: AddressCohortDatasetKey,
): `${AnyPossibleCohortKey}${AddressCohortDatasetKey}` {
  return `${addressKey}${liquidity}${addressCohortAttributeName}`;
}

export const addressCohortsBySize = [
  {
    key: "plankton",
    name: "Plankton",
    route: "plankton",
  },
  {
    key: "shrimp",
    name: "Shrimp",
    route: "shrimp",
  },
  { key: "crab", name: "Crab", route: "crab" },
  { key: "fish", name: "Fish", route: "fish" },
  { key: "shark", name: "Shark", route: "shark" },
  { key: "whale", name: "Whale", route: "whale" },
  { key: "humpback", name: "Humpback", route: "humpback" },
  { key: "megalodon", name: "Megalodon", route: "megalodon" },
] as const;

export const addressCohortsByType = [
  { key: "p2pk", name: "P2PK", route: "p2pk" },
  { key: "p2pkh", name: "P2PKH", route: "p2pkh" },
  { key: "p2sh", name: "P2SH", route: "p2sh" },
  { key: "p2wpkh", name: "P2WPKH", route: "p2wpkh" },
  { key: "p2wsh", name: "P2WSH", route: "p2wsh" },
  { key: "p2tr", name: "P2TR", route: "p2tr" },
] as const;

export const addressCohorts = [
  ...addressCohortsBySize,
  ...addressCohortsByType,
] as const;

export const addressCohortsKeys = addressCohorts.map(({ key }) => key);

export const addressOnlyDatasets = [
  {
    key: "AddressCount",
    route: "address_count",
  },
] as const;

export const liquidities = [
  {
    key: "Illiquid",
    name: "Illiquid",
    route: "illiquid",
  },
  { key: "Liquid", name: "Liquid", route: "liquid" },
  {
    key: "HighlyLiquid",
    name: "Highly Liquid",
    route: "highly_liquid",
  },
] as const;
