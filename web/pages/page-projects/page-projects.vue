<script setup>
import { ref, inject } from "vue";
import { useTask } from "../../../helpers";
import { PageInternal } from "../page-base";

import ProjectAdd from "./project-add.vue";
import ProjectEdit from "./project-edit.vue";
import ProjectsList from "./projects-list.vue";

const { i18n, projects } = inject("globals");

const pageTitle = i18n.map(() => i18n.t("projects"));
const items = projects.map(() => projects.list());

const delay = { delay: 0.5 };
const add = useTask((payload) => projects.add(payload), delay);
const archive = useTask((id) => projects.archive(id), delay);
const del = useTask((id) => projects.delete(id), delay);
const edit = useTask((payload) => projects.set(payload), delay);

const item = ref(null);
const handleOpen = (id) => (item.value = projects.get(id));
const handleSave = async (payload) => {
  await edit.run(payload);
  item.value = null;
};
const handleCancel = () => {
  item.value = null;
};
</script>
<template>
  <page-internal :title="pageTitle">
    <project-add @add="add.run" :busy="add.busy" />
    <projects-list
      :items="items"
      @delete="del.run"
      @archive="archive.run"
      @edit="handleOpen"
    />
    <project-edit :item="item" @save="handleSave" @cancel="handleCancel" />
  </page-internal>
</template>
