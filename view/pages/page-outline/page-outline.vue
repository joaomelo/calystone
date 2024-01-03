<script setup>
import { computed } from "vue";
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/frames";
import ArtifactAdd from "./artifact-add.vue";
import ArtifactAncestry from "./artifact-ancestry.vue";
import OutlineItems from "./outline-items.vue";
import OutlineItem from "./outline-item.vue";

const props = defineProps({
  parentId: {
    type: String,
    default: null,
  },
});
const { t } = useI18n();

// vue router coerces the parentId param to an empty string when the correct value should be null
const id = computed(() => props.parentId || null);
</script>
<template>
  <frame-dashboard :title="t('page-outline.outline')">
    <artifact-ancestry v-if="id" :id="id" class="mb-25" />
    <artifact-add :parent-id="id" class="mb-25" />
    <outline-items :parent-id="id">
      <template #item="item">
        <outline-item :id="item.value" />
      </template>
    </outline-items>
  </frame-dashboard>
</template>

<style scoped>
.mb-25 {
  margin-bottom: var(--size-25);
}
</style>
