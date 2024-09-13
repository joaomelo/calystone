<script setup lang="ts">
// import { useI18n } from "@lib";
// import { FrameDashboard } from "@view/smart";
// import { computed } from "vue";

// // import OutlineAdd from "./outline-add.vue";
// // import OutlineCrumbs from "./outline-crumbs.vue";
// // import OutlineItem from "./outline-item.vue";
// // import OutlineItems from "./outline-items.vue";

// const props = defineProps({
//   parentId: {
//     default: null,
//     type: String,
//   },
// });
// const { t } = useI18n();

// vue router coerces the parentId param to an empty string when the correct value should be null
// const id = computed(() => props.parentId || null);
</script>

<template>
  <div>
    <!-- <frame-dashboard :title="t('shared.outline')"> -->
    outline
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
