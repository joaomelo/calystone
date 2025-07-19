<script setup lang="ts">
defineProps<{
  dataTest: string;
  forId: string;
  label: string;
}>();
</script>
<template>
  <label
    :for="forId"
    :data-test="dataTest"
    class="input-label"
  >
    {{ label }}
  </label>
</template>
<style scoped>
.input-label {
  font-weight: var(--font-weight-6);
}
</style>