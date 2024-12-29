<script setup lang="ts">
import { useId } from "vue";

const { justify = "start", label } = defineProps<{
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
      <slot :id="id" />
    </div>
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