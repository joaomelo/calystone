<script setup lang="ts">
import RowIgnore from "./row-ignore.vue";
import RowLocale from "./row-locale.vue";
</script>
<template>
  <div class="page-preferences">
    <RowLocale />
    <RowIgnore />
  </div>
</template>
<style scoped>
.page-preferences {
  padding: var(--size-7);
  display: grid;
  gap: var(--size-5);
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    & {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
