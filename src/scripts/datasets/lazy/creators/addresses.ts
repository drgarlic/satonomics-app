import {
  createNetChangeLazyDataset,
  createSubtractedLazyDataset,
} from "./base";

export function createAddressesDatasets({
  resourceDatasets,
}: {
  resourceDatasets: ResourceDatasets;
}) {
  const dateToTotalAddressCount = createSubtractedLazyDataset(
    resourceDatasets.dateToTotalAddressesCreated,
    resourceDatasets.dateToTotalEmptyAddresses,
  );

  const dateToNewAddressCount = createNetChangeLazyDataset(
    resourceDatasets.dateToTotalAddressesCreated,
  );

  return {
    dateToTotalAddressCount,
    dateToNewAddressCount,
  };
}
