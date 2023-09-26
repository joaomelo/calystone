import { computed } from "vue";
import { treeify } from "@shared";
import { useStore } from "@view/store";
import { useT } from "@view/i18n";

export function useTree() {
  const { artifacts } = useStore();

  const t = useT();
  const editAction = { name: "edit", label: t("edit") };
  const deleteAction = { name: "del", label: t("delete") };

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
