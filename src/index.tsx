/* @refresh reload */
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { render } from "solid-js/web";

import "./styles/main.css";

import { App } from "./app";
import { createResources } from "./scripts";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(() => {
  const resources = createResources();

  return (
    <MetaProvider>
      <Router>
        <Route
          path="/routes"
          component={() => (
            <div class="flex h-dvh flex-col gap-2 overflow-y-auto p-2">
              <For each={Object.entries(resources.http)}>
                {([name, resource]) => (
                  <p>
                    {name}:
                    <a
                      href={resource.url.toString()}
                      target="_blank"
                      class="ml-1 text-orange-500 visited:text-orange-700 hover:text-orange-300"
                    >
                      {resource.url.toString()}
                    </a>
                  </p>
                )}
              </For>
            </div>
          )}
        />
        <Route
          path="/:preset?"
          component={() => <App resources={resources} />}
        />
      </Router>
    </MetaProvider>
  );
}, root!);
