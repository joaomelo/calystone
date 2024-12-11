<script setup lang="ts">
import { useId } from "vue";

const { label } = defineProps<{
  label?: string;
}>();

const id = useId();

</script>
<template>
  <div class="input-wrapper">
    <label
      v-if="label"
      :for="id"
    >
      {{ label }}
    </label>
    <slot :id="id" />
  </div>
</template>
<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--size-2);

  label {
    font-weight: var(--font-weight-6);
  }
}
</style>