<script setup>
import { delTag } from "@body";
import { ActionsMenu, MenuItem, useDependencies, useI18n } from "@lib";

import { goTagArtifacts } from "../page-tag-artifacts";

const props = defineProps({
  tag: {
    required: true,
    type: Object,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();

const handleArtifacts = () => goTagArtifacts(dependencies, props.tag.id);
const handleDelete = () => delTag(dependencies, props.tag.id);
</script>

<template>
  <actions-menu data-test="actions">
    <menu-item
      data-test="artifacts"
      @click="handleArtifacts"
    >
      {{ t("artifact.artifacts") }}
    </menu-item>
    <menu-item
      data-test="delete"
      @click="handleDelete"
    >
      {{ t("shared-actions.delete") }}
    </menu-item>
  </actions-menu>
</template>
