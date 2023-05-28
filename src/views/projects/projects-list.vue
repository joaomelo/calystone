<script setup>
import { inject } from "vue";
const { projects } = inject("store");
const projectsList = projects.map(() => projects.list());
</script>
<template>
  <div>
    <div v-for="project in projectsList" :key="project.id">
      {{ project.name }}
    </div>
  </div>
</template>
