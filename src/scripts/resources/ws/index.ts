import { krakenAPI } from "/src/scripts";

import { createResourceWS } from "./base";

export const createResourcesWS = () => {
  const resources: ResourcesWS = {
    liveCandle: createResourceWS(krakenAPI.createLiveCandleWebsocket),
  };

  resources.liveCandle.open();

  return resources;
};
