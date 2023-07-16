<script setup>
import { useRouter } from "vue-router";
import { ListBase, ButtonBase, useGlobalStateful, useTask } from "../../../lib";

const editText = useGlobalStateful((i18n) => i18n.t("edit"));
const archiveText = useGlobalStateful((i18n) => i18n.t("archive"));
const sharingText = useGlobalStateful((i18n) => i18n.t("sharing"));

const programs = useGlobalStateful((strategist) => strategist.list());
const archive = useTask((id) => programs.archive(id));
const handleArchive = (item) => archive.run(item.id);

const router = useRouter();
const handleEdit = (item) =>
  router.push({ name: "programEdit", params: { programId: item.id } });
const handleSharing = (item) =>
  router.push({ name: "programSharing", params: { programId: item.id } });
</script>
<template>
  <list-base :items="programs">
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
      <button-base @click="handleSharing(item)">
        {{ sharingText }}
      </button-base>
    </template>
  </list-base>
</template>

<style scoped>
.archived {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
