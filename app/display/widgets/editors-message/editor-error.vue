<script setup lang="ts">
import { useExceptionToast } from "@/display/widgets/toast";
import { Exception } from "@/utils";
import { onMounted } from "vue";

import EditorMessage from "./editor-message.vue";

const { content } = defineProps<{
  content: {
    required: true;
    type: Error;
  }
}>();

const toast = useExceptionToast();

onMounted(() => {
  const exception = new Exception("EDITOR_ERROR", content);
  toast(exception);
});
</script>
<template>
  <EditorMessage message="editor-with-error" />
</template>
