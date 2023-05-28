<script setup>
// import { computed } from "vue";
// import { useRouter } from "vue-router";
// import { routesPaths } from "../../router";
// import { useTask } from "../../utils";
import { PageBase } from "../../components";
import { AddProject } from "../../features";

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
  <page-base :busy="busy">
    <add-project />
  </page-base>
</template>
