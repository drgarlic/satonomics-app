import { useRegisterSW } from "virtual:pwa-register/solid";

const intervalMS = 60 * 60 * 1000;

export function registerServiceWorker() {
  return useRegisterSW({
    onRegisteredSW(swUrl, r) {
      // eslint-disable-next-line prefer-template
      console.log("SW Registered: " + r);

      r &&
        setInterval(async () => {
          if (!(!r.installing && navigator)) return;

          if ("connection" in navigator && !navigator.onLine) return;

          const resp = await fetch(swUrl, {
            cache: "no-store",
            headers: {
              cache: "no-store",
              "cache-control": "no-cache",
            },
          });

          if (resp?.status === 200) {
            await r.update();
          }
        }, intervalMS);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
    onNeedRefresh() {
      console.log("onNeedRefresh message should not appear");
    },
  });
}
