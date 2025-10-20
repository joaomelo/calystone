<script setup lang="ts">
defineProps<{
  dataTest: string;
  forId: string;
  label: string;
}>();
</script>
<template>
  <label
    class="input-label"
    :data-test="dataTest"
    :for="forId"
  >
    {{ label }}
  </label>
</template>
<style scoped>
.input-label {
  font-weight: var(--font-weight-6);
}
</style>