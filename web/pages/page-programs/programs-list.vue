<script setup>
import { useRouter } from "vue-router";
import {
  ButtonBase,
  ListBase,
  useGlobals,
  useGlobalStateful,
  useTask,
} from "../../../lib";

const editText = useGlobalStateful((i18n) => i18n.t("edit"));
const archiveText = useGlobalStateful((i18n) => i18n.t("archive"));
const sharingText = useGlobalStateful((i18n) => i18n.t("sharing"));

const programs = useGlobalStateful((strategist) => strategist.list());

const { strategist } = useGlobals();
const archive = useTask((id) => strategist.archive(id));
const handleArchive = (id) => archive.run(id);

const router = useRouter();
const handleEdit = (id) =>
  router.push({ name: "programEdit", params: { programId: id } });
const handleSharing = (id) =>
  router.push({ name: "programSharing", params: { programId: id } });
</script>
<template>
  <list-base :items="programs">
    <template #content="{ item }">
      <p :class="{ archived: !!item.archivedAt }">{{ item.name }}</p>
    </template>
    <template #aside="{ item }">
      <button-base @click="handleEdit(item.id)" v-if="!item.archivedAt">
        {{ editText }}
      </button-base>
      <button-base @click="handleArchive(item.id)" v-if="!item.archivedAt">
        {{ archiveText }}
      </button-base>
      <button-base @click="handleSharing(item.id)" v-if="!item.archivedAt">
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
