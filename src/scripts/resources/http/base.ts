import { leading, throttle } from "@solid-primitives/scheduled";

import {
  computeBackEndURL,
  ONE_SECOND_IN_MS,
  retryingFetch,
  TEN_SECOND_IN_MS,
} from "/src/scripts";
import { createASS } from "/src/solid";

export function createBackEndResource(path: string) {
  return createResourceHTTP({
    url: computeBackEndURL(path),
    customFetch: retryingFetch,
    transform: convertJSONToValues,
  });
}

export function createResourceHTTP<T extends Array<any>>({
  url,
  customFetch,
  transform,
}: {
  url: string;
  customFetch: (path: string, init?: RequestInit) => Promise<ResponseWithJSON>;
  transform?: (json: any) => T | undefined;
}) {
  const values = createASS(null as T | null);

  const loading = createASS(false);

  const source = createASS<Source | undefined>(undefined);

  let lastSuccessfulFetch: Date | null;

  const responseToValues = async (response: ResponseWithJSON) => {
    const json = response.jsoned || (await response.json());

    source.set(json.source);

    return transform ? transform(json.dataset) : (json.dataset as T);
  };

  const throttledFetch = leading(
    throttle,
    async () => {
      const url = resource.url;

      if (
        lastSuccessfulFetch &&
        new Date().valueOf() - lastSuccessfulFetch.valueOf() < TEN_SECOND_IN_MS
      )
        return;

      loading.set(true);

      let cache: Cache | undefined;

      try {
        cache = await caches.open("resources-cache");

        const cachedResponse = await cache.match(url.toString());

        if (cachedResponse) {
          const _values = await responseToValues(cachedResponse);

          if (_values) {
            console.log(
              `values: setting cached... (length: ${_values.length})`,
            );
            values.set(() => _values);
          }
        }
      } catch {}

      const fetchedResponse = await customFetch(url.toString());

      const clonedResponse = fetchedResponse.clone();

      const _values = await responseToValues(fetchedResponse);

      if (_values) {
        lastSuccessfulFetch = new Date();

        if (cache) {
          await cache.put(url, clonedResponse);
        }

        console.log("values: setting fetched...");

        values.set(() => _values);
      }

      loading.set(false);
    },
    ONE_SECOND_IN_MS,
  );

  const resource: ResourceHTTP<T> = {
    fetch: throttledFetch,
    values,
    loading,
    source,
    url: new URL(url),
    drop() {
      values.set(null);
    },
  };

  return resource;
}

function convertJSONToValues(json: any) {
  if (!json || typeof json !== "object") return undefined;

  return Object.entries(json as Record<string, number>).map(
    ([date, value]: [string, number]): DatedSingleValueData => ({
      date,
      time: date,
      value: value ?? NaN,
    }),
  );
}
