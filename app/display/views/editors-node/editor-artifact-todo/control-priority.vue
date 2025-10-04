<script setup lang="ts">
import { computed } from "vue";

import type { TodoArtifact } from "@/domain";

import {
  TextMessage,
  useI18n
} from "@/utils";

import ControlCriterionAdd from "./control-criterion-add.vue";
import ControlCriterionManage from "./control-criterion-manage.vue";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { t } = useI18n();
const criteria = computed(() => artifact.criteria);
</script>
<template>
  <div class="control-priority">
    <TextMessage
      v-if="artifact.criteriaEmpty"
      class="control-priority__tip-priority-empty"
      data-test="tip-priority-empty"
    >
      {{ t('editor-todo.priority.tip-empty') }}
    </TextMessage>
    <template
      v-for="criterion in criteria"
      :key="criterion.label"
    >
      <ControlCriterionManage
        :artifact="artifact"
        :label="criterion.label"
      />
    </template>
    <ControlCriterionAdd :artifact="artifact" />
  </div>
</template>
<style scoped>
.control-priority {
  display: grid;
  grid-template-columns: 1fr 1fr max-content;
  gap: var(--size-2);
}

.control-priority__tip-priority-empty {
  grid-column: 1 / -1;
}
</style>
