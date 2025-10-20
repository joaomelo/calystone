import type { OutlineGridItem } from "@/display/affordances/outline-grid";

import { useDispatch } from "@/display/affordances/dispatch";
import { Store } from "@/display/store";
import { Node } from "@/domain";

export function useDragAndDrop() {
  const { services } = Store.use();
  const { dispatchOrToast } = useDispatch();

  async function handleDrop({
    dragNode,
    dropNode
  }: {
    dragNode: OutlineGridItem;
    dropNode: OutlineGridItem
  }) {
    if (!(dragNode.data instanceof Node) || !(dropNode.data instanceof Node)) return;

    const target = dropNode.data;
    const subject = dragNode.data;

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

  return { handleDrop };
}
