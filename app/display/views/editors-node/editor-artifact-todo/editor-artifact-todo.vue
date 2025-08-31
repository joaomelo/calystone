<script setup lang="ts">
import type { TodoArtifact } from "@/domain";
import type { PanelsList } from "@/utils";

import { Store } from "@/display/store";
import { EditorWorkspace } from "@/display/views/editors-node/editor-workspace";
import { EditorNotLoaded } from "@/display/views/editors-node/editor-empty";
import {
  ToolbarButtonCreateArtifact,
  ToolbarButtonExportNode,
  ToolbarButtonRemoveNode,
  ToolbarButtonRenameNode,
  ToolbarButtonShareNode
} from "@/display/views/toolbar-buttons";
import {
  AccordionPanels,
  formatDateRange,
  useI18n
} from "@/utils";
import {
  computed,
  onMounted,
  ref
} from "vue";

import ControlDates from "./control-dates.vue";
import ControlDetails from "./control-details.vue";
import ControlInfo from "./control-info.vue";
import ControlPriority from "./control-priority.vue";
import ControlProgress from "./control-progress.vue";
import ControlTags from "./control-tags.vue";

const { content: artifact } = defineProps<{ content: TodoArtifact; }>();
defineEmits<{ close: [] }>();

const { services } = Store.use();
const { t } = useI18n();

onMounted(async () => {
  await services.exchangeArtifact.fetchInto(artifact);
});

const panelsState = ref<string[]>(["main"]);
const panels = computed<PanelsList>(() => {
  const priority = artifact.priority().toFixed(2);
  const priorityLegend = `${t("common.priority")}: ${priority}`;

  const startDate = artifact.dateStart();
  const dueDate = artifact.dateDue();
  const hasDates = startDate && dueDate;
  const formattedDateRange = hasDates
    ? formatDateRange({
      due: dueDate,
      start: startDate,
    })
    : "";
  const recurringSignal = artifact.hasRecurrence() ? " ↻" : "";
  const datesLegend = `${t("editor-todo.dates.dates")}: ${formattedDateRange}${recurringSignal}`;

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
  <EditorWorkspace
    v-if="artifact.isLoaded()"
    :node="artifact"
    @close="$emit('close')"
  >
    <template #toolbar>
      <ToolbarButtonCreateArtifact
        :node="content"
      />
      <ToolbarButtonRenameNode
        :node="content"
      />
      <ToolbarButtonExportNode
        :node="content"
      />
      <ToolbarButtonShareNode
        :node="content"
      />
      <ToolbarButtonRemoveNode
        :node="content"
        @removed="$emit('close')"
      />
    </template>
    <template #default>
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
          <ControlDates :artifact="artifact" />
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
    </template>
  </EditorWorkspace>
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
