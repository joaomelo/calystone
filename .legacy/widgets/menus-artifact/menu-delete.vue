<script setup>
import { delArtifact } from "@body";
import { MenuItem, useDependencies, useI18n } from "@lib";

const props = defineProps({
  artifact: {
    required: true,
    type: Object,
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
    {{ t("shared.delete") }}
  </menu-item>
</template>
