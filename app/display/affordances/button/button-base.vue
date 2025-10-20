<script setup lang="ts">
import Button from "primevue/button";
</script>
<template>
  <Button>
    <template #icon>
      <slot name="icon" />
    </template>
  </Button>
</template>
