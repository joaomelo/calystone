<script setup>
import { useDependencies } from "@lib";
import { onMounted } from "vue";

const { display } = useDependencies();
onMounted(() => display.mounted());
</script>
<template>
  <router-view />
</template>
