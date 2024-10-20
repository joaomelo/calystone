import { reactive } from "vue";

import { resolveSection } from "./drag-sections";

const transferType = "application/item-value";

export function useDrag({ draggable, emit, value }) {
  const { classes, resetClasses } = createClasses();

  const start = createStart({ emit, value });

  const canDrop = createCanDrop(value);
  const enter = createEnter({ canDrop, classes });
  const leave = createLeave({ canDrop, resetClasses });
  const over = createOver({ canDrop, classes, draggable, resetClasses });
  const drop = createDrop({ canDrop, draggable, emit, resetClasses, value });
  const end = () => emit("drag-end");

  const handlers = { drop, end, enter, leave, over, start };

  return { classes, handlers };
}

export function createClasses() {
  const classes = reactive({
    bottom: false,
    middle: false,
    over: false,
    top: false,
  });
  const resetClasses = () => {
    classes.over = false;
    classes.top = false;
    classes.middle = false;
    classes.bottom = false;
  };
  return { classes, resetClasses };
}

function createStart({ emit, value }) {
  return (event) => {
    event.stopPropagation();

    event.dataTransfer.setData(transferType, value);
    // artificially setting the datatype as the item id to be used is other events, since the data type value itself is only available during drop
    event.dataTransfer.setData(value, value);

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";

    emit("drag-start");
  };
}

function createEnter({ canDrop, classes }) {
  return (event) => {
    if (!canDrop(event)) return;
    event.preventDefault();
    classes.over = true;
  };
}

function createLeave({ canDrop, resetClasses }) {
  return (event) => {
    if (!canDrop(event)) return;
    event.preventDefault();
    resetClasses();
  };
}

function createOver({ canDrop, classes, draggable, resetClasses }) {
  return (event) => {
    if (!canDrop(event)) return;

    const section = resolveSection(event);
    if (!draggable[section]) return;

    event.preventDefault();

    resetClasses();
    classes.over = true;
    classes[section] = true;
  };
}

function createDrop({ canDrop, draggable, emit, resetClasses, value }) {
  return (event) => {
    resetClasses();

    if (!canDrop(event)) return;

    const section = resolveSection(event);
    if (!draggable[section]) return;

    event.preventDefault();

    const dragValue = event.dataTransfer.getData(transferType);
    emit("drag", { section, source: dragValue, target: value });
  };
}

function createCanDrop(value) {
  return (event) => {
    const types = event.dataTransfer.types;
    // for security reasons we don't have access to the data transfer value during over, only the type. so as a workaround we included the item id itself as a type
    return types.includes(transferType) && !types.includes(value);
  };
}
