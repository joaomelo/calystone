<script setup>
import { useDependencies } from "@lib";
import { goSolve } from "@view";
import { onMounted } from "vue";

const dependencies = useDependencies();
onMounted(() => goSolve(dependencies));
</script>
<template>
  <router-view />
</template>
