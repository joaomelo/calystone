import { computed } from "vue";

import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { Directory } from "@/domain";
import { useDispatch } from "@/utils";

export function useDragAndDrop(node: Node) {
  const { services } = Store.use();
  const nodes = services.spawnCollections.nodes();

  const { dispatchOrToast } = useDispatch();

  const moveable = computed(() => services.moveNode.moveable({ subject: node }));
  const dragFormat = "application/outline-node";

  async function handleDragdrop(event: DragEvent) {
    if (!event.dataTransfer) return;
    if (!(node instanceof Directory)) return;

    event.preventDefault();

    const id = event.dataTransfer.getData(dragFormat);

    await dispatchOrToast(async () => {
      const subject = nodes.getOrThrow(id);
      const moveable = services.moveNode.moveable({ subject });
      moveable.throwOnFail();

      await services.moveNode.move({
        subject,
        target: node
      });
    });
  };

  function handleDragover(event: DragEvent) {
    if (!(node instanceof Directory)) return;
    if (!event.dataTransfer?.types.includes(dragFormat)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDragstart(event: DragEvent) {
    console.log("dragstart", { node });
    if (!event.dataTransfer) return;
    const host = promoteHost(event.currentTarget);
    console.log("promoteHost", { host });

    event.dataTransfer.setData(dragFormat, node.id);
    event.dataTransfer.effectAllowed = "move";
  }

  function promoteHost(el: EventTarget | null) {
    const li = (el as HTMLElement | null)?.closest<HTMLElement>("[role=\"treeitem\"]");
    if (!li) return null;
    if (!li.hasAttribute("draggable")) {
      li.setAttribute("draggable", "true");
      li.dataset.tmpDrag = "1";
    }
    return li;
  }

  return {
    handleDragdrop,
    handleDragover,
    handleDragstart,
    moveable
  };
}
