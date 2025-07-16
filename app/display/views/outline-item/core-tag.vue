<script setup lang="ts">
import type { Tag } from "@/domain";

import CoreBase from "./core-base.vue";

const { tag } = defineProps<{ tag: Tag; }>();

</script>

<template>
  <CoreBase
    icon="bx bx-sm bx-purchase-tag-alt"
    :label="tag.name"
  />
</template>