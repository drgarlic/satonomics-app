export const sortWhitespaceDataArray = <T extends DatedWhitespaceData>(
  array: T[],
) =>
  array.sort(
    (a, b) =>
      new Date(String(a.date)).getTime() - new Date(String(b.date)).getTime(),
  );
