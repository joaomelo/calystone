<script setup>
import { inject } from "vue";
import { PageBase, useTask } from "../../lib";
import ProjectAdd from "./project-add.vue";
import ProjectsList from "./projects-list.vue";

const { i18n, projects } = inject("store");

const pageTitle = i18n.map(() => i18n.t("projects"));
const items = projects.map(() => projects.list());

const delay = { delay: 0.5 };
const add = useTask((payload) => projects.add(payload), delay);
const edit = useTask((payload) => projects.set(payload), delay);
const archive = useTask((id) => projects.archive(id), delay);
const del = useTask((id) => projects.delete(id), delay);
</script>
<template>
  <page-base :title="pageTitle">
    <project-add @add="add.run" :busy="add.busy" />
    <projects-list
      :items="items"
      @edit="edit.run"
      @delete="del.run"
      @archive="archive.run"
    />
  </page-base>
</template>
