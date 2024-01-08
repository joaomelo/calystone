<script setup>
import { ButtonsPanel, OverlayBase, TextAlert } from "@lib";

defineProps({
  busy: {
    default: false,
    type: Boolean,
  },
  error: {
    default: null,
    type: String,
  },
  inline: {
    default: false,
    type: Boolean,
  },
});
const emit = defineEmits(["submit"]);
const handleSubmit = () => emit("submit");
</script>
<template>
  <overlay-base :show="busy">
    <form
      class="form-base-form"
      :class="{ inline }"
      @submit.prevent="handleSubmit"
    >
      <div class="form-base-content">
        <text-alert
          v-if="error"
          icon="error"
          :text="error"
        />
        <slot />
      </div>
      <buttons-panel>
        <slot name="buttons" />
      </buttons-panel>
    </form>
  </overlay-base>
</template>

<style scoped>
.form-base-form {
  display: flex;
  flex-direction: column;
  gap: var(--size-25);
}

.form-base-form.inline {
  flex-direction: row;
}

.form-base-content {
  display: flex;
  flex-direction: column;
  gap: var(--size-20);

  flex-grow: 1;
}
</style>
