import type { OutlineGridItem } from "@/utils";

import { Store } from "@/display/store";
import { Node } from "@/domain";
import { useDispatch } from "@/utils";

export function useDragAndDrop() {
  const { services } = Store.use();
  const { dispatchOrToast } = useDispatch();

  async function handleDrop({
    drag,
    drop
  }: {
    drag: OutlineGridItem;
    drop: OutlineGridItem
  }) {
    if (!(drag.data instanceof Node) || !(drop.data instanceof Node)) return;

    const target = drop.data;
    const subject = drag.data;

    await dispatchOrToast(async () => {
      const moveable = services.moveNode.moveable({
        subject,
        target
      });
      moveable.throwOnFail();
      await services.moveNode.move({
        subject,
        target
      });
    });
  };

  // function handleDragover(event: DragEvent) {
  //   if (!(node instanceof Directory)) return;
  //   if (!event.dataTransfer?.types.includes(dragFormat)) return;
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = "move";
  // }

  // function handleDragstart(event: DragEvent) {
  //   if (!event.dataTransfer) return;

  //   event.dataTransfer.setData(dragFormat, node.id);
  //   event.dataTransfer.effectAllowed = "move";
  // }

  return { handleDrop };
}
