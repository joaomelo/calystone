<script setup lang="ts">
import { type Artifact } from "@data";
// import { useI18n } from "@display/i18n";
// import { FrameDashboard } from "@view/smart";
// import { computed } from "vue";

// // import OutlineAdd from "./outline-add.vue";
// // import OutlineCrumbs from "./outline-crumbs.vue";
// // import OutlineItem from "./outline-item.vue";
// // import OutlineItems from "./outline-items.vue";

interface Props {
  artifacts: Map<string, Artifact>;
  parentId?: string;
}

const { artifacts } = defineProps<Props>();

// const { t } = useI18n();

</script>

<template>
  <div>
    <pre> {{ artifacts }}</pre>
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
  </div>
</template>
