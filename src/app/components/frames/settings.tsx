import { ScrollableFrame } from "./scrollable";

export function SettingsFrame({
  marquee,
  selectedFrame,
}: {
  marquee: ASS<boolean>;
  selectedFrame: Accessor<FrameName>;
}) {
  const value = marquee();

  return (
    <ScrollableFrame hidden={() => selectedFrame() !== "Settings"}>
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
