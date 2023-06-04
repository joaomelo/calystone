<script setup>
import { inject } from "vue";
import { ListBase } from "../../components";
import PojectEdit from "./project-edit.vue";

const { projects } = inject("store");
const items = projects.map(() => projects.list());

const actions = ["edit", "archive", "delete"];

const handleAction = ({ id, action }) => {
  console.log({ id, action });
};
</script>
<template>
  <list-base :items="items" :actions="actions" @action="handleAction" />
  <project-edit :id="id" :show="showEdit"></project-edit>
</template>
