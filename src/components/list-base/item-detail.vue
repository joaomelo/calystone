<script setup>
import { ref, watch } from "vue";
import { ButtonBase } from "../button-base";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["confirm", "cancel"]);

const dialog = ref(null);
watch(
  () => props.open,
  (value) => {
    if (value) {
      dialog.value.showModal();
    } else {
      dialog.value.close();
    }
  }
);
</script>
<template>
  <dialog ref="dialog">
    <div>content</div>
    <div>
      <button-base @click="$emit('confirm')">confirm</button-base
      ><button-base @click="$emit('cancel')">cancel</button-base>
    </div>
  </dialog>
</template>
<style scoped></style>
