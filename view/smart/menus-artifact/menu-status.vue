<script setup>
import { activateArtifact, cancelArtifact, completeArtifact, isActive } from "@body";
import { MenuItem, useDependencies, useI18n } from "@lib";
import { computed } from "vue";

const props = defineProps({
  artifact: {
    required: true,
    type: Object,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();

const showActivate = computed(() => !isActive(props.artifact));
const handleActivate = () => activateArtifact(dependencies, props.artifact.id);
const handleComplete = () => completeArtifact(dependencies, props.artifact.id);
const handleCancel = () => cancelArtifact(dependencies, props.artifact.id);
</script>

<template>
  <menu-item
    v-if="showActivate"
    class="menu-activate"
    @click="handleActivate"
  >
    {{ t("shared.activate") }}
  </menu-item>
  <menu-item
    v-if="!showActivate"
    class="menu-complete"
    @click="handleComplete"
  >
    {{ t("shared.complete") }}
  </menu-item>
  <menu-item
    v-if="!showActivate"
    class="menu-cancel"
    @click="handleCancel"
  >
    {{ t("shared.cancel") }}
  </menu-item>
</template>
