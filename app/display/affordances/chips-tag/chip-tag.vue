<script setup lang="ts">
import ChipPrimeVue from "primevue/chip";

const { removable = false } = defineProps<{
  label: string,
  removable?: boolean,
}>();

</script>
<template>
  <ChipPrimeVue
    :label="label"
    :removable="removable"
  />
</template>
