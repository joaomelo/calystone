<script setup>
import { useArtifacts, useArtifactAdd, useArtifactDel } from "@body";
import { HeadingText } from "@view/components";
import { useT } from "@view/i18n";
import { LayoutDashboard } from "@view/layouts";
import ArtifactAdd from "./artifact-add.vue";
import ArtifactsTree from "./artifacts-tree.vue";

defineEmits(["edit", "close"]);

const t = useT();
const artifacts = useArtifacts();
const addTask = useArtifactAdd();
const delTask = useArtifactDel();
</script>
<template>
  <layout-dashboard @close="$emit('close')">
    <template #title>
      <heading-text>{{ t("artifacts") }}</heading-text>
    </template>
    <template #default>
      <artifact-add @add="addTask.run" class="page-artifacts-plan-add" />
      <artifacts-tree
        :artifacts="artifacts"
        @edit="$emit('edit', $event)"
        @del="delTask.run"
      />
    </template>
  </layout-dashboard>
</template>

<style scoped>
.page-artifacts-plan-add {
  margin-bottom: var(--size-10);
}
</style>
