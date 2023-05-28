<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { routesPaths } from "../../router";
import { useTask } from "../../utils";
import { PageBase } from "../../components";
import { createMeasurement } from "../../services";

const router = useRouter();

const measurementCreate = useTask(
  async () => {
    const id = await createMeasurement();
    router.push(`${routesPaths.open}?id=${id}`);
  },
  { delay: 3 }
);

const handleNewWorkout = () => {
  console.log("todo");
};

const handleNewNutrition = () => {
  console.log("todo");
};

const busy = computed(() => measurementCreate.busy.value);
</script>
<template>
  <page-base :busy="busy">
    <button @click="measurementCreate.run">nova medição</button>
    <button @click="handleNewWorkout">novo plano de exercícios</button>
    <button @click="handleNewNutrition">novo plano alimentar</button>
  </page-base>
</template>
