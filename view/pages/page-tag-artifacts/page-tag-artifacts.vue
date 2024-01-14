<script setup>
import { FrameDashboard } from "@view/smart";

defineProps({
  tagId: {
    required: true,
    type: String,
  },
});
</script>
<template>
  <frame-dashboard :title="tagId">
    <!-- <search-bar :term="term" />
    <search-list :term="term">
      <template #item="item">
        <search-item :id="item.value" />
      </template>
    </search-list> -->
  </frame-dashboard>
</template>
