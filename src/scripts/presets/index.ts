import { colors, random, resetURLParams, writeURLParam } from "/src/scripts";
import { createASS } from "/src/solid";

import { presets as addressesPresets } from "./addresses";
import { presets as averagesPresets } from "./averages";
import { presets as basePresets } from "./base";
import { presets as coinblocksPresets } from "./coinblocks";
import { presets as fiatPresets } from "./fiat";
import { presets as hodlersPresets } from "./hodlers";
import { presets as metalsPresets } from "./metals";
import { presets as minersPresets } from "./miners";
import { createCohortPresetList } from "./templates";
import { presets as transactionsPresets } from "./transactions";

export * from "./templates";

export const LOCAL_STORAGE_FAVORITES_KEY = "favorites";
export const LOCAL_STORAGE_VISITED_KEY = "visited";
export const LOCAL_STORAGE_SELECTED_KEY = "preset";
export const LOCAL_STORAGE_FOLDERS_KEY = "folders";

export function createPresets(): Presets {
  const tree: PresetTree = [
    ...basePresets,
    ...createCohortPresetList({
      id: "all",
      color: colors.orange,
      datasetKey: "",
    }),
    transactionsPresets,
    minersPresets,
    hodlersPresets,
    addressesPresets,
    averagesPresets,
    coinblocksPresets,
    fiatPresets,
    metalsPresets,
  ];

  const { list, ids } = flatten(tree);

  checkIfDuplicateIds(ids);

  setIsFavorites(list);

  setVisited(list);

  const favorites = createMemo(() =>
    list.filter((preset) => preset.isFavorite()),
  );

  createEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_FAVORITES_KEY,
      JSON.stringify(favorites().map((p) => p.id)),
    );
  });

  const visited = createMemo(() => list.filter((preset) => preset.visited()));

  createEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_VISITED_KEY,
      JSON.stringify(visited().map((p) => p.id)),
    );
  });

  const history: PresetsHistory = {
    undo: createASS([], { equals: false }),
    redo: createASS([], { equals: false }),
  };

  const selected = createASS(findInitialPreset(list), {
    equals: false,
  });

  createEffect((previousPreset: Preset) => {
    if (previousPreset && previousPreset !== selected()) {
      resetURLParams();
    }
    return selected();
  }, selected());

  createEffect(() => selected().visited.set(true));

  const select = (preset: Preset) => {
    history.undo.set((l) => {
      l.push(selected());
      return l;
    });

    history.redo.set([]);

    _select(preset, selected.set);
  };

  const openedFolders = createASS(
    new Set(
      JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_FOLDERS_KEY) || "[]",
      ) as string[],
    ),
    {
      equals: false,
    },
  );

  createEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_FOLDERS_KEY,
      JSON.stringify(Array.from(openedFolders())),
    );
  });

  return {
    tree,
    list,
    selected,
    favorites,
    undoPossible: createMemo(() => !!history.undo().length),
    redoPossible: createMemo(() => !!history.redo().length),
    select,
    selectRandom() {
      const preset = random(list);

      if (preset) {
        select(preset);
      }
    },
    openedFolders,
    undo() {
      let preset: Preset | undefined;

      history.undo.set((l) => {
        preset = l.pop();
        return l;
      });

      if (preset) {
        history.redo.set((l) => {
          l.push(selected());
          return l;
        });

        const _preset = list.find((_preset) => preset === _preset);

        if (_preset) {
          _select(_preset, selected.set);
        }
      }
    },
    redo() {
      let preset: Preset | undefined;

      history.redo.set((l) => {
        preset = l.pop();
        return l;
      });

      if (preset) {
        history.undo.set((l) => {
          l.push(selected());
          return l;
        });

        const _preset = list.find((_preset) => preset === _preset);

        if (_preset) {
          _select(_preset, selected.set);
        }
      }
    },
  };
}

function _select(preset: Preset, set: Setter<Preset>) {
  const key = LOCAL_STORAGE_SELECTED_KEY;
  const value = preset.id;

  localStorage.setItem(key, value);
  writeURLParam(key, value);

  set(preset);
}

function flatten(ref: PresetTree) {
  const result: { list: PresetList; ids: string[] } = { list: [], ids: [] };

  const _flatten = (ref: PresetTree, path?: FilePath) => {
    ref.forEach((anyPreset) => {
      if ("tree" in anyPreset) {
        result.ids.push(anyPreset.id);

        return _flatten(anyPreset.tree, [
          ...(path || []),
          {
            name: anyPreset.name,
            id: anyPreset.id,
          },
        ]);
      } else {
        const preset = anyPreset as Partial<Preset>;
        preset.path = path || [];
        preset.isFavorite = createASS(false);
        preset.visited = createASS(false);

        if (!preset.id) {
          throw Error("Preset MUST have an ID");
        }

        result.list.push(preset as Preset);
        result.ids.push(preset.id);
      }
    });
  };

  _flatten(ref);

  return result;
}

function checkIfDuplicateIds(ids: string[]) {
  if (ids.length !== new Set(ids).size) {
    const m = new Map<string, number>();

    ids.forEach((id) => {
      m.set(id, (m.get(id) || 0) + 1);
    });

    console.log(
      [...m.entries()].filter(([_, value]) => value > 1).map(([key, _]) => key),
    );

    throw Error("ID duplicate");
  }
}

function findInitialPreset(presets: PresetList): Preset {
  const urlParams = new URLSearchParams(window.location.search);

  return (
    presets.find(
      (preset) => preset.id === urlParams.get(LOCAL_STORAGE_SELECTED_KEY),
    ) ||
    presets.find(
      (preset) =>
        preset.id === localStorage.getItem(LOCAL_STORAGE_SELECTED_KEY),
    ) ||
    presets[0]
  );
}

function setIsFavorites(list: PresetList) {
  (
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY) || "[]",
    ) as string[]
  ).forEach((id) => {
    list.find((preset) => preset.id === id)?.isFavorite.set(true);
  });
}

function setVisited(list: PresetList) {
  (
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_VISITED_KEY) || "[]",
    ) as string[]
  ).forEach((id) => {
    list.find((preset) => preset.id === id)?.visited.set(true);
  });
}
