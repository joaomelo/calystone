<script setup lang="ts">
type Props = {
  clipped?: boolean;
};
withDefaults(defineProps<Props>(), {
  clipped: false,
});
</script>
<template>
  <h1 class="heading-text" :class="{ clipped }"><slot></slot></h1>
</template>
<style scoped>
.heading-text {
  font-size: var(--font-size-30);
  font-weight: var(--font-weight-30);
}

.clipped {
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
