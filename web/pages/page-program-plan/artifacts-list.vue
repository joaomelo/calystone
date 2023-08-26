<script setup>
import { useGlobalStateful, ListBase } from "../../../lib";
import ArtifactsListItemActions from "./artifacts-list-item-actions.vue";

const props = defineProps({
  programId: {
    type: String,
    required: true,
  },
});

const artifactsOfProgram = useGlobalStateful((artifacts) =>
  artifacts.listArtifactsOfProgram(props.programId)
);
</script>
<template>
  <list-base :items="artifactsOfProgram">
    <template #content="{ item }">
      <p :class="{ archived: !!item.archivedAt }">{{ item.name }}</p>
    </template>
    <template #aside="{ item }">
      <artifacts-list-item-actions :artifact="item" />
    </template>
  </list-base>
</template>
<style scoped>
.archived {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
