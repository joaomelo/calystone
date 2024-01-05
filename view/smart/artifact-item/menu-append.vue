<script setup>
import { MenuItem, useDependencies, useI18n } from "@lib";
import { addArtifact } from "@body";

const props = defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();
const handleAppend = () => addArtifact(dependencies, { parentId: props.artifact.id });
</script>

<template>
  <menu-item @click="handleAppend">
    {{ t("artifact-item.append") }}
  </menu-item>
</template>
