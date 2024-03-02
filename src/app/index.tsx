import { DocumentEventListener } from "@solid-primitives/event-listener";
import { useWindowSize } from "@solid-primitives/resize-observer";

import {
  cleanChart,
  createDatasets,
  createPresets,
  createResources,
  renderChart,
  sleep,
} from "/src/scripts";
import { createASS } from "/src/solid";

import {
  ChartFrame,
  FavoritesFrame,
  Head,
  Header,
  INPUT_PRESET_SEARCH_ID,
  SearchFrame,
  Selector,
  SettingsFrame,
  TreeFrame,
  // Update,
} from "./components";
import { Background, LOCAL_STORAGE_MARQUEE_KEY } from "./components/background";

const LOCAL_STORAGE_BAR_KEY = "bar-width";

export function App() {
  const tabFocused = createASS(true);

  const legend = createASS<PresetLegend>([]);

  const windowSize = useWindowSize();

  const windowSizeIsAtLeastMedium = createMemo(() => windowSize.width >= 720);

  const barWidth = createASS(
    Number(localStorage.getItem(LOCAL_STORAGE_BAR_KEY)),
  );

  createEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_BAR_KEY, String(barWidth()));
  });

  const _selectedFrame = createASS<FrameName>("Chart");
  const activeFrameButton = createMemo(() =>
    windowSizeIsAtLeastMedium() && _selectedFrame() === "Chart"
      ? "Tree"
      : _selectedFrame(),
  );

  const visibleFrame = createMemo(
    (previous: VisibleFrameName): VisibleFrameName => {
      let activeButton = activeFrameButton();

      if (activeButton === "Shuffle") {
        if (!windowSizeIsAtLeastMedium()) {
          return "Chart";
        } else if (previous === "Chart") {
          return "Tree";
        } else {
          return previous;
        }
      }

      return activeButton;
    },
    "Tree" as VisibleFrameName,
  );

  const resources = createResources();

  const presets = createPresets();

  const marquee = createASS(!!localStorage.getItem(LOCAL_STORAGE_MARQUEE_KEY));

  const resizingBar = createASS(false);

  const { liveCandle } = resources.ws;

  createEffect(() => {
    const latestClose = liveCandle.latest()?.close;
    latestClose && console.log("live:", latestClose);
  });

  createEffect(
    () => {
      if (!windowSizeIsAtLeastMedium() && presets.selected()) {
        _selectedFrame.set("Chart");
      }
    },
    {
      deffer: true,
    },
  );

  onMount(async () => {
    const datasets = await createDatasets(resources.http);

    createEffect(() => {
      const preset = presets.selected();

      if (datasets.candlesticks.values()?.length) {
        untrack(() =>
          renderChart({
            datasets,
            preset,
            liveCandle: liveCandle.latest,
            legendSetter: legend.set,
          }),
        );
      }
    });
  });

  onCleanup(cleanChart);

  return (
    <>
      <Head last={liveCandle.latest} />
      {/* <Update resources={resources.http} /> */}
      <Background marquee={marquee} focused={tabFocused} />
      <DocumentEventListener
        onVisibilitychange={() =>
          tabFocused.set(document.visibilityState === "visible")
        }
        onKeydown={async (event) => {
          switch (event.key) {
            case "Escape": {
              event.stopPropagation();
              event.preventDefault();

              _selectedFrame.set("Chart");

              break;
            }
            case "/": {
              event.stopPropagation();
              event.preventDefault();

              _selectedFrame.set("Search");

              await sleep(50);

              document.getElementById(INPUT_PRESET_SEARCH_ID)?.focus();

              break;
            }
          }
        }}
      />

      <div
        class="h-dvh selection:bg-orange-800"
        onMouseMove={(event) => resizingBar() && barWidth.set(event.x + 1)}
        onMouseUp={() => resizingBar.set(false)}
        onMouseLeave={() => resizingBar.set(false)}
      >
        <div class="h-full border border-white">
          <div class="flex h-full w-full flex-col md:flex-row">
            <div
              class="flex h-full w-full flex-none flex-col md:min-w-[384px] md:max-w-[75%]"
              style={{
                ...(windowSizeIsAtLeastMedium()
                  ? {
                      width: `${Math.min(barWidth(), windowSize.width * 0.75)}px`,
                    }
                  : {}),
              }}
            >
              <Header />

              <ChartFrame
                presets={presets}
                liveCandle={liveCandle}
                resources={resources}
                show={() =>
                  !windowSizeIsAtLeastMedium() && visibleFrame() === "Chart"
                }
                legend={legend}
              />
              <TreeFrame presets={presets} visibleFrame={visibleFrame} />
              <FavoritesFrame presets={presets} visibleFrame={visibleFrame} />
              <SearchFrame presets={presets} visibleFrame={visibleFrame} />
              <SettingsFrame marquee={marquee} visibleFrame={visibleFrame} />

              <Selector
                presets={presets}
                activeButton={activeFrameButton}
                onClick={_selectedFrame.set}
              />
            </div>

            <div
              class="hidden w-1 cursor-col-resize items-center justify-center bg-white md:block"
              onMouseDown={() => resizingBar.set(true)}
              onDblClick={() => barWidth.set(0)}
            />

            <div class="hidden h-full w-full min-w-0 flex-1 md:flex">
              <ChartFrame
                presets={presets}
                liveCandle={liveCandle}
                resources={resources}
                show={windowSizeIsAtLeastMedium}
                legend={legend}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
