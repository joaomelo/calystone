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
      />
    </template>
  </InputWrapper>
</template>