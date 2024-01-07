<script setup>
import { InputCamo, useDependencies } from "@lib";
import { editTag } from "@body";

const props = defineProps({
  tag: {
    type: Object,
    required: true,
  },
});

const dependencies = useDependencies();

const handleUpdate = (name) => {
  const { id, name: current } = props.tag;
  if (name === current) return;
  editTag(dependencies, { id, name });
};
</script>

<template>
  <input-camo
    class="item-name"
    :model-value="tag.name"
    @update:model-value="handleUpdate"
  />
</template>

<style scoped>
.item-name {
  flex-grow: 1;
}
</style>
