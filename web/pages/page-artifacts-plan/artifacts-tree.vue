<script setup>
import { computed } from "vue";
import {
  ListBase,
  useService,
  and,
  useT,
  treeify,
  isRoot as isRootBase,
} from "@lib";
// import ProgramsListItemActions from "./programs-list-item-actions.vue";
import { useArtifacts, createIsOfUser, isArchived } from "@body";

const t = useT();

const editAction = { name: "edit", label: t("edit") };
const archiveAction = { name: "archive", label: t("archive") };
const unarchiveAction = { name: "unarchive", label: t("unarchive") };
const deleteAction = { name: "delete", label: t("delete") };

const map = (artifact) => {
  const actions = artifact.archivedAt
    ? [unarchiveAction, deleteAction]
    : [editAction, archiveAction, deleteAction];

  return {
    id: artifact.id,
    title: artifact.name,
    closed: isArchived(artifact),
    actions,
  };
};

const artifacts = useArtifacts();
const auth = useService("auth");
const isRoot = and(isRootBase, createIsOfUser(auth.user));

const tree = computed(() => {
  const list = Array.from(artifacts.values());
  return treeify(list, { map, isRoot });
});

const handleAction = ({ action, item }) => {
  console.log(action, item.title);
};
</script>
<template>
  <list-base :items="tree" @action="handleAction" />
</template>

<style scoped>
.archived {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
