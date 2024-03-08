import { env } from "/src/env";
import { classPropToString } from "/src/solid";

export function Selector({
  activeButton,
  onClick,
  presets,
}: {
  activeButton: Accessor<FrameName>;
  onClick: Setter<FrameName>;
  presets: Presets;
}) {
  return (
    <div
      class={classPropToString([
        env.standalone && "pb-8 md:pb-3",
        "flex justify-around bg-black bg-black/85 p-3 backdrop-blur",
      ])}
    >
      <Button
        name="Chart"
        selected={activeButton}
        setSelected={onClick}
        icon={() =>
          activeButton() === "Chart"
            ? IconTablerChartAreaFilled
            : IconTablerChartLine
        }
        hideOnDesktop
      />
      <Button
        name="Tree"
        selected={activeButton}
        setSelected={onClick}
        icon={() =>
          activeButton() === "Tree" ? IconTablerCactusFilled : IconTablerCactus
        }
      />
      <Button
        name="Favorites"
        selected={activeButton}
        setSelected={onClick}
        icon={() =>
          activeButton() === "Favorites" ? IconTablerStarFilled : IconTablerStar
        }
      />
      <Button
        name="Search"
        selected={activeButton}
        setSelected={onClick}
        icon={() =>
          activeButton() === "Search" ? IconTablerZoomFilled : IconTablerSearch
        }
      />
      <Button
        name="Shuffle"
        selected={activeButton}
        setSelected={onClick}
        icon={() => {
          const dice =
            (Math.round(
              presets.selected().name.length * Math.PI +
                presets.selected().id.length * Math.PI +
                presets.selected().title.length * Math.PI,
            ) %
              6) +
            1;

          if (activeButton() === "Shuffle") {
            switch (dice) {
              case 1:
                return IconTablerDice1Filled;
              case 2:
                return IconTablerDice2Filled;
              case 3:
                return IconTablerDice3Filled;
              case 4:
                return IconTablerDice4Filled;
              case 5:
                return IconTablerDice5Filled;
              default:
                return IconTablerDice6Filled;
            }
          } else {
            switch (dice) {
              case 1:
                return IconTablerDice1;
              case 2:
                return IconTablerDice2;
              case 3:
                return IconTablerDice3;
              case 4:
                return IconTablerDice4;
              case 5:
                return IconTablerDice5;
              default:
                return IconTablerDice6;
            }
          }
        }}
        onClick={presets.selectRandom}
      />
      <Button
        name="Settings"
        selected={activeButton}
        setSelected={onClick}
        icon={() =>
          activeButton() === "Settings"
            ? IconTablerSettingsFilled
            : IconTablerSettings
        }
      />
    </div>
  );
}

function Button({
  name,
  selected,
  setSelected,
  icon,
  hideOnDesktop,
  onClick,
  classes,
}: {
  name: FrameName;
  selected: Accessor<FrameName>;
  setSelected: Setter<FrameName>;
  icon: () => ValidComponent;
  hideOnDesktop?: boolean;
  onClick?: VoidFunction;
  classes?: string;
}) {
  return (
    <button
      class={classPropToString([
        selected() !== name && "opacity-50",
        hideOnDesktop ? "md:hidden" : "",
        "select-none rounded-full p-2 hover:opacity-100 active:scale-90",
        classes,
      ])}
      onClick={() => {
        onClick?.();
        setSelected(name);
      }}
    >
      <Dynamic component={icon()} class="h-5 w-5" />
    </button>
  );
}
