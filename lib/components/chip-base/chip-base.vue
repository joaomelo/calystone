<script setup>
defineProps({
  text: {
    default: null,
    type: String,
  },
});
</script>

<template>
  <div>
    {{ text }}
  </div>
</template>
