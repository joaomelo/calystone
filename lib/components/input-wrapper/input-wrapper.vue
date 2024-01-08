<script setup>
import { createId } from "@lib";
import { computed } from "vue";

const props = defineProps({
  id: {
    default: null,
    type: String,
  },
  inline: {
    default: false,
    type: Boolean,
  },
  label: {
    default: null,
    type: String,
  },
});

const wrapperId = computed(() => props.id || createId());
const inputId = computed(() => `${wrapperId.value}-input`);
</script>
<template>
  <fieldset
    :id="wrapperId"
    class="input-wrapper"
    :class="{ inline }"
  >
    <label
      v-if="label"
      :for="inputId"
      :class="{ inline }"
    >
      {{ label }}
    </label>
    <slot :id="inputId" />
  </fieldset>
</template>

<style scoped>
.input-wrapper {
  --input-border: var(--size-00) solid var(--color-surface-60);
  --input-outline-focus: var(--color-surface-70) auto var(--size-00);
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
