interface PartialPreset {
  id: string;
  icon?: () => JSXElement;
  name: string;
  title: string;
  applyPreset: ApplyPreset;
  description: string;
}

interface Preset extends PartialPreset {
  path: FilePath;
  isFavorite: ASS<boolean>;
  visited: ASS<boolean>;
}

type FilePath = {
  id: string;
  name: string;
}[];

type ApplyPreset = (params: {
  chart: IChartApi;
  datasets: Datasets;
  liveCandle: Accessor<FullCandlestick | null>;
  preset: Preset;
}) => ApplyPresetReturn;

type ApplyPresetReturn = PresetLegend;

type PresetFolder = {
  id: string;
  name: string;
  tree: PresetTree;
};

type PresetTree = (PartialPreset | PresetFolder)[];
type PresetList = Preset[];
type FavoritePresets = Accessor<Preset[]>;

interface PresetsHistory {
  undo: ASS<Preset[]>;
  redo: ASS<Preset[]>;
}

interface Presets {
  tree: PresetTree;
  list: PresetList;
  favorites: FavoritePresets;

  selected: ASS<Preset>;
  openedFolders: ASS<Set<string>>;

  undoPossible: Accessor<boolean>;
  redoPossible: Accessor<boolean>;

  select(preset: Preset): void;
  selectRandom: VoidFunction;
  undo: VoidFunction;
  redo: VoidFunction;
}

type PresetLegend = SeriesLegend[];
