import { saveToStorage, writeURLParam } from "/src/scripts";

export function Legend({ legend }: { legend: Accessor<PresetLegend> }) {
  return (
    <div class="flex flex-1 items-center gap-2 overflow-y-auto px-3">
      <For each={legend()}>
        {({ color, hovering, title, visible }) => (
          <button
            onMouseEnter={() => hovering.set(true)}
            onMouseLeave={() => hovering.set(false)}
            onClick={() => visible.set((visible) => !visible)}
            class="flex flex-none gap-1.5 rounded-full p-1.5 pr-2 hover:bg-white/20 active:scale-[0.975]"
          >
            <span
              class="flex size-5 flex-col overflow-hidden rounded-full"
              style={{
                opacity: visible() ? 1 : 0.5,
              }}
            >
              <For
                each={
                  Array.isArray(color())
                    ? (color() as string[])
                    : [color() as string]
                }
              >
                {(color) => (
                  <span
                    class="w-full flex-1"
                    style={{
                      "background-color": color,
                    }}
                  />
                )}
              </For>
            </span>
            <span
              class="text-white decoration-white decoration-wavy decoration-[1.5px]"
              style={{
                "text-decoration-line": !visible() ? "line-through" : undefined,
                "--tw-text-opacity": visible() ? 1 : 0.5,
              }}
            >
              {title}
            </span>
          </button>
        )}
      </For>
    </div>
  );
}
