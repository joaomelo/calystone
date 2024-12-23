<script setup lang="ts">
import Textarea from "primevue/textarea";

import { InputWrapper } from "../input-wrapper";

const { label } = defineProps<{
  label?: string;
  rows: number | string
}>();
const model = defineModel({ type: String });

</script>
<template>
  <InputWrapper :label>
    <template #default="{ id }">
      <Textarea
        :id="id"
        v-model="model"
        :allow-empty="false"
        :rows="rows"
        class="input-textarea"
        fluid
      />
    </template>
  </InputWrapper>
</template>
<style scoped>
.input-textarea {
  resize: none;
  height: 100%;
}
</style>