<script setup>
import { computed } from "vue";
import {
  and,
  isRoot as isRootBase,
  ListBase,
  treeify,
  useAuthState,
  useT,
} from "@lib";
import { useArtifacts, createIsOfUser, useDelArtifact } from "@body";

const emit = defineEmits(["edit"]);

const t = useT();
const authState = useAuthState();
const artifacts = useArtifacts();
const delArtifact = useDelArtifact();

const editAction = { name: "edit", label: t("edit") };
const deleteAction = { name: "delete", label: t("delete") };
const map = (artifact) => ({
  id: artifact.id,
  title: artifact.name,
  actions: [editAction, deleteAction],
});
const isRoot = and(isRootBase, createIsOfUser(authState));

const tree = computed(() => {
  const list = artifacts.list;
  return treeify(list, { map, isRoot });
});

const handleAction = ({ action, item }) => {
  switch (action) {
    case deleteAction.name:
      return delArtifact.run(item);
    case editAction.name:
      return emit("edit", item);
  }
};
</script>
<template>
  <list-base :items="tree" @action="handleAction" />
</template>
