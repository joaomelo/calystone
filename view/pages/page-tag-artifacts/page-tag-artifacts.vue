<script setup>
import { getTag, listArtifactsOfTag } from "@body";
import { ListBase, MenuDivider, truncate, useDependencies } from "@lib";
import { FrameDashboard, ItemArtifact, MenuEdit, MenuFocus, MenuStatus, MenuTags } from "@view/smart";
import { computed } from "vue";

const props = defineProps({
  tagId: {
    required: true,
    type: String,
  },
});

const dependencies = useDependencies();

const tag = getTag(dependencies, props.tagId);

const items = computed(() => {
  const artifacts = listArtifactsOfTag(dependencies, props.tagId);
  return artifacts.map(({ id, notes }) => ({
    tooltip: truncate(notes, 100),
    value: id,
  }));
});
</script>

<template>
  <frame-dashboard :title="tag.name">
    <list-base
      :items="items"
      :draggable="{ top: true, middle: false, bottom: true}"
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
