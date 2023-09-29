<script setup>
defineProps({
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    default: null,
  },
  rows: {
    type: String,
    default: "5",
  },
  inline: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["update:modelValue", "submit"]);
</script>
<template>
  <div class="input-base" :class="{ inline }">
    <label v-if="label" class="input-base-label">{{ label }}</label>
    <template v-if="type === 'text'">
      <input
        :type="type"
        :value="modelValue"
        class="input-base-input text"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('submit')"
      />
    </template>
    <template v-if="type === 'textarea'">
      <textarea
        :value="modelValue"
        class="input-base-input text-area"
        @input="$emit('update:modelValue', $event.target.value)"
        :rows="rows"
      ></textarea>
    </template>
    <template v-if="type === 'select'">
      <select
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="input-base-input select"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
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
