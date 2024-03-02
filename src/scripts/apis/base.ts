import { sleep } from "/src/scripts";

export const DEFAULT_NUMBER_OF_TRIES = 1;

export async function retryingFetch(
  url: string,
  init: RequestInit | undefined = undefined,
  tries = DEFAULT_NUMBER_OF_TRIES,
): Promise<ResponseWithJSON> {
  import.meta.env.MODE !== "test" && console.log(`fetch: ${url}`);

  if (!tries) {
    throw new Error("Fetch failed");
  }

  try {
    const result: ResponseWithJSON = await fetch(url, init);

    const json = await result.clone().json();

    if (
      result.ok &&
      typeof json === "object" &&
      ((Array.isArray(json) && json.length) ||
        (!Array.isArray(json) &&
          !("message" in json) &&
          !("status_code" in json)))
    ) {
      result.jsoned = json;

      return result;
    }
  } catch {}

  await sleep(5000);

  return retryingFetch(url, init, tries - 1);
}
