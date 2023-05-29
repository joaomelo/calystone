<script setup>
import { inject } from "vue";
import { ListBase } from "../../components";

const { projects } = inject("store");
const projectsList = projects.map(() => projects.list());

const handleUpdate = ({ id, value: name }) => projects.update(id, { name });
</script>
<template>
  <list-base :items="projectsList" @update="handleUpdate" />
</template>
