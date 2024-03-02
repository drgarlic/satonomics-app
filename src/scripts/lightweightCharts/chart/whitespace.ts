import { dateToString } from "/src/scripts";

export const DAY_BEFORE_GENESIS_DAY = "2009-01-02";
export const GENESIS_DAY = "2009-01-03";
export const DAY_BEFORE_WHITEPAPER_DAY = "2008-10-30";
export const WHITEPAPER_DAY = "2008-10-31";

export const updateWhitespaceDataset = (
  whitespaceDataset: DatedWhitespaceData[],
) => {
  const date = new Date(
    (whitespaceDataset.at(-1)?.date as string | undefined) ||
      DAY_BEFORE_WHITEPAPER_DAY,
  );

  const todayValueOf = new Date().valueOf();

  const tickDate = () => date.setUTCDate(date.getUTCDate() + 1);

  tickDate();

  while (date.valueOf() <= todayValueOf) {
    const dateStr = dateToString(date);

    whitespaceDataset.push({
      date: dateStr,
      time: dateStr,
    });

    tickDate();
  }
};
