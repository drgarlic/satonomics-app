export function Title({ presets }: { presets: Presets }) {
  return (
    <div class="flex flex-1 overflow-y-auto">
      <div class="flex-1 -space-y-1 whitespace-nowrap px-3 py-2">
        <p class="text-xs opacity-50">{`/ ${[...presets.selected().path.map(({ name }) => name), presets.selected().name].join(" / ")}`}</p>
        <p class="font-medium md:text-lg md:font-bold">
          {presets.selected().title}
        </p>
      </div>
    </div>
  );
}
