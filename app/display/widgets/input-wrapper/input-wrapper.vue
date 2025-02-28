<script setup lang="ts">
import Message from "primevue/message";
import { useId } from "vue";

const { justify = "start", label } = defineProps<{
  error?: string;
  justify?: "center" | "end" | "start";
  label?: string;
}>();

const id = useId();

</script>
<template>
  <div
    class="input-wrapper"
    :class="[`justify-${justify}`]"
  >
    <label
      v-if="label"
      :for="id"
    >
      {{ label }}
    </label>
    <div class="input-wrapper-content">
      <slot
        :id="id"
        :invalid="!!error"
      />
    </div>
    <Message
      severity="error"
      size="small"
      variant="simple"
    >
      {{ error }}
    </Message>
  </div>
</template>
<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--size-2);

  label {
    font-weight: var(--font-weight-6);
  }
}

.justify-center {
  label {
    text-align: center
  }

  .input-wrapper-content {
    display: flex;
    justify-content: center;
  }
}
</style>