import { SATS_PER_BITCOIN } from "/src/scripts";

// export const convertNormalCandleToSatCandle = ({
//   date,
//   open,
//   high,
//   low,
//   close,
// }: DatedCandlestickData): DatedCandlestickData => ({
//   date,
//   time: date,
//   open: SATS_PER_BITCOIN / open,
//   high: SATS_PER_BITCOIN / low,
//   low: SATS_PER_BITCOIN / high,
//   close: SATS_PER_BITCOIN / close,
// });

// export const convertNormalCandleToGoldPerBitcoinCandle = (
//   { date, open, high, low, close }: DatedCandlestickData,
//   goldPrice: number,
// ): DatedCandlestickData => ({
//   date,
//   time: date,
//   open: open / goldPrice,
//   high: high / goldPrice,
//   low: low / goldPrice,
//   close: close / goldPrice,
// });
