<script setup>
import { goSolve } from "@view";
import { onMounted } from "vue";
import { useDependencies } from "@lib";

const dependencies = useDependencies();
onMounted(() => goSolve(dependencies));
</script>
<template>
  <router-view />
</template>
