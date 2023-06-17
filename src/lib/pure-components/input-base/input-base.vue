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
});
defineEmits(["update:modelValue", "submit"]);
</script>
<template>
  <input
    :type="type"
    :value="modelValue"
    class="input-base"
    :class="{ transparent }"
    @input="$emit('update:modelValue', $event.target.value)"
    @keyup.enter="$emit('submit')"
  />
</template>
<style scoped>
.input-base {
  width: 100%;
}

.input-base.transparent {
  border: none;
  background-color: transparent;
  outline: none;
}
</style>
