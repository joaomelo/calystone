<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <span class="material-symbols-outlined">{{ name }}</span>
</template>
<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
}
</style>
