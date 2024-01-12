<script setup>
defineProps({
  text: {
    default: null,
    type: String,
  },
});
</script>

<template>
  <div class="chip-base">
    {{ text }}
  </div>
</template>

<style scoped>

.chip-base {
  border: var(--size-00) solid var(--color-surface-40);
  padding-inline: var(--size-05);
  padding-block: var(--size-05);

  font-size: var(--font-size-10);

  background-color: var(--color-surface-20);
}
</style>
