<script setup lang="ts">
import type { Option } from "../shared";

type Props = {
  modelValue: string;
  type?: string;
  label?: string;
  options?: Option[];
  rows?: string;
  inline?: boolean;
};
withDefaults(defineProps<Props>(), {
  type: "text",
  rows: "5",
  boolean: false,
  label: undefined,
  options: () => [],
  inline: false,
});

type Emits = {
  "update:modelValue": [value: string | null];
  submit: [];
};
const emit = defineEmits<Emits>();

const handleUpdate = (event: Event) => {
  if (!event || !event.target) emit("update:modelValue", null);
  const { value = "" } = event.target as HTMLInputElement;
  emit("update:modelValue", value);
};
</script>
<template>
  <div class="input-base" :class="{ inline }">
    <label v-if="label" class="input-base-label">{{ label }}</label>
    <template v-if="type === 'text'">
      <input
        :type="type"
        :value="modelValue"
        class="input-base-input text"
        @input="handleUpdate"
        @keyup.enter="$emit('submit')"
      />
    </template>
    <template v-if="type === 'textarea'">
      <textarea
        :value="modelValue"
        class="input-base-input text-area"
        :rows="rows"
        @input="handleUpdate"
      ></textarea>
    </template>
    <template v-if="type === 'select'">
      <select
        :value="modelValue"
        class="input-base-input select"
        @input="handleUpdate"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.inactive"
        >
          {{ option.text }}
        </option>
      </select>
    </template>
  </div>
</template>

<style scoped>
.input-base {
  width: 100%;
  font-family: inherit;
}

.input-base-label {
  display: block;
  margin-bottom: var(--size-00);
}

.input-base-input {
  width: 100%;
  display: block;
  margin: 0;
}

.inline .input-base-input {
  display: inline;
  width: max-content;
}

.input-base-input.text-area {
  resize: none;
}
</style>
