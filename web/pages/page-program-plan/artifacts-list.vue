<script setup>
import { useGlobalStateful, ListBase } from "../../../lib";
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
  </list-base>
</template>
<style scoped>
.pending {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
