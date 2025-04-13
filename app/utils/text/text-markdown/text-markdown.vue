<script setup lang="ts">
import DOMPurify from "dompurify";
import { marked } from "marked";
import { computed } from "vue";

const { markdown } = defineProps<{
  markdown: string;
}>();

const renderedMarkdown = computed(() => {
  if (!markdown) return "";
  const html = marked(markdown, { async: false });
  const sanitized = DOMPurify.sanitize(html);
  return sanitized;
});
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="text-markdown"
    v-html="renderedMarkdown"
  />
</template>

<style scoped>
.text-markdown {
  color: var(--p-text-color);

  & :deep(h1),
  & :deep(h2),
  & :deep(h3),
  & :deep(ul),
  & :deep(ol),
  & :deep(p) {
    margin-block-end: var(--size-3);
  }

  & :deep(h1) {
    font-size: var(--font-size-5);
  }

  & :deep(h2) {
    font-size: var(--font-size-4);
  }

  & :deep(h3) {
    font-size: var(--font-size-3);
  }

  & :deep(p) {
    font-size: var(--font-size-1);
  }

  & :deep(ul),
  & :deep(ol) {
    padding-left: var(--size-3);
  }

  & :deep(code) {
    font-family: monospace;
  }

  & :deep(pre) {
    font-family: monospace;
    overflow-x: auto;
  }

  & :deep(blockquote) {
    border-left: var(--border-size-1) solid var(--p-primary-200);
    padding-left: var(--size-2);
  }
}
</style>
