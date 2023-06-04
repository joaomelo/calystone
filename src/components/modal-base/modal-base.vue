<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const dialog = ref(null);

watch(
  () => props.show,
  (show) => {
    if (show) {
      dialog.value.showModal();
    } else {
      dialog.value.close();
    }
  }
);
</script>
<template>
  <dialog ref="dialog">
    <div>
      <slot />
    </div>
    <div>
      <slot name="buttons" />
    </div>
  </dialog>
</template>
