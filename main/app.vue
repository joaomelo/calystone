<script setup>
import { onMounted } from "vue";
import { useDependencies } from "@lib";
import { goSolve } from "@view";

const dependencies = useDependencies();
onMounted(() => goSolve(dependencies));
</script>
<template>
  <router-view />
</template>
