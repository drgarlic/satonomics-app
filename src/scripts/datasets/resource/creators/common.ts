import { createResourceDataset } from "./base";

export function createCommonResources<Scale extends ResourceScale>(
  scale: Scale,
) {
  return {
    newBlocks: createResourceDataset({
      scale,
      path: `/${scale}-to-block_count`,
    }),
    transactionCount: createResourceDataset({
      scale,
      path: `/${scale}-to-transaction-count`,
    }),
    transactionVolume: createResourceDataset({
      scale,
      path: `/${scale}-to-transaction-volume`,
    }),
    subsidy: createResourceDataset({
      scale,
      path: `/${scale}-to-subsidy`,
    }),
    subsidyInDollars: createResourceDataset({
      scale,
      path: `/${scale}-to-subsidy_in_dollars`,
    }),
    lastSubsidy: createResourceDataset({
      scale,
      path: `/${scale}-to-last_subsidy`,
    }),
    fees: createResourceDataset({
      scale,
      path: `/${scale}-to-fees-sumed`,
    }),
    totalAddressesCreated: createResourceDataset({
      scale,
      path: `/${scale}-to-total_addresses_created`,
    }),
    coinblocksDestroyed: createResourceDataset({
      scale,
      path: `/${scale}-to-coinblocks-destroyed`,
    }),
    totalEmptyAddresses: createResourceDataset({
      scale,
      path: `/${scale}-to-total_empty_addresses`,
    }),
  };
}
