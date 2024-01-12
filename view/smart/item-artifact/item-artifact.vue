<script setup>
import { getArtifact } from "@body";
import { ActionsMenu, useDependencies } from "@lib";
import { computed } from "vue";

import ArtifactDates from "./artifact-dates.vue";
import ArtifactName from "./artifact-name.vue";
import ArtifactStatus from "./artifact-status.vue";
import ArtifactTags from "./artifact-tags.vue";

const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

const dependencies = useDependencies();
const artifact = computed(() => getArtifact(dependencies, props.id));
</script>

<template>
  <div class="artifact-item">
    <artifact-name :artifact="artifact" />
    <artifact-tags :artifact="artifact" />
    <artifact-dates :artifact="artifact" />
    <artifact-status :artifact="artifact" />
    <actions-menu>
      <slot
        name="actions"
        v-bind="artifact"
      />
    </actions-menu>
  </div>
</template>

<style scoped>
.artifact-item {
  display: flex;
  align-items: baseline;
  gap: var(--size-15);
}
</style>
