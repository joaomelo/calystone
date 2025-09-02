<script setup lang="ts">
import { ButtonBase } from "@/utils/actions/button-base";

defineEmits<{ click: [] }>();
</script>
<template>
  <ButtonBase
    severity="secondary"
    text
    @click="$emit('click')"
  >
    <template #icon>
      <slot name="icon" />
    </template>
  </ButtonBase>
</template>