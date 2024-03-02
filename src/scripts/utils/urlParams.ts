import { isSerializedBooleanTrue } from "./storage";

const whitelist = ["from", "to", "preset"];

export function resetURLParams() {
  const urlParams = new URLSearchParams();

  [...new URLSearchParams(window.location.search).entries()]
    .filter(([key, _]) => whitelist.includes(key))
    .forEach(([key, value]) => {
      urlParams.set(key, value);
    });

  window.history.replaceState(null, "", `?${urlParams.toString()}`);
}

export function writeURLParam(key: string, value: string | boolean) {
  const urlParams = new URLSearchParams(window.location.search);

  urlParams.set(key, String(value));

  window.history.replaceState(null, "", `?${urlParams.toString()}`);
}

export function readBooleanURLParam(key: string) {
  const urlParams = new URLSearchParams(window.location.search);
  const parameter = urlParams.get(key);
  if (parameter) {
    return isSerializedBooleanTrue(parameter);
  }
  return null;
}
