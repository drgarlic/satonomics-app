const useProdURL =
  import.meta.env.VITE_TEST_PROD || location.protocol === "https:";

export function computeBackEndURL(path: string) {
  return `${
    useProdURL ? "https://api.satonomics.xyz" : "http://localhost:3110"
  }${path}`;
}
