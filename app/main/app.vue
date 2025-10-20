<script setup lang="ts">
import { ToastSingleton } from "@/display/affordances/dialogs";
</script>
<template>
  <router-view />
  <ToastSingleton />
</template>
