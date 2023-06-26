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
  transparent: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    default: null,
  },
});
defineEmits(["update:modelValue", "submit"]);
</script>
<template>
  <div>
    <label class="input-base-label" v-if="label">{{ label }}</label>
    <template v-if="type === 'text'">
      <input
        :type="type"
        :value="modelValue"
        class="input-base"
        :class="{ transparent }"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('submit')"
      />
    </template>
    <template v-if="type === 'select'">
      <select
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
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

.input-base-label {
  margin-bottom: var(--size-00);
  display: block;
}

.input-base.transparent {
  border: none;
  background-color: transparent;
  outline: none;
}
</style>
