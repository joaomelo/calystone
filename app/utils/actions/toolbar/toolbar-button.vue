<script setup lang="ts">
import { ButtonBase } from "@/utils/actions/button-base";

defineProps<{
  icon: string;
}>();
defineEmits<{
  click: []
}>();
</script>
<template>
  <ButtonBase
    :icon="`bx bx-sm ${icon}`"
    severity="secondary"
    text
    @click="$emit('click')"
  />
</template>