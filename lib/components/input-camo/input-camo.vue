<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleBlur = (e) => {
  const value = e.target.textContent;
  if (props.modelValue === value) return;
  emit("update:modelValue", value);
};
const handleEnter = e => e.target.blur();
</script>
<template>
  <div
    class="input-camo"
    contenteditable="plaintext-only"
    @blur="handleBlur"
    @keydown.enter.prevent="handleEnter"
  >
    {{ modelValue }}
  </div>
</template>

<style scoped>
.input-camo {
  outline: none;
}
</style>
