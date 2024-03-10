import { scales } from "..";
import { createBackEndResource } from "./base";

export function createCommonResources() {
  type Keys =
    | `NewBlocks`
    | `TransactionCount`
    | `TransactionVolume`
    | `Subsidy`
    | `SubsidyInDollars`
    | `LastSubsidy`
    | `Fees`
    | `TotalAddressesCreated`
    | `CoinblocksDestroyed`
    | `TotalEmptyAddresses`;

  const resources: Partial<Record<`${ResourceScale}To${Keys}`, ResourceHTTP>> =
    {};

  scales.forEach((scale) => {
    resources[`${scale}ToNewBlocks`] = createBackEndResource(
      `/${scale}-to-block_count`,
    );
    resources[`${scale}ToTransactionCount`] = createBackEndResource(
      `/${scale}-to-transaction-count`,
    );
    resources[`${scale}ToTransactionVolume`] = createBackEndResource(
      `/${scale}-to-transaction-volume`,
    );
    resources[`${scale}ToSubsidy`] = createBackEndResource(
      `/${scale}-to-subsidy`,
    );
    resources[`${scale}ToSubsidyInDollars`] = createBackEndResource(
      `/${scale}-to-subsidy_in_dollars`,
    );
    resources[`${scale}ToLastSubsidy`] = createBackEndResource(
      `/${scale}-to-last_subsidy`,
    );
    resources[`${scale}ToFees`] = createBackEndResource(
      `/${scale}-to-fees-sumed`,
    );
    resources[`${scale}ToTotalAddressesCreated`] = createBackEndResource(
      `/${scale}-to-total_addresses_created`,
    );
    resources[`${scale}ToCoinblocksDestroyed`] = createBackEndResource(
      `/${scale}-to-coinblocks-destroyed`,
    );
    resources[`${scale}ToTotalEmptyAddresses`] = createBackEndResource(
      `/${scale}-to-total_empty_addresses`,
    );
  });

  return resources as Record<`${ResourceScale}To${Keys}`, ResourceHTTP>;
}
