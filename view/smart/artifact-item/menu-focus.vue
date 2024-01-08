<script setup>
import { MenuItem, useDependencies, useI18n } from "@lib";
import { goOutline } from "@view";

const props = defineProps({
  artifact: {
    required: true,
    type: Object,
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
    {{ t("shared-operations.focus") }}
  </menu-item>
</template>
