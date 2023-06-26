<script setup>
import { ListBase, ButtonBase } from "../../components";
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["edit", "archive", "delete"]);

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
        edit
      </button-base>
      <button-base @click="handleArchive(item)" v-if="!item.archivedAt">
        archive
      </button-base>
      <button-base @click="handleDelete(item)">delete</button-base>
    </template>
  </list-base>
</template>

<style scoped>
.archived {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
