<script setup>
import { ref, watch } from "vue";

import { ButtonsPanel } from "../buttons-panel";

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
    <buttons-panel>
      <slot name="buttons" />
    </buttons-panel>
  </dialog>
</template>

<style scoped>
.model-base {
  display: flex;
  flex-direction: column;
  gap: var(--size-15);
}
</style>
