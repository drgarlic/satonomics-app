const red = "#ef4444";
const darkRed = "#7f1d1d";
const orange = "#f97316";
const darkOrange = "#7c2d12";
const amber = "#f59e0b";
const darkAmber = "#78350f";
const yellow = "#eab308";
const darkYellow = "#713f12";
const lime = "#84cc16";
const darkLime = "#365314";
const green = "#22c55e";
const darkGreen = "#14532d";
const emerald = "#10b981";
const darkEmerald = "#064e3b";
const teal = "#14b8a6";
const darkTeal = "#134e4a";
const cyan = "#06b6d4";
const darkCyan = "#164e63";
const sky = "#0ea5e9";
const darkSky = "#0c4a6e";
const blue = "#3b82f6";
const darkBlue = "#1e3a8a";
const indigo = "#6366f1";
const darkIndigo = "#312e81";
const violet = "#8b5cf6";
const darkViolet = "#4c1d95";
const purple = "#a855f7";
const darkPurple = "#581c87";
const fuchsia = "#d946ef";
const darkFuchsia = "#701a75";
const pink = "#ec4899";
const darkPink = "#831843";
const rose = "#f43f5e";
const darkRose = "#881337";

export const convertCandleToCandleColor = (
  candle: DatedCandlestickData,
  inverse?: boolean,
) =>
  (candle.close || 1) > (candle.open || 0)
    ? !inverse
      ? green
      : red
    : !inverse
      ? red
      : green;

export const convertCandleToVolumeColor = (
  candle: DatedCandlestickData,
  inverse?: boolean,
) =>
  (candle.close || 1) > (candle.open || 0)
    ? !inverse
      ? colors.darkGreen
      : colors.darkRed
    : !inverse
      ? colors.darkRed
      : colors.darkGreen;

// const neutral: {
//   '50': '#fafafa'
//   '100': '#f5f5f5'
//   '200': '#e5e5e5'
//   '300': '#d4d4d4'
//   '400': '#a3a3a3'
//   '500': '#737373'
//   '600': '#525252'
//   '700': '#404040'
//   '800': '#262626'
//   '900': '#171717'
//   '950': '#0a0a0a'
// }

const darkWhite = "#a3a3a3";
const gray = "#525252";

const black = "#000000";
const white = "#ffffff";

export const colors = {
  black,
  white,
  red,
  gray,
  orange,
  yellow,
  green,
  lime,
  violet,
  blue,
  cyan,
  pink,
  rose,
  emerald,
  indigo,
  purple,
  fuchsia,
  amber,
  darkWhite,
  darkRed,
  darkGreen,
  darkRose,
  darkPink,
  bitcoin: orange,
  dollars: emerald,
  closes7DMA: yellow,
  closes30DMA: orange,
  closes111DMA: green,
  closes200DMA: blue,
  closes1YMA: red,
  closes2YMA: purple,
  closes4YMA: pink,
  crab: red,
  fish: lime,
  humpback: violet,
  plankton: emerald,
  shark: cyan,
  shrimp: pink,
  whale: blue,
  realizedPrice: orange,
  oneMonthHolders: cyan,
  threeMonthsHolders: lime,
  sth: yellow,
  sixMonthsHolder: red,
  oneYearHolders: pink,
  twoYearsHolders: purple,
  lth: fuchsia,
  balancedPrice: yellow,
  cointimePrice: yellow,
  trueMarketMeanPrice: blue,
  vaultedPrice: green,
  cvdd: lime,
  terminalPrice: red,
  loss: red,
  profit: green,
  thermoCap: green,
  investorCap: rose,
  realizedCap: purple,
  ethereum: indigo,
  usdt: emerald,
  usdc: blue,
  ust: red,
  busd: yellow,
  usdd: emerald,
  frax: gray,
  dai: amber,
  tusd: indigo,
  pyusd: blue,
  liveliness: rose,
  vaultedness: green,
  activityToVaultednessRatio: violet,
  from10y: indigo,
  from7yTo10y: blue,
  from5yTo7y: cyan,
  from3yTo5y: teal,
  from2yTo3y: emerald,
  from1yTo2y: green,
  from6mTo1y: lime,
  from3mTo6m: yellow,
  from1mTo3m: amber,
  from1wTo1m: orange,
  from1dTo1w: red,
  upTo1d: rose,
  coinblocksCreated: purple,
  coinblocksDestroyed: red,
  coinblocksStored: green,
  momentum: [green, yellow, red],
};
