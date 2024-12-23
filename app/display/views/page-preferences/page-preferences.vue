<script setup lang="ts">
import InputIgnore from "./input-ignore.vue";
import InputLocale from "./input-locale.vue";
</script>
<template>
  <div class="page-preferences">
    <InputLocale />
    <InputIgnore />
  </div>
</template>
<style scoped>
.page-preferences {
  padding: var(--size-7);
}
</style>
