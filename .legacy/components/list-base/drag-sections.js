export const DRAG_SECTIONS = {
  BOTTOM: "bottom",
  MIDDLE: "middle",
  TOP: "top",
};

export function isDragSection(value) {
  return Object.values(DRAG_SECTIONS).includes(value);
}

export function resolveSection(event) {
  const targetRect = event.target.getBoundingClientRect();
  const sectionHeight = targetRect.height / 3;
  const mouseY = event.clientY;

  const section
    = mouseY < targetRect.top + sectionHeight
      ? DRAG_SECTIONS.TOP
      : mouseY > targetRect.bottom - sectionHeight
        ? DRAG_SECTIONS.BOTTOM
        : DRAG_SECTIONS.MIDDLE;

  return section;
}
