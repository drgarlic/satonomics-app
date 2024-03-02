export const Header = () => {
  return (
    <header
      class="flex h-[7dvh] flex-none cursor-pointer select-none items-center justify-center border-b border-white bg-black/80 md:h-[10dvh]"
      onClick={() => location.reload()}
    >
      <span class="text-[2.5dvh] font-black uppercase md:text-[3.5dvh]">
        satonomics
      </span>
    </header>
  );
};
