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
});
defineEmits(["update:modelValue", "submit"]);
</script>
<template>
  <div class="input-base">
    <label v-if="label">{{ label }}</label>
    <template v-if="type === 'text'">
      <input
        :type="type"
        :value="modelValue"
        class="input-base-text"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('submit')"
      />
    </template>
    <template v-if="type === 'textarea'">
      <textarea
        :value="modelValue"
        class="input-base-text-area"
        @input="$emit('update:modelValue', $event.target.value)"
        :rows="rows"
      ></textarea>
    </template>
    <template v-if="type === 'select'">
      <select
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="input-base-select"
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
}

.input-base-text {
  width: 100%;
}
</style>
