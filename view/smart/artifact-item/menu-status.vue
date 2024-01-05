<script setup>
import { computed } from "vue";
import { MenuItem, useDependencies, useI18n } from "@lib";
import { activateArtifact, cancelArtifact, completeArtifact, isActive } from "@body";

const props = defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();

const showActivate = computed(() => !isActive(props.artifact));
const handleActivate = () => activateArtifact(dependencies, props.artifact.id);
const handleComplete = () => completeArtifact(dependencies, props.artifact.id);
const handleClose = () => cancelArtifact(dependencies, props.artifact.id);
</script>

<template>
  <menu-item
    v-if="showActivate"
    @click="handleActivate"
  >
    {{ t("artifact-item.activate") }}
  </menu-item>
  <menu-item
    v-if="!showActivate"
    @click="handleComplete"
  >
    {{ t("artifact-item.complete") }}
  </menu-item>
  <menu-item
    v-if="!showActivate"
    @click="handleClose"
  >
    {{ t("artifact-item.cancel") }}
  </menu-item>
</template>
