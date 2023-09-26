<script setup>
import { ListBase } from "@view/components";

defineProps({
  tree: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["edit", "del"]);

const handleAction = ({ action, item }) => {
  switch (action) {
    case "del":
      return emit("del", item.id);
    case "edit":
      return emit("edit", item.id);
  }
};
</script>
<template>
  <list-base :items="tree" @action="handleAction" />
</template>
