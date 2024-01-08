<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: { default: false, type: Boolean },
});

const dialog = ref();

const close = () => {
  if (dialog.value) dialog.value.close();
};

watch(
  () => props.show,
  (show) => {
    if (!dialog.value) return;
    if (show) {
      dialog.value.showModal();
    }
    else {
      dialog.value.close();
    }
  },
);
</script>
<template>
  <dialog ref="dialog">
    <div>
      <slot />
    </div>
    <div class="model-base-buttons">
      <slot
        name="buttons"
        :close="close"
      />
    </div>
  </dialog>
</template>

<style scoped>
.model-base-buttons {
  margin-top: var(--size-15);
  display: flex;
  justify-content: end;
  gap: var(--size-15);
}
</style>
