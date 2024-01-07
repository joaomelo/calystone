<script setup>
import { computed } from "vue";
import { getTag } from "@body";
import { useDependencies } from "@lib";

// import ItemActions from "./item-actions.vue";
import ItemName from "./item-name.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const dependencies = useDependencies();
const tag = computed(() => getTag(dependencies, props.id));
</script>

<template>
  <div class="tags-item">
    <item-name :tag="tag" />
    <!-- <item-actions :tag="tag" /> -->
  </div>
</template>
<style scoped>
.tags-item {
  display: flex;
  align-items: baseline;
  gap: var(--size-15);
}
</style>
