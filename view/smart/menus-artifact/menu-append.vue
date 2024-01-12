<script setup>
import { addArtifact } from "@body";
import { MenuItem, useDependencies, useI18n } from "@lib";

const props = defineProps({
  artifact: {
    required: true,
    type: Object,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();
const handleAppend = () => addArtifact(dependencies, { name: null, parentId: props.artifact.id });
</script>

<template>
  <menu-item
    class="menu-append"
    @click="handleAppend"
  >
    {{ t("shared-actions.append") }}
  </menu-item>
</template>
