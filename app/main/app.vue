<script setup lang="ts">
import { ToastSingleton } from "@/utils";
</script>
<template>
  <router-view />
  <ToastSingleton />
</template>
