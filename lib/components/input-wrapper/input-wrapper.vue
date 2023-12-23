<script setup>
import { computed } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  inline: {
    type: Boolean,
    default: false,
  },
});

const inputId = computed(() => `${props.id}-input`);
</script>
<template>
  <div :id="id" class="input-wrapper" :class="{ inline }">
    <label v-if="label" :for="inputId" :class="{ inline }">
      {{ label }}
    </label>
    <slot :id="inputId"></slot>
  </div>
</template>

<style scoped>
.input-wrapper {
  --input-border: var(--border-size-10) solid var(--border-color-standard);
  --input-outline-focus: var(--border-color-highlight) auto 1px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: var(--size-15);
}

.input-wrapper.inline {
  flex-direction: row;
}
</style>
