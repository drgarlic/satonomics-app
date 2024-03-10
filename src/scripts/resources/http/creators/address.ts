import { anyCohortAttributes, createBackEndResource } from ".";
import { scales } from "..";

export function createCommonAddressResources() {
  const addressCohortAttributes = [
    ...anyCohortAttributes,
    ...addressOnlyCohortAttributes,
  ];

  type AddressResources = Record<
    | ReturnType<typeof computeAddressAttributeName>
    | ReturnType<typeof computeAddressSplitByLiquidityAttributeName>,
    ResourceHTTP
  >;

  const partialAddressResources: Partial<AddressResources> = {};

  scales.forEach((scale) => {
    addressCohorts.forEach(({ name: addressName, route: addressRoute }) => {
      addressCohortAttributes.forEach(
        ({ key: cohortAttributeName, route: cohortAttributeRoute }) => {
          const attributeName = computeAddressAttributeName(
            scale,
            addressName,
            cohortAttributeName,
          );

          partialAddressResources[attributeName] = createBackEndResource(
            `/${scale}-to-${addressRoute}-${cohortAttributeRoute}`,
          );

          liquidities.forEach((liquidity) => {
            const attributeName = computeAddressSplitByLiquidityAttributeName(
              scale,
              addressName,
              cohortAttributeName,
              liquidity.name,
            );

            partialAddressResources[attributeName] = createBackEndResource(
              `/${scale}-to-${addressRoute}-${liquidity.route}-${cohortAttributeRoute}`,
            );
          });
        },
      );
    });
  });

  return partialAddressResources as AddressResources;
}

function computeAddressAttributeName(
  scale: ResourceScale,
  addressCohortName: AddressCohortName,
  addressCohortAttributeName: AddressCohortAttributeName,
): `${ResourceScale}To${AddressCohortName}${AddressCohortAttributeName}` {
  return `${scale}To${addressCohortName}${addressCohortAttributeName}`;
}

function computeAddressSplitByLiquidityAttributeName(
  scale: ResourceScale,
  addressCohortName: AddressCohortName,
  addressCohortAttributeName: AddressCohortAttributeName,
  liquidity: LiquidityName,
): `${ResourceScale}To${AnyPossibleCohortName}${AddressCohortAttributeName}` {
  return `${scale}To${liquidity} ${addressCohortName}${addressCohortAttributeName}`;
}

export const addressCohorts = [
  {
    name: "Plankton",
    route: "plankton",
  },
  {
    name: "Shrimp",
    route: "shrimp",
  },
  { name: "Crab", route: "crab" },
  { name: "Fish", route: "fish" },
  { name: "Shark", route: "shark" },
  { name: "Whale", route: "whale" },
  { name: "Humpback", route: "humpback" },
  { name: "Megalodon", route: "megalodon" },
  { name: "P2PK", route: "p2pk" },
  { name: "P2PKH", route: "p2pkh" },
  { name: "P2SH", route: "p2sh" },
  { name: "P2WPKH", route: "p2wpkh" },
  { name: "P2WSH", route: "p2wsh" },
  { name: "P2TR", route: "p2tr" },
] as const;

export const addressCohortsNames = addressCohorts.map(({ name }) => name);

export const addressOnlyCohortAttributes = [
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

export const liquidityNames = liquidities.map(({ name }) => name);
