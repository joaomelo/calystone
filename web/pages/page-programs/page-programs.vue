<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTask, useGlobals, useGlobalStateful } from "../../../lib";
import { PageDashboard } from "../page-base";

import ProgramAdd from "./program-add.vue";
import ProgramEdit from "./program-edit.vue";
import ProgramsList from "./programs-list.vue";

const pageTitle = useGlobalStateful((i18n) => i18n.t("programs"));
const items = useGlobalStateful((programs) => programs.list());

const { programs } = useGlobals();
const delay = { delay: 0.5 };
const add = useTask((payload) => programs.add(payload), delay);
const archive = useTask((id) => programs.archive(id), delay);
const del = useTask((id) => programs.del(id), delay);
const edit = useTask((payload) => programs.edit(payload), delay);

const item = ref(null);
const handleOpen = (id) => (item.value = programs.get(id));
const handleSave = async (payload) => {
  await edit.run(payload);
  item.value = null;
};
const handleCancel = () => {
  item.value = null;
};

const router = useRouter();
const handleSharing = (id) =>
  router.push({ name: "sharing", params: { programId: id } });
</script>
<template>
  <page-dashboard>
    <template #title>
      {{ pageTitle }}
    </template>
    <template #default>
      <program-add @add="add.run" :busy="add.busy" />
      <programs-list
        :items="items"
        @delete="del.run"
        @archive="archive.run"
        @edit="handleOpen"
        @sharing="handleSharing"
      />
      <program-edit :item="item" @save="handleSave" @cancel="handleCancel" />
    </template>
  </page-dashboard>
</template>
