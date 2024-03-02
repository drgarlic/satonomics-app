import { ScrollableFrame } from "./scrollable";

export function SettingsFrame({
  marquee,
  visibleFrame,
}: {
  marquee: ASS<boolean>;
  visibleFrame: Accessor<FrameName>;
}) {
  const value = marquee();

  return (
    <ScrollableFrame hidden={() => visibleFrame() !== "Settings"}>
      <div class="space-y-4 p-3">
        <div>settings</div>
        <div>
          <label class="switch">
            Marquee
            <input
              type="checkbox"
              checked={value}
              onChange={(event) => marquee.set(event.target.checked || false)}
            />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </ScrollableFrame>
  );
}
