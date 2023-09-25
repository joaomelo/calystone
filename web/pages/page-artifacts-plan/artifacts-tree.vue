<script setup>
import { ListBase } from "@web/components";

defineProps({
  tree: {
    type: Array,
    default: () => [],
  },
});
// const emit = defineEmits(["edit"]);

const handleAction = ({ action, item }) => {
  console.log({ action, item });
  // switch (action) {
  //   case deleteAction.name:
  //     return delArtifact.run(item);
  //   case editAction.name:
  //     return emit("edit", item.id);
  // }
};
</script>
<template>
  <list-base :items="tree" @action="handleAction" />
</template>
