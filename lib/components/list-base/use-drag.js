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
  };

  const classes = reactive({
    over: false,
  });

  const enter = (event) => {
    if (!isTransferType(event)) return;
    event.preventDefault();
    classes.over = true;
  };

  const leave = (event) => {
    if (!isTransferType(event)) return;
    event.preventDefault();
    classes.over = false;
  };

  const over = (event) => {
    if (!isTransferType(event)) return;
    event.preventDefault();
  };

  const drop = (event) => {
    event.preventDefault();
    classes.over = false;
    const dragValue = event.dataTransfer.getData(transferType);
    if (dragValue === value) return;
    emit("drag", { source: dragValue, target: value });
  };

  const handlers = { start, over, enter, leave, drop };

  return { handlers, classes };
}
