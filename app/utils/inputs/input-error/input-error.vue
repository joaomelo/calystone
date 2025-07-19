<script setup lang="ts">
import Message from "primevue/message";

defineProps<{
  dataTest: string;
  message: string;
}>();

</script>
<template>
  <Message
    severity="error"
    size="small"
    variant="simple"
    :data-test="dataTest"
  >
    {{ message }}
  </Message>
</template>
