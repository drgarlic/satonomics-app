import { createLazyMemo } from "@solid-primitives/memo";

export const createResourceDataset = <T>({
  values,
  fetch,
  autoFetch = true,
}: {
  fetch: () => void;
  values: Accessor<T | null>;
  autoFetch?: boolean;
}): Dataset<T> => ({
  values: createLazyMemo(() => {
    if (autoFetch) {
      fetch();
    }

    return values();
  }),
});

// export const createEntities30DBalanceChangeDataset = (
//   resources: ResourcesHTTP,
// ) =>
//   createEntitiesBalanceChangeDataset(
//     resources,
//     createEntity30DBalanceChangeDataset,
//   )

// export const createEntities90DBalanceChangeDataset = (
//   resources: ResourcesHTTP,
// ) =>
//   createEntitiesBalanceChangeDataset(
//     resources,
//     createEntity90DBalanceChangeDataset,
//   )

// export const createEntitiesBalanceChangeDataset = (
//   resources: ResourcesHTTP,
//   createDataset:
//     | typeof createEntity30DBalanceChangeDataset
//     | typeof createEntity90DBalanceChangeDataset,
// ): GroupedDatasetsByEntityName => ({
//   humpbacks: createDataset(resources.humpbacksDistribution, 100_000),
//   whales: createDataset(resources.whalesDistribution, 10_000),
//   sharks: createDataset(resources.sharksDistribution, 1_000),
//   fish: createDataset(resources.fishDistribution, 100),
//   crabs: createDataset(resources.crabsDistribution, 10),
//   shrimps: createDataset(resources.shrimpsDistribution, 1),
//   plankton: createDataset(resources.planktonDistribution, 0.1),
// })

// export const createEntity30DBalanceChangeDataset = <
//   T extends DatedSingleValueData,
// >(
//   resource: ResourceHTTP<T[]>,
//   size: number,
// ) => createEntityBalanceChangeDataset(resource, size, 30)

// export const createEntity90DBalanceChangeDataset = <
//   T extends DatedSingleValueData,
// >(
//   resource: ResourceHTTP<T[]>,
//   size: number,
// ) => createEntityBalanceChangeDataset(resource, size, 90)

// const createEntityBalanceChangeDataset = <T extends DatedSingleValueData>(
//   { fetch, values }: ResourceHTTP<T[]>,
//   size: number,
//   offset: number,
// ) =>
//   createResourceDataset({
//     fetch,
//     values: createLazyMemo(() =>
//       (values() || [])?.slice(offset).map(({ time, date, value }, index) => ({
//         time,
//         date,
//         value: size,
//         color: getBalanceChangeColor(
//           (value / (values()?.[index]?.value || 1) - 1) * 100,
//         ),
//       })),
//     ),
//   })

// const ups = stepColors(colors.black, colors.green, 12)
// const downs = stepColors(colors.black, colors.red, 12)
// const getBalanceChangeColor = (value: number) =>
//   [
//     { color: downs[11], range: [-Infinity, -5] },
//     { color: downs[10], range: [-5, -4.5] },
//     { color: downs[9], range: [-4.5, -4] },
//     { color: downs[8], range: [-4, -3.5] },
//     { color: downs[7], range: [-3.5, -3] },
//     { color: downs[6], range: [-3, -2.5] },
//     { color: downs[5], range: [-2.5, -2] },
//     { color: downs[4], range: [-2, -1.5] },
//     { color: downs[3], range: [-1.5, -1] },
//     { color: downs[2], range: [-1, -0.5] },
//     { color: downs[1], range: [-0.5, -0.125] },
//     { color: colors.black, range: [-0.125, 0.125] },
//     { color: ups[1], range: [0.125, 0.5] },
//     { color: ups[2], range: [0.5, 1] },
//     { color: ups[3], range: [1, 1.5] },
//     { color: ups[4], range: [1.5, 2] },
//     { color: ups[5], range: [2, 2.5] },
//     { color: ups[6], range: [2.5, 3] },
//     { color: ups[7], range: [3, 3.5] },
//     { color: ups[8], range: [3.5, 4] },
//     { color: ups[9], range: [4, 4.5] },
//     { color: ups[10], range: [4.5, 5] },
//     { color: ups[11], range: [5, Infinity] },
//   ].find(({ range }) => value >= range[0] && value < range[1])?.color
