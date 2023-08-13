<script setup>
import { ListBase, useGlobalStateful } from "../../../lib";
import ProgramsListActions from "./programs-list-actions.vue";

const programs = useGlobalStateful((brother) =>
  brother.listProgramsOfCurrentUser()
);
</script>
<template>
  <list-base :items="programs">
    <template #content="{ item }">
      <p :class="{ archived: !!item.archivedAt }">{{ item.name }}</p>
    </template>
    <template #aside="{ item }">
      <programs-list-actions :program="item" />
    </template>
  </list-base>
</template>

<style scoped>
.archived {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
