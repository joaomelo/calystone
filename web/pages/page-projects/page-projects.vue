<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTask, useGlobals, useGlobalStateful } from "../../../lib";
import { PageDashboard } from "../page-base";

import ProjectAdd from "./project-add.vue";
import ProjectEdit from "./project-edit.vue";
import ProjectsList from "./projects-list.vue";

const pageTitle = useGlobalStateful((i18n) => i18n.t("projects"));
const items = useGlobalStateful((projects) => projects.list());

const { projects } = useGlobals();
const delay = { delay: 0.5 };
const add = useTask((payload) => projects.add(payload), delay);
const archive = useTask((id) => projects.archive(id), delay);
const del = useTask((id) => projects.del(id), delay);
const edit = useTask((payload) => projects.edit(payload), delay);

const item = ref(null);
const handleOpen = (id) => (item.value = projects.get(id));
const handleSave = async (payload) => {
  await edit.run(payload);
  item.value = null;
};
const handleCancel = () => {
  item.value = null;
};

const router = useRouter();
const handleSharing = (id) =>
  router.push({ name: "sharing", params: { projectId: id } });
</script>
<template>
  <page-dashboard :title="pageTitle">
    <project-add @add="add.run" :busy="add.busy" />
    <projects-list
      :items="items"
      @delete="del.run"
      @archive="archive.run"
      @edit="handleOpen"
      @sharing="handleSharing"
    />
    <project-edit :item="item" @save="handleSave" @cancel="handleCancel" />
  </page-dashboard>
</template>
