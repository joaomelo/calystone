<script setup>
import { computed } from "vue";
import { useI18n, useDependencies, ActionsMenu, ActionsItem, ActionsDivider } from "@lib";
import { addArtifact, delArtifact, activateArtifact, completeArtifact, cancelArtifact, isActive } from "@body";
import { goArtifactEdit, goOutline } from "@view/pages";

const props = defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});

const dependencies = useDependencies();
const { t } = useI18n();

const showActivate = computed(() => !isActive(props.artifact));

const handleAppend = () => addArtifact(dependencies, { parentId: props.artifact.id });
const handleDelete = () => delArtifact(dependencies, props.artifact.id);
const handleEdit = () => goArtifactEdit(dependencies, props.artifact.id);
const handleFocus = () => goOutline(dependencies, props.artifact.id);
const handleActivate = () => activateArtifact(dependencies, props.artifact.id);
const handleComplete = () => completeArtifact(dependencies, props.artifact.id);
const handleClose = () => cancelArtifact(dependencies, props.artifact.id);
</script>

<template>
  <!-- <actions-menu class="outline-item-actions" :actions="actions" @action="handleAction" /> -->
  <actions-menu class="outline-item-actions">
    <actions-item v-if="showActivate" @click="handleActivate">{{ t("page-outline.activate") }}</actions-item>
    <actions-item v-if="!showActivate" @click="handleComplete">{{ t("page-outline.complete") }}</actions-item>
    <actions-item v-if="!showActivate" @click="handleClose">{{ t("page-outline.cancel") }}</actions-item>
    <actions-divider />

    <actions-item @click="handleFocus">{{ t("page-outline.focus") }}</actions-item>
    <actions-divider />

    <actions-item @click="handleAppend">{{ t("page-outline.append") }}</actions-item>
    <actions-item @click="handleEdit">{{ t("page-outline.edit") }}</actions-item>
    <actions-item @click="handleDelete">{{ t("page-outline.delete") }}</actions-item>
  </actions-menu>
</template>
