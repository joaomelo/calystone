<script setup>
import { ListBase, ButtonBase, useGlobalStateful } from "../../../lib";
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["edit", "archive", "delete", "sharing"]);

const editText = useGlobalStateful((i18n) => i18n.t("edit"));
const archiveText = useGlobalStateful((i18n) => i18n.t("archive"));
const deleteText = useGlobalStateful((i18n) => i18n.t("delete"));
const sharingText = useGlobalStateful((i18n) => i18n.t("sharing"));

const handleEdit = (item) => emit("edit", item.id);
const handleArchive = (item) => emit("archive", item.id);
const handleDelete = (item) => emit("delete", item.id);
const handleSharing = (item) => emit("sharing", item.id);
</script>
<template>
  <list-base :items="items">
    <template #content="{ item }">
      <p :class="{ archived: !!item.archivedAt }">{{ item.name }}</p>
    </template>
    <template #aside="{ item }">
      <button-base @click="handleEdit(item)" v-if="!item.archived">
        {{ editText }}
      </button-base>
      <button-base @click="handleArchive(item)" v-if="!item.archivedAt">
        {{ archiveText }}
      </button-base>
      <button-base @click="handleDelete(item)">{{ deleteText }}</button-base>
      <button-base @click="handleSharing(item)">{{ sharingText }}</button-base>
    </template>
  </list-base>
</template>

<style scoped>
.archived {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
