import { reactive } from "vue";

const transferType = "application/item-value";
// for security reasons we don't have access to the data transfer data during over, only the type. so we can check if what is been dragged is an application item but not if is the same item that is the target area. we will have to check that during drop.
const isTransferType = (event) =>
  event.dataTransfer.types.includes(transferType);

export function useDrag({ value, emit }) {
  const start = (event) => {
    event.stopPropagation();
    event.dataTransfer.setData(transferType, value);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    emit("drag-start");
  };

  const dragClasses = reactive({
    over: false,
    top: false,
    middle: false,
    bottom: false,
  });
  const resetClasses = () => {
    dragClasses.over = false;
    dragClasses.top = false;
    dragClasses.middle = false;
    dragClasses.bottom = false;
  };

  const enter = (event) => {
    if (!isTransferType(event)) return;
    event.preventDefault();
    dragClasses.over = true;
  };

  const leave = (event) => {
    if (!isTransferType(event)) return;
    event.preventDefault();
    resetClasses();
  };

  const over = (event) => {
    if (!isTransferType(event)) return;
    event.preventDefault();

    const section = resolveSection(event);
    resetClasses();
    dragClasses.over = true;
    switch (section) {
      case "top":
        return (dragClasses.top = true);
      case "middle":
        return (dragClasses.middle = true);
      case "bottom":
        return (dragClasses.bottom = true);
    }
  };

  const drop = (event) => {
    event.preventDefault();
    resetClasses();

    const dragValue = event.dataTransfer.getData(transferType);
    if (dragValue === value) return;

    const section = resolveSection(event);
    emit("drag", { source: dragValue, target: value, section });
  };

  const end = () => {
    emit("drag-end");
  };

  const handlers = { start, over, enter, leave, drop, end };

  return { handlers, dragClasses };
}

function resolveSection(event) {
  const targetRect = event.target.getBoundingClientRect();
  const sectionHeight = targetRect.height / 3;
  const mouseY = event.clientY;

  const section =
    mouseY < targetRect.top + sectionHeight
      ? "top"
      : mouseY > targetRect.bottom - sectionHeight
      ? "bottom"
      : "middle";
  return section;
}
