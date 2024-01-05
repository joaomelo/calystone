<script setup>
import { computed } from "vue";
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/smart";
import OutlineAdd from "./outline-add.vue";
import OutlineCrumbs from "./outline-crumbs.vue";
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
    <outline-crumbs
      v-if="id"
      :id="id"
      class="frame-dashboard-crumbs"
    />
    <outline-add
      :parent-id="id"
      class="frame-dashboard-add"
    />
    <outline-items :parent-id="id">
      <template #item="item">
        <outline-item :id="item.value" />
      </template>
    </outline-items>
  </frame-dashboard>
</template>

<style scoped>
.frame-dashboard-crumbs,
.frame-dashboard-add {
  margin-bottom: var(--size-25);
}
</style>
