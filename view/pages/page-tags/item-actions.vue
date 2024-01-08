<script setup>
import { delTag } from "@body";
import { ActionsMenu, MenuItem, useDependencies, useI18n } from "@lib";

const props = defineProps({
  tag: {
    required: true,
    type: Object,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();

const handleDelete = () => delTag(dependencies, props.tag.id);
</script>

<template>
  <actions-menu class="item-actions">
    <menu-item
      class="item-actions-delete"
      @click="handleDelete"
    >
      {{ t("shared-operations.delete") }}
    </menu-item>
  </actions-menu>
</template>
