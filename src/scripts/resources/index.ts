import { createResourcesHTTP } from "./http";
import { createResourcesWS } from "./ws";

export * from "./http";

export const createResources = () => {
  const resources: Resources = {
    http: createResourcesHTTP(),
    ws: createResourcesWS(),
  };

  return resources;
};
