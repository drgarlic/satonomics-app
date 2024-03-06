import { generate } from "lean-qr";

import { openWindow } from "/src/scripts";

export function Title({ presets }: { presets: Presets }) {
  return (
    <div class="flex flex-1 items-center overflow-y-auto">
      <button
        class="z-10 -m-1.5 ml-0.5 p-1.5"
        onClick={() => {
          openWindow(
            `<html>
              <head><title>QR Code</title></head>
              <body style="image-rendering: pixelated; display: flex;justify-content: center; height: 100%; margin: 0">
              <canvas id="my-qr-code" style="aspect-ratio: 1 / 1; object-fit: contain;" />
              </body>
            </html>`,
            (child) => {
              const text = document.location.href;

              const qrCode = generate(text);

              const qrCodeElement = child.document.getElementById("my-qr-code");

              if (qrCodeElement) {
                qrCode.toCanvas(qrCodeElement as any);
              }
            },
          );
        }}
      >
        <IconTablerQrcode class="size-8" />
      </button>
      <div class="flex-1 -space-y-1 whitespace-nowrap px-1 py-2">
        <p class="text-xs opacity-50">{`/ ${[...presets.selected().path.map(({ name }) => name), presets.selected().name].join(" / ")}`}</p>
        <p class="font-medium md:text-lg md:font-bold">
          {presets.selected().title}
        </p>
      </div>
    </div>
  );
}
