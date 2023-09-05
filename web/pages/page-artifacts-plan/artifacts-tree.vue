<script setup>
import { computed } from "vue";
import { ListBase, useService, and, treeify, isRoot as isRootBase } from "@lib";
// import ProgramsListItemActions from "./programs-list-item-actions.vue";
import { useArtifacts, createIsOfUser, isArchived } from "@body";
import { useActions } from "./use-actions";

const { solveActions, solveTask } = useActions();

const map = (artifact) => {
  const actions = solveActions(artifact);
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
  const task = solveTask(action);
  return task.run(item);
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
