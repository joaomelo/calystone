<script setup lang="ts">
import type { FileText } from "@/domain";

import { fetchText } from "@/domain";

const { artifact } = defineProps<{
  artifact: FileText;
}>();

const text = await fetchText(artifact);
</script>
<template>
  <div>
    <p>{{ text }}</p>
  </div>
</template>