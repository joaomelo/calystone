<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div>
    {{ text }}
  </div>
</template>
<style scoped>
.frame-side-text {
  font-weight: var(--font-weight-30);
}
</style>
