<script setup>
import { OverlayBase, ButtonsPanel, TextAlert } from "@lib";

defineProps({
  busy: { type: Boolean, default: false },
  error: { type: String, default: null },
});
const emit = defineEmits(["submit"]);

const handleSubmit = () => emit("submit");
</script>
<template>
  <overlay-base :show="busy">
    <form @submit.prevent="handleSubmit">
      <div class="form-base-content">
        <text-alert v-if="error" icon="error" :text="error" />
        <slot></slot>
      </div>
      <buttons-panel>
        <slot name="buttons"></slot>
      </buttons-panel>
    </form>
  </overlay-base>
</template>

<style scoped>
.form-base-content {
  display: flex;
  flex-direction: column;
  gap: var(--size-20);
  margin-bottom: var(--size-20);
}
</style>
