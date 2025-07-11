<script setup lang="ts">
import { type TodoArtifact } from "@/domain";
import { computed } from "vue";

import ControlCriterionAdd from "./control-criterion-add.vue";
import ControlCriterionManage from "./control-criterion-manage.vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const criteria = computed(() => artifact.criteria());
</script>
<template>
  <div class="control-priority">
    <template
      v-for="criterion in criteria"
      :key="criterion.label"
    >
      <ControlCriterionManage
        :label="criterion.label"
        :artifact="artifact"
      />
    </template>
    <ControlCriterionAdd :artifact="artifact" />
  </div>
</template>
<style scoped>
.control-priority {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
