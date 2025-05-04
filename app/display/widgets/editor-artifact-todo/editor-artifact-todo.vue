<script setup lang="ts">
import type { TodoArtifact } from "@/domain";
import type { PanelsList } from "@/utils";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { EditorNotLoaded } from "@/display/widgets/editors-message";
import { AccordionPanels, useI18n } from "@/utils";
import { computed, onMounted } from "vue";

import ControlDates from "./control-dates.vue";
import ControlDetails from "./control-details.vue";
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

const panels = computed<PanelsList>(() => {
  const priorityLegend = `${t("editor-todo.priority.priority")}: ${artifact.prioritizer.priority().toString()}`;

  return [
    ["main", artifact.basename()],
    ["dates", t("editor-todo.dates.dates")],
    ["tags", t("common.tags")],
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
      :panels="panels"
      multiple
    >
      <template #main>
        <ControlProgress :artifact="artifact" />
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
  </EditorNodeWorkspace>
  <EditorNotLoaded v-else />
</template>
