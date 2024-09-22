<script setup>
import { ToggleBase } from "@lib";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    required: true,
    type: String,
  },
  title: {
    default: null,
    type: String,
  },
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
  font-size: var(--font-size-20);
}
</style>
