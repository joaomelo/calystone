<script setup lang="ts">
import { ToastSingleton } from "@/display";
</script>
<template>
  <router-view />
  <ToastSingleton />
</template>
