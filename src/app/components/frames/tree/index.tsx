import { openWindow, scrollIntoView, sleep } from "/src/scripts";
import { createASS } from "/src/solid";

import { Counter } from "../counter";
import { ScrollableFrame } from "../scrollable";
import { Tree } from "./components";

export function TreeFrame({
  presets,
  visibleFrame,
  resources,
}: {
  presets: Presets;
  visibleFrame: Accessor<FrameName>;
  resources: ResourcesHTTP;
}) {
  const div = createASS<HTMLDivElement | undefined>(undefined);

  onMount(() => {
    goToSelected(presets);
  });

  return (
    <div
      class="flex max-h-full min-h-0 flex-1 flex-col border-b border-white"
      style={{
        display: visibleFrame() !== "Tree" ? "none" : undefined,
      }}
    >
      <ScrollableFrame>
        <Counter
          setRef={div.set}
          count={() => presets.list.length}
          name="presets"
        />

        <div class="py-1">
          <Tree
            tree={presets.tree}
            openedFolders={presets.openedFolders}
            selected={presets.selected}
            selectPreset={presets.select}
            favorites={presets.favorites}
          />
        </div>
        <div class="border-t border-dashed border-white" />
        <button
          class="w-full px-3 py-1.5 text-left hover:underline"
          onClick={() => {
            openWindow(`<html>
            <head><title>API Routes - SATONOMICS</title></head>
            <body>
            ${Object.entries(resources)
              .map(
                ([name, resource]) =>
                  `<p>${name}: <a href="${resource.url}" target="_blank">${resource.url}</a></p>`,
              )
              .join("\n")}
            </body>
           </html>`);
          }}
        >
          API Routes <span class="opacity-50">- Free & Unlimited</span>
        </button>
      </ScrollableFrame>
      <div class="flex w-full border-t border-dashed border-white bg-black">
        <Button
          onClick={() => {
            presets.openedFolders.set((s) => {
              s.clear();
              return s;
            });

            sleep(10);

            scrollIntoView(div());
          }}
        >
          Close all folders
        </Button>
        <div class="border-r border-dashed border-white" />
        <Button onClick={() => goToSelected(presets)}>Go to selected</Button>
      </div>
    </div>
  );
}

export function Button({
  onClick,
  children,
}: { onClick: VoidFunction } & ParentProps) {
  return (
    <button
      class="group flex w-full flex-1 items-center justify-center bg-black p-3 hover:bg-white/20"
      onClick={onClick}
    >
      <span class="group-active:scale-95">{children}</span>
    </button>
  );
}

async function goToSelected(presets: Presets) {
  batch(() =>
    presets.selected().path.forEach(({ id }) => {
      presets.openedFolders.set((s) => {
        s.add(id);
        return s;
      });
    }),
  );

  await sleep(1);

  scrollIntoView(document.getElementById(presets.selected().id), "center");
}
