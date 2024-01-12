<script setup>
import { ref, watch } from "vue";

const model = defineModel({
  required: true,
  type: Boolean,
});

const dialog = ref();

watch(
  () => model.value,
  (value) => {
    if (value) {
      dialog.value.showModal();
    }
    else {
      dialog.value.close();
    }
  },
);
</script>
<template>
  <dialog
    ref="dialog"
    class="modal-base"
  >
    <div>
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
.modal-base {
  border: var(--size-00) solid var(--color-surface-50);
  min-width: var(--size-60);
  padding-block: var(--size-20);
  padding-inline: var(--size-20);
}
</style>
