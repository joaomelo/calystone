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
});
defineEmits(["update:modelValue", "submit"]);
</script>
<template>
  <input
    :type="type"
    :value="modelValue"
    class="input-base"
    @input="$emit('update:modelValue', $event.target.value)"
    @keyup.enter="$emit('submit')"
  />
</template>
<style scoped>
.input-base {
  width: 100%;
}
</style>
