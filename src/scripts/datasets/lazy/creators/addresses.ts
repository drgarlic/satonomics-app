import {
  createNetChangeLazyDataset,
  createSubtractedLazyDataset,
} from "./base";

export function createAddressesDatasets<Resources extends AnyResourceDatasets>(
  resources: Resources,
) {
  type Scale = Resources extends DateResourceDatasets ? "date" : "height";

  // TODO: Find a way to remove the `as` and still have it correctly typed, it's a damn nightmare
  const totalAddressCreated =
    resources.totalAddressesCreated as ResourceDataset<Scale>;

  return {
    totalAddressCount: createSubtractedLazyDataset(
      totalAddressCreated,
      resources.totalEmptyAddresses as ResourceDataset<Scale>,
    ),
    newAddressCount: createNetChangeLazyDataset(totalAddressCreated),
  };
}
