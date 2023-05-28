<script setup>
// import { computed } from "vue";
// import { useRouter } from "vue-router";
// import { routesPaths } from "../../router";
// import { useTask } from "../../utils";
import { ProjectAdd, ProjectsList, PageBase } from "../../views";

// const router = useRouter();

// const measurementCreate = useTask(
//   async () => {
//     const id = await createMeasurement();
//     router.push(`${routesPaths.open}?id=${id}`);
//   },
//   { delay: 3 }
// );

// const handleNewWorkout = () => {
//   console.log("todo");
// };

// const handleNewNutrition = () => {
//   console.log("todo");
// };

// const busy = computed(() => measurementCreate.busy.value);
</script>
<template>
  <page-base>
    <project-add />
    <projects-list />
  </page-base>
</template>
