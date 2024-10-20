<script setup>
import { editTag } from "@/body";
import { InputCamo, useDependencies } from "@/lib";

const props = defineProps({
  tag: {
    required: true,
    type: Object,
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
    class="page-tags-item-name"
    :model-value="tag.name"
    @update:model-value="handleUpdate"
  />
</template>

<style scoped>
.page-tags-item-name {
  flex-grow: 1;
}
</style>
