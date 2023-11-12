<script setup lang="ts">
import { OverlayBase } from "../overlay-base";

type Props = {
  busy?: boolean;
};
withDefaults(defineProps<Props>(), {
  busy: false,
});
const emit = defineEmits<{
  submit: [];
}>();

const handleSubmit = () => emit("submit");
</script>
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="form-base-content">
        <slot></slot>
      </div>
      <div class="form-base-buttons">
        <slot name="buttons"></slot>
      </div>
    </form>
    <overlay-base :show="busy" />
  </div>
</template>

<style scoped>
.form-base-content {
  display: flex;
  flex-direction: column;
  gap: var(--size-20);
}

.form-base-buttons {
  margin-top: var(--size-20);
  display: flex;
  justify-content: end;
  gap: var(--size-10);
}
</style>
