export function openWindow(text: string, f?: (child: Window) => void) {
  const child = window.open(undefined, undefined, "modal=yes");
  if (!child) return;

  child.document.write(text);

  f?.(child);

  child.document.close();
}
