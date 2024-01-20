<script setup>
import { getTag, listArtifactsOfTag } from "@body";
import { ListBase, MenuDivider, truncate, useDependencies } from "@lib";
import { FrameDashboard, ItemArtifact, MenuEdit, MenuFocus, MenuStatus, MenuTags } from "@view/smart";
import { computed, toRef } from "vue";

import { useHandleDrag } from "./use-handle-drag";

const props = defineProps({
  tagId: {
    required: true,
    type: String,
  },
});

const dependencies = useDependencies();

const tag = computed(() => getTag(dependencies, props.tagId));

const items = computed(() => {
  const artifacts = listArtifactsOfTag(dependencies, props.tagId);
  return artifacts.map(({ id, notes }) => ({
    tooltip: truncate(notes, 100),
    value: id,
  }));
});

const handleDrag = useHandleDrag(toRef(props, "tagId"));
</script>

<template>
  <frame-dashboard :title="tag.name">
    <list-base
      :items="items"
      :draggable="{ top: true, bottom: true, middle: false }"
      @drag="handleDrag"
    >
      <template #item="item">
        <item-artifact :id="item.value">
          <template #actions="artifact">
            <menu-status :artifact="artifact" />
            <menu-divider />
            <menu-focus :artifact="artifact" />
            <menu-edit :artifact="artifact" />
            <menu-tags :artifact="artifact" />
          </template>
        </item-artifact>
      </template>
    </list-base>
  </frame-dashboard>
</template>
