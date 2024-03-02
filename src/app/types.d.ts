type FrameName =
  | "Chart"
  | "Tree"
  | "Favorites"
  | "Search"
  | "Shuffle"
  | "Settings";

type VisibleFrameName = Exclude<FrameName, "Shuffle">;
