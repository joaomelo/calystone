<script setup>
import { getArtifact } from "@body";
import { ActionsMenu, PanelResponsive, useDependencies } from "@lib";
import { computed } from "vue";

import ItemArtifactDates from "./item-artifact-dates.vue";
import ItemArtifactName from "./item-artifact-name.vue";
import ItemArtifactStatus from "./item-artifact-status.vue";
import ItemArtifactTags from "./item-artifact-tags.vue";

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
    <panel-responsive class="artifact-item-content">
      <item-artifact-name
        :artifact="artifact"
        class="artifact-item-content-name"
      />
      <div class="artifact-item-content-details">
        <item-artifact-tags :artifact="artifact" />
        <item-artifact-dates :artifact="artifact" />
        <item-artifact-status :artifact="artifact" />
      </div>
    </panel-responsive>
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

.artifact-item-content {
  flex-grow: 1;
}

.artifact-item-content-name {
  flex-grow: 1;
}

.artifact-item-content-details {
  flex-shrink: 0;

  display: flex;
  align-items: baseline;
  justify-content: start;
  gap: var(--size-15);
}

</style>
