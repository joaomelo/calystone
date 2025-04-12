<script setup lang="ts">
import DOMPurify from "dompurify";
import { marked } from "marked";
import { computed } from "vue";

const { markdown } = defineProps<{
  markdown: string;
}>();

const renderedMarkdown = computed(() => {
  if (!markdown) return "";
  const html = marked(markdown);
  const sanitized = DOMPurify.sanitize(html);
  return sanitized;
});
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="markdown-content"
    v-html="renderedMarkdown"
  />
</template>

<style scoped>
.markdown-content {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
}

.markdown-content :deep(h1) {
  font-size: 2em;
  margin: 0.67em 0;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  margin: 0.83em 0;
}

.markdown-content :deep(h3) {
  font-size: 1.17em;
  margin: 1em 0;
}

.markdown-content :deep(p) {
  margin: 1em 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 1em 0;
  padding-left: 2em;
}

.markdown-content :deep(code) {
  background-color: #f0f0f0;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.markdown-content :deep(pre) {
  background-color: #f0f0f0;
  padding: 1em;
  border-radius: 5px;
  overflow-x: auto;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #ccc;
  margin: 1em 0;
  padding-left: 1em;
  color: #666;
}
</style>
