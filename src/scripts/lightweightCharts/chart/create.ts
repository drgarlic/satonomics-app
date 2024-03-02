import { createChart as _createChart, CrosshairMode } from "lightweight-charts";

import { chartState, cleanChart, colors, priceToUSLocale } from "/src/scripts";

export const createChart = () => {
  cleanChart();

  console.log("chart: create");

  const white = colors.white;

  chartState.chart = _createChart("chart", {
    autoSize: true,
    layout: {
      fontFamily: window
        .getComputedStyle(document.body)
        .getPropertyValue("font-family"),
      background: { color: "transparent" },
      textColor: white,
    },
    grid: {
      vertLines: { visible: false },
      horzLines: { visible: false },
    },
    leftPriceScale: {
      borderColor: white,
    },
    rightPriceScale: {
      scaleMargins: { bottom: 0.1, top: 0.1 },
      borderColor: white,
    },
    timeScale: {
      minBarSpacing: 0.1,
      shiftVisibleRangeOnNewBar: true,
      borderColor: white,
    },
    crosshair: {
      mode: CrosshairMode.Normal,
      horzLine: {
        color: white,
        labelBackgroundColor: white,
      },
      vertLine: {
        color: white,
        labelBackgroundColor: white,
      },
    },
    localization: {
      priceFormatter: priceToUSLocale,
      locale: "en-us",
    },
  });
};
