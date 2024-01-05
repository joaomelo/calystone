<script setup>
import { MenuItem, useDependencies, useI18n } from "@lib";
import { delArtifact } from "@body";

const props = defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();
const handleDelete = () => delArtifact(dependencies, props.artifact.id);
</script>

<template>
  <menu-item
    class="menu-delete"
    @click="handleDelete"
  >
    {{ t("artifact-item.delete") }}
  </menu-item>
</template>
