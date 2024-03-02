import {
  readBooleanFromStorage,
  readBooleanURLParam,
  saveToStorage,
  writeURLParam,
} from "/src/scripts/utils";
import { createASS } from "/src/solid";

export function createSeriesLegend({
  id,
  presetId,
  title,
  color,
  series,
}: {
  id: string;
  presetId: string;
  title: string;
  color: Accessor<string | string[]>;
  series: ISeriesApi<SeriesType>;
}) {
  const storageID = `${presetId}-${id}`;

  const visible = createASS(
    readBooleanURLParam(id) ?? readBooleanFromStorage(storageID) ?? true,
  );

  createEffect(() => {
    series.applyOptions({
      visible: visible(),
    });
    writeURLParam(id, visible());
    saveToStorage(storageID, visible());
  });

  return {
    id,
    title,
    series,
    color,
    hovering: createASS(false),
    visible,
  };
}
