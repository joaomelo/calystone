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
  <div class="w-full">
    <label class="block mb-1" v-if="label">{{ label }}</label>
    <template v-if="type === 'text'">
      <input
        :type="type"
        :value="modelValue"
        class="w-full"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('submit')"
      />
    </template>
    <template v-if="type === 'textarea'">
      <textarea
        :value="modelValue"
        class="w-full resize-none"
        @input="$emit('update:modelValue', $event.target.value)"
        :rows="rows"
      ></textarea>
    </template>
    <template v-if="type === 'select'">
      <select
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="border-2 border-slate-200"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </template>
  </div>
</template>
