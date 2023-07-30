<script setup>
import { ListBase, useGlobalStateful } from "../../../lib";
import ProgramActions from "./program-actions.vue";

const programs = useGlobalStateful((strategist) => strategist.listMine());
</script>
<template>
  <list-base :items="programs">
    <template #content="{ item }">
      <p :class="{ archived: !!item.archivedAt }">{{ item.name }}</p>
    </template>
    <template #aside="{ item }">
      <program-actions :program="item" />
    </template>
  </list-base>
</template>

<style scoped>
.archived {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
