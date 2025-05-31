import { Store } from "@/display/store";
import { Directory } from "@/domain";
import { Status, useDispatch } from "@/utils";
import { computed } from "vue";

import type { ItemData } from "./item";

export function useDragAndDrop(data: ItemData) {
  return data.type === "tag" ? useDragAndDropTag() : useDranAndDropNode(data.key);
}

function useDragAndDropTag() {
  const moveable = computed(() => Status.fail("TAGS_DO_NOT_SUPPORT_DRAG_DROP"));
  return {
    handleDragdrop: undefined,
    handleDragover: undefined,
    handleDragstart: undefined,
    moveable
  };
}

function useDranAndDropNode(id: string) {
  const { nodes, services } = Store.use();
  const { dispatchOrToast } = useDispatch();

  const node = nodes.getOrThrow(id);

  const moveable = computed(() => services.moveNode.moveable(node));
  const dragFormat = "application/outline-item";

  async function handleDragdrop(event: DragEvent) {
    if (!event.dataTransfer) return;
    if (!(node instanceof Directory)) return;

    event.preventDefault();

    const id = event.dataTransfer.getData(dragFormat);

    await dispatchOrToast(async () => {
      const subject = nodes.getOrThrow(id);
      const moveable = subject.moveable(node);
      moveable.throwOnFail();

      await services.moveNode.move({ subject, target: node });
    });
  };

  function handleDragover(event: DragEvent) {
    if (!(node instanceof Directory)) return;
    if (!event.dataTransfer?.types.includes(dragFormat)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDragstart(event: DragEvent) {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData(dragFormat, id);
    event.dataTransfer.effectAllowed = "move";
  }

  return {
    handleDragdrop,
    handleDragover,
    handleDragstart,
    moveable
  };
}
