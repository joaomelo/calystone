<script setup>
import { HeadingText } from "@view/components";
import { useT } from "@view/i18n";
import { LayoutDashboard } from "@view/layouts";
import { useAdd } from "./use-add";
import { useDel } from "./use-del";
import { useTree } from "./use-tree";
import ArtifactAdd from "./artifact-add.vue";
import ArtifactsTree from "./artifacts-tree.vue";

defineEmits(["edit", "close"]);

const t = useT();
const tree = useTree();
const addTask = useAdd();
const delTask = useDel();
</script>
<template>
  <layout-dashboard @close="$emit('close')">
    <template #title>
      <heading-text>{{ t("artifacts") }}</heading-text>
    </template>
    <template #default>
      <artifact-add @add="addTask.run" class="page-artifacts-plan-add" />
      <artifacts-tree
        :tree="tree"
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
