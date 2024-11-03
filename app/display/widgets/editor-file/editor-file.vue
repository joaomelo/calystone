<script setup lang="ts">
import type { File } from "@/domain";

import { useI18n } from "@/display/i18n";
import { path } from "@/domain";
import { filesize } from "filesize";
import { ref, watchEffect } from "vue";

const { artifact } = defineProps<{
  artifact: File;
}>();

const { t } = useI18n();

const size = ref("calculating...");
const type = ref("calculating...");

watchEffect(() => {
  artifact.fetch().then(blob => {
    size.value = filesize(blob.size);
    type.value = blob.type;
  }).catch(() => {
    size.value = "error";
    type.value = "error";
  });
});
</script>
<template>
  <div>
    <p><b>type</b>: {{ type }}</p>
    <p><b>size</b>: {{ size }}</p>
    <p><b>{{ t('path') }}</b>: {{ path(artifact) }}</p>
  </div>
</template>