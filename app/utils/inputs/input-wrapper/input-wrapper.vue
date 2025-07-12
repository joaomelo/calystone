<script setup lang="ts">
import { kebabCase } from "@/utils/text";
import Message from "primevue/message";
import { useId } from "vue";

const { direction = "column", justify = "start", label } = defineProps<{
  dataTest: string;
  direction?: "column" | "column-reverse" | "row" | "row-reverse";
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
    :data-test="dataTest"
  >
    <label
      v-if="label"
      :for="id"
      :data-test="kebabCase(dataTest, 'label')"
    >
      {{ label }}
    </label>
    <div class="input-wrapper-content">
      <slot
        :id="id"
        :invalid="!!error"
        :input-data-test="kebabCase(dataTest, 'input')"
      />
    </div>
    <template v-if="error">
      <Message
        severity="error"
        size="small"
        variant="simple"
        :data-test="kebabCase(dataTest, 'error')"
      >
        {{ error }}
      </Message>
    </template>
  </div>
</template>
<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: v-bind(direction);
  justify-content: v-bind(justify);
  gap: var(--size-2);

  label {
    font-weight: var(--font-weight-6);
  }
}

.input-wrapper-content {
  flex: 1;
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