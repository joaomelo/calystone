<script setup>
import { getTag } from "@body";
import { useDependencies } from "@lib";
import { computed } from "vue";

import PageTagsItemActions from "./page-tags-item-actions.vue";
import PageTagsItemName from "./page-tags-item-name.vue";

const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

const dependencies = useDependencies();
const tag = computed(() => getTag(dependencies, props.id));
</script>

<template>
  <div
    class="page-tags-item"
    :data-test="`tag-${tag.name}`"
  >
    <page-tags-item-name :tag="tag" />
    <page-tags-item-actions :tag="tag" />
  </div>
</template>
<style scoped>
.page-tags-item {
  display: flex;
  align-items: baseline;
  gap: var(--size-15);
}
</style>
