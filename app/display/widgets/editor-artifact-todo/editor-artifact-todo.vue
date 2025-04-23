<script setup lang="ts">
import type { TodoArtifact } from "@/domain";
import type { Panels } from "@/utils";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { EditorNotLoaded } from "@/display/widgets/editors-message";
import { TabsPanels, useI18n } from "@/utils";
import { computed, onMounted } from "vue";

import TabDates from "./tab-dates.vue";
import TabMain from "./tab-main.vue";
import TabMore from "./tab-more.vue";

const { content: artifact } = defineProps<{
  content: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

onMounted(async () => {
  await services.exchangeArtifact.fetchInto(artifact);
});

const panels = computed<Panels>(() => [
  ["main", artifact.basename()],
  ["dates", t("todo-panels.dates")],
  ["more", t("todo-panels.more")]
]);
</script>
<template>
  <EditorNodeWorkspace
    v-if="artifact.isLoaded()"
    :node="artifact"
  >
    <TabsPanels :panels="panels">
      <template #main>
        <TabMain :artifact="artifact" />
      </template>
      <template #dates>
        <TabDates :artifact="artifact" />
      </template>
      <template #more>
        <TabMore :artifact="artifact" />
      </template>
    </TabsPanels>
  </EditorNodeWorkspace>
  <EditorNotLoaded v-else />
</template>
