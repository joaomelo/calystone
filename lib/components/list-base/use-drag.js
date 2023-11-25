import { COLLAPSE_STATUSES } from "./collapse-statuses";

const transferType = "application/item-value";

export function useDrag({ collapseStatus, value, emit }) {
  const handleStart = (event) => {
    event.stopPropagation();
    if (collapseStatus.value === COLLAPSE_STATUSES.OPEN) {
      collapseStatus.value = COLLAPSE_STATUSES.CLOSED;
    }
    event.dataTransfer.setData(transferType, value);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
  };

  const handleOver = (event) => {
    event.preventDefault();
    // the event data store is unavailable during dragover it only open when the drop is done. so we can't use `event.dataTransfer.getData(transferType)` here to check if it is the same item
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const dragValue = event.dataTransfer.getData(transferType);
    if (dragValue === value) return;
    emit("drag", { source: dragValue, target: value });
  };

  return { handleStart, handleOver, handleDrop };
}
