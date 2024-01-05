<script setup>
import { MenuItem, useDependencies, useI18n } from "@lib";
import { goOutline } from "@view";

const props = defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();
const handleFocus = () => goOutline(dependencies, props.artifact.id);
</script>

<template>
  <menu-item
    class="menu-focus"
    @click="handleFocus"
  >
    {{ t("artifact-item.focus") }}
  </menu-item>
</template>
