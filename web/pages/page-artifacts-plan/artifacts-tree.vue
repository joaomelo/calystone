<script setup>
import { computed } from "vue";
import { ListBase, useService, and } from "@lib";
// import ProgramsListItemActions from "./programs-list-item-actions.vue";
import { useArtifacts, createIsOfUser, createIsChildOf, isRoot } from "@body";

const artifacts = useArtifacts();

const auth = useService("auth");
const isFirstLevel = and(isRoot, createIsOfUser(auth.user));

const items = computed(() => {
  const list = Array.from(artifacts.values());

  const asItem = ({ id, name }) => {
    const isChildOf = createIsChildOf(id);
    return { id, title: name, children: list.filter(isChildOf).map(asItem) };
  };

  return list.filter(isFirstLevel).map(asItem);
});
</script>
<template>
  <list-base :items="items">
    <!-- <template #content="{ item }">
      <p :class="{ archived: !!item.archivedAt }">{{ item.name }}</p>
    </template> -->
    <!-- <template #aside="{ item }">
      <programs-list-item-actions :program="item" />
    </template> -->
  </list-base>
</template>

<style scoped>
.archived {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
