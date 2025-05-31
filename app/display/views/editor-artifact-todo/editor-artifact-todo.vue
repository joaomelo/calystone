<script setup lang="ts">
import type { TodoArtifact } from "@/domain";
import type { PanelsList } from "@/utils";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/views/editor-node-workspace";
import { EditorNotLoaded } from "@/display/views/editors-message";
import { AccordionPanels, formatDateTime, useI18n } from "@/utils";
import { computed, onMounted, ref } from "vue";

import ControlDatesClear from "./control-dates-clear.vue";
import ControlDatesRecurrence from "./control-dates-recurrence.vue";
import ControlDatesStartDue from "./control-dates-start-due.vue";
import ControlDetails from "./control-details.vue";
import ControlInfo from "./control-info.vue";
import ControlPriority from "./control-priority.vue";
import ControlProgress from "./control-progress.vue";
import ControlTags from "./control-tags.vue";

const { content: artifact } = defineProps<{
  content: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

onMounted(async () => {
  await services.exchangeArtifact.fetchInto(artifact);
});

const panelsState = ref<string[]>(["main"]);
const panels = computed<PanelsList>(() => {
  const priorityLegend = `${t("editor-todo.priority.priority")}: ${artifact.prioritizer.priority().toString()}`;

  const dueDate = artifact.dateDue();
  const dateSuffix = dueDate ? `: ${formatDateTime(dueDate)}` : "";
  const datesLegend = `${t("editor-todo.dates.dates")}${dateSuffix}`;

  const tagsTitle = t("common.tags");
  const tagsList = artifact.tagger.list().join(", ");
  const tagsLegend = `${tagsTitle}${tagsList ? `: ${tagsList}` : ""}`;

  return [
    ["main", artifact.basename()],
    ["dates", datesLegend],
    ["tags", tagsLegend],
    ["priority", priorityLegend],
    ["details", t("editor-todo.details")]
  ];
});
</script>
<template>
  <EditorNodeWorkspace
    v-if="artifact.isLoaded()"
    :node="artifact"
  >
    <AccordionPanels
      v-model="panelsState"
      :panels="panels"
      multiple
    >
      <template #main>
        <div class="editor-artifact-todo__main">
          <ControlInfo :artifact="artifact" />
          <ControlProgress :artifact="artifact" />
        </div>
      </template>
      <template #dates>
        <div class="editor-artifact-todo__control-dates">
          <ControlDatesStartDue :artifact="artifact" />
          <ControlDatesRecurrence :artifact="artifact" />
          <ControlDatesClear :artifact="artifact" />
        </div>
      </template>
      <template #tags>
        <ControlTags :artifact="artifact" />
      </template>
      <template #priority>
        <ControlPriority :artifact="artifact" />
      </template>
      <template #details>
        <ControlDetails :artifact="artifact" />
      </template>
    </AccordionPanels>
  </EditorNodeWorkspace>
  <EditorNotLoaded v-else />
</template>
<style scoped>
.editor-artifact-todo__main {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
}

.editor-artifact-todo__control-dates {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
