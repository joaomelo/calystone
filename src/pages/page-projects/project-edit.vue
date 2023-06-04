<script setup>
import { ref } from "vue";
import { ModalBase, ButtonBase } from "../../components";
defineProps({
  id: {
    type: String,
    default: null,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const close = ref(false);
const handleCancel = () => (close.value = true);
</script>
<template>
  <modal-base :show="show && !close">
    <template #default>
      {{ id }}
    </template>
    <template #buttons>
      <button-base @click="handleCancel">cancelar</button-base>
    </template>
  </modal-base>
</template>
