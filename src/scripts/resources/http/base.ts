import { leading, throttle } from "@solid-primitives/scheduled";

import {
  computeBackEndURL,
  ONE_SECOND_IN_MS,
  retryingFetch,
  TEN_SECOND_IN_MS,
} from "/src/scripts";
import { createASS } from "/src/solid";

export const convertJSONToValues = (json: any) =>
  json && typeof json === "object"
    ? Object.entries(json as Record<string, number>).map(
        ([date, value]: [string, number]): DatedSingleValueData => ({
          date,
          time: date,
          value: value ?? NaN,
        }),
      )
    : undefined;

export const createBackEndResource = (path: string) =>
  createResourceHTTP({
    url: computeBackEndURL(path),
    customFetch: retryingFetch,
    transform: convertJSONToValues,
  });

export const createResourceHTTP = <T extends Array<any>>({
  url,
  customFetch,
  transform,
}: {
  url: string;
  customFetch: (path: string, init?: RequestInit) => Promise<ResponseWithJSON>;
  transform?: (json: any) => T | undefined;
}) => {
  const values = createASS(null as T | null);

  const loading = createASS(false);

  let lastSuccessfulFetch: Date | null;

  const reponseToValues = async (response: ResponseWithJSON) => {
    const json = response.jsoned || (await response.json());
    return transform ? transform(json) : (json as T);
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
          const _values = await reponseToValues(cachedResponse);

          if (_values) {
            console.log("values: setting cached...");
            values.set(() => _values);
          }
        }
      } catch {}

      const fetchedResponse = await customFetch(url.toString());

      const clonedResponse = fetchedResponse.clone();

      const _values = await reponseToValues(fetchedResponse);

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
    url: new URL(url),
    drop() {
      values.set(null);
    },
  };

  return resource;
};
