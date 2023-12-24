export function place({ anchor, popover, inline, block }) {
  const anchorRect = anchor.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  const offset = 5;

  const top =
    block === "start"
      ? anchorRect.top - popoverRect.height - offset
      : block === "end"
      ? anchorRect.bottom + offset
      : anchorRect.top + (anchorRect.height - popoverRect.height) / 2;

  const left =
    inline === "start"
      ? anchorRect.left + offset
      : inline === "end"
      ? anchorRect.right - popoverRect.width - offset
      : anchorRect.left + (anchorRect.width - popoverRect.width) / 2;

  return { top, left };
}
