<script setup>
import { MenuItem, useDependencies, useI18n } from "@lib";
import { goArtifactEdit } from "@view";

const props = defineProps({
  artifact: {
    required: true,
    type: Object,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();
const handleEdit = () => goArtifactEdit(dependencies, props.artifact.id);
</script>

<template>
  <menu-item
    class="menu-edit"
    @click="handleEdit"
  >
    {{ t("shared.edit") }}
  </menu-item>
</template>
