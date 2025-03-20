<script setup lang="ts">
import Toolbar from "primevue/toolbar";
</script>
<template>
  <Toolbar>
    <template #start>
      <slot name="start" />
    </template>
    <template #end>
      <slot name="end" />
    </template>
  </Toolbar>
</template>