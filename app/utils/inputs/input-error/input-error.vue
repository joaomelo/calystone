<script setup lang="ts">
import Message from "primevue/message";

defineProps<{
  dataTest: string;
  message: string;
}>();

</script>
<template>
  <Message
    :data-test="dataTest"
    severity="error"
    size="small"
    variant="simple"
  >
    {{ message }}
  </Message>
</template>
