<script setup>
import { HeadingText } from "@web/components";
import { useT } from "@web/i18n";
import { LayoutDashboard } from "@web/layouts";
import ArtifactAdd from "./artifact-add.vue";
import ArtifactsTree from "./artifacts-tree.vue";
import { useAdd } from "./use-add";
import { useTree } from "./use-tree";

defineEmits(["edit", "close"]);

const t = useT();
const addTask = useAdd();
const tree = useTree();
</script>
<template>
  <layout-dashboard @close="$emit('close')">
    <template #title>
      <heading-text>{{ t("artifacts") }}</heading-text>
    </template>
    <template #default>
      <artifact-add @add="addTask.run" class="page-artifacts-plan-add" />
      <artifacts-tree @edit="$emit('edit', $event)" :tree="tree" />
    </template>
  </layout-dashboard>
</template>

<style scoped>
.page-artifacts-plan-add {
  margin-bottom: var(--size-10);
}
</style>
