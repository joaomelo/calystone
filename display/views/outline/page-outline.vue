<script setup lang="ts">
import { type Entry } from "@data";
// import { useI18n } from "@lib";
// import { FrameDashboard } from "@view/smart";
// import { computed } from "vue";

// // import OutlineAdd from "./outline-add.vue";
// // import OutlineCrumbs from "./outline-crumbs.vue";
// // import OutlineItem from "./outline-item.vue";
// // import OutlineItems from "./outline-items.vue";

interface Props {
  entries: Map<string, Entry>;
  parentId?: string;
}

const { entries } = defineProps<Props>();

// const { t } = useI18n();

</script>

<template>
  <div>
    <!-- <frame-dashboard :title="t('shared.outline')"> -->
    <pre> {{ entries }}</pre>
    <!-- <outline-crumbs
      v-if="id"
      :id="id"
    />
    <outline-add :parent-id="id" />
    <outline-items :parent-id="id">
      <template #item="item">
        <outline-item :id="item.value" />
      </template>
    </outline-items> -->
  <!-- </frame-dashboard> -->
  </div>
</template>
