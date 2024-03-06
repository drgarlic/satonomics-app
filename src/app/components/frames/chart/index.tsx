import { chartState, GENESIS_DAY } from "/src/scripts";

import { Chart, Network, Title } from "./components";
import { Actions } from "./components/actions";
import { Legend } from "./components/legend";
import { TimeScale } from "./components/timeScale";

export function ChartFrame({
  presets,
  resources,
  liveCandle,
  show,
  legend,
  datasets,
}: {
  presets: Presets;
  resources: Resources;
  liveCandle: ResourceWS<FullCandlestick>;
  show: Accessor<boolean>;
  legend: Accessor<PresetLegend>;
  datasets: Datasets;
}) {
  return (
    <div
      class="flex h-full min-h-0 w-full flex-1 flex-col border-b border-white bg-black/95 md:border-none"
      style={{
        display: show() ? undefined : "none",
      }}
    >
      <div class="flex border-b border-dashed border-white backdrop-blur">
        <Title presets={presets} />
      </div>
      <div class="flex border-b border-white backdrop-blur">
        <Legend legend={legend} />
        <div class="border-l border-dashed border-white" />
        <Actions presets={presets} />
      </div>
      <Show when={show()}>
        <div class="min-h-0 flex-1">
          <Chart
            visible={() =>
              !!resources.http.candlesticks.values()?.length &&
              !!liveCandle.latest()
            }
          />
        </div>
      </Show>

      <TimeScale />

      <div class="flex items-center border-t border-white px-3 py-1 backdrop-blur">
        <div>Sources:</div>
        <div class="flex-1" />
        <Network live={liveCandle.live} resources={resources.http} />
      </div>
    </div>
  );
}
