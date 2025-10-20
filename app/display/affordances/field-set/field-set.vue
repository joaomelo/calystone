<script setup lang="ts">
import FieldsetPrimeVue from "primevue/fieldset";
</script>
<template>
  <FieldsetPrimeVue class="field-set">
    <template #default>
      <slot />
    </template>
  </FieldsetPrimeVue>
</template>
<style scoped>
.field-set {
  padding-inline: var(--size-2);
  padding-block-end: var(--size-2);
}
</style>
