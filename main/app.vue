<script setup>
import { useDependencies } from "@lib";
import { onMounted } from "vue";

const { helmsman } = useDependencies();
onMounted(() => helmsman.solve());
</script>
<template>
  <router-view />
</template>
