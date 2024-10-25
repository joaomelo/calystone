<script setup lang="ts">
import { useStore } from "@/domain";
import { PageOutline } from "@/display";

const store = useStore();
</script>
<template>
  <PageOutline :artifacts="store.artifactsTree" />
</template>