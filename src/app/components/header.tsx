export const Header = ({
  needsRefresh,
  onClick,
}: {
  needsRefresh: Accessor<boolean>;
  onClick: VoidFunction;
}) => {
  return (
    <header
      class="relative flex h-[7dvh] flex-none cursor-pointer select-none items-center justify-center border-b border-white bg-black/80 md:h-[10dvh]"
      onClick={onClick}
    >
      <Show when={needsRefresh()}>
        <span class="absolute inset-y-0 left-0 ml-4 flex items-center md:ml-8">
          <IconTablerRefreshAlert class="absolute size-6 animate-ping text-red-200 opacity-50 md:size-8" />
          <IconTablerRefreshAlert class="relative size-6 text-red-300 md:size-8" />
        </span>
      </Show>
      <span class="text-[2.5dvh] font-black uppercase md:text-[3.5dvh]">
        satonomics
      </span>
    </header>
  );
};
