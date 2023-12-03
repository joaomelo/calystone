<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div>
    {{ text }}
  </div>
</template>
