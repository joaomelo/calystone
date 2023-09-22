<script setup>
import { HeadingText } from "@web/components";
import { useT } from "@web/i18n";
import { LayoutDashboard } from "@web/layouts";
import ArtifactAdd from "./artifact-add.vue";
// import ArtifactsTree from "./artifacts-tree.vue";

defineEmits(["edit", "close"]);

const t = useT();

const handleAdd = () => {
  console.log("add");
  // const { addArtifact, artifact } = useAddArtifact();
};
</script>
<template>
  <layout-dashboard @close="$emit('close')">
    <template #title>
      <heading-text>{{ t("artifacts") }}</heading-text>
    </template>
    <template #default>
      <artifact-add @add="handleAdd" />
      <!-- <artifacts-tree @edit="$emit('edit', $event)" /> -->
    </template>
  </layout-dashboard>
</template>
