<script setup>
import { inject } from "vue";
import { ListBase, ButtonBase, useStateful } from "../../../lib";
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["edit", "archive", "delete"]);

const { i18n } = inject("globals");
const editText = useStateful(i18n, (i) => i.t("edit"));
const archiveText = useStateful(i18n, (i) => i.t("archive"));
const deleteText = useStateful(i18n, (i) => i.t("delete"));
const sharingText = useStateful(i18n, (i) => i.t("sharing"));

const handleEdit = (item) => emit("edit", item.id);
const handleArchive = (item) => emit("archive", item.id);
const handleDelete = (item) => emit("delete", item.id);
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
      <button-base @click="handleDelete(item)">{{ sharingText }}</button-base>
    </template>
  </list-base>
</template>

<style scoped>
.archived {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
