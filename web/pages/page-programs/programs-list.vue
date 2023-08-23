<script setup>
import { ListBase, useGlobalStateful } from "../../../lib";
import ProgramsListItemActions from "./programs-list-item-actions.vue";

const programsOfCurrentUser = useGlobalStateful((programs) =>
  programs.listProgramsOfCurrentUser()
);
</script>
<template>
  <list-base :items="programsOfCurrentUser">
    <template #content="{ item }">
      <p :class="{ archived: !!item.archivedAt }">{{ item.name }}</p>
    </template>
    <template #aside="{ item }">
      <programs-list-item-actions :program="item" />
    </template>
  </list-base>
</template>

<style scoped>
.archived {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
