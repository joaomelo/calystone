<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { InputRichText } from "@/display/affordances/input-rich-text";
import { Store } from "@/display/store";
import { debounce } from "@/utils";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();

const handleUpdatedetails = debounce(async (text: string) => {
  artifact.details = text;
  await services.exchangeArtifact.postFrom(artifact);
});
</script>
<template>
  <InputRichText
    data-test="input-details"
    lineless
    :model-value="artifact.details"
    @update:model-value="handleUpdatedetails"
  />
</template>
