<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const dialog = ref(null);

const close = () => dialog.value.close();
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
    <div class="model-base-buttons">
      <slot name="buttons" :close="close" />
    </div>
  </dialog>
</template>

<style scoped>
.model-base-buttons {
  margin-top: var(--size-20);
  display: flex;
  justify-content: end;
  gap: var(--size-10);
}
</style>
