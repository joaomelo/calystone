import { computed } from "vue";
import { treeify } from "@primitives";
import { useStore } from "@web/store";
import { useT } from "@web/i18n";

export function useTree() {
  const { artifacts } = useStore();

  const t = useT();
  const editAction = { name: "edit", label: t("edit") };
  const deleteAction = { name: "delete", label: t("delete") };

  const map = (artifact) => ({
    id: artifact.id,
    title: artifact.name,
    actions: [editAction, deleteAction],
  });

  const tree = computed(() => {
    const list = artifacts.select();
    return treeify(list, { map });
  });

  return tree;
}
