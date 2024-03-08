export function Qrcode({ qrcode }: { qrcode: ASS<string> }) {
  return (
    <Show when={qrcode()}>
      <div
        class="absolute inset-0 z-50 flex h-full w-full justify-center bg-black"
        onClick={() => {
          qrcode.set("");
        }}
      >
        <img
          class="aspect-square object-contain"
          src={qrcode()}
          style={{ "image-rendering": "pixelated" }}
        />
      </div>
    </Show>
  );
}
