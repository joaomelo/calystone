<script setup lang="ts">
import Textarea from "primevue/textarea";

import { InputWrapper } from "../input-wrapper";

defineProps<{
  dataTest: string
  rows: number | string
}>();
const model = defineModel({ type: String });

</script>
<template>
  <InputWrapper :data-test="dataTest">
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