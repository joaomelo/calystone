<script setup>
import { computed } from "vue";
import { ToggleBase } from "@lib";

const props = defineProps({
  modelValue: { type: String, required: true },
  title: { type: String, default: null },
});
defineEmits(["update:modelValue"]);

const showToggle = computed(() => props.modelValue !== "fixed");
</script>
<template>
  <div class="frame-top">
    <template v-if="showToggle">
      <toggle-base
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </template>
    <div class="frame-top-title">
      {{ title }}
    </div>
  </div>
</template>
<style scoped>
.frame-top {
  display: flex;
  align-items: center;
  gap: var(--size-20);
}

.frame-top-title {
  font-weight: var(--font-weight-30);
  font-size: var(--font-size-30);
}
</style>
