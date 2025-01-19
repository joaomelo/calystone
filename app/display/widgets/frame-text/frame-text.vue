<script setup lang="ts">
import { FrameCard } from "@/display/widgets/frame-card";
defineProps<{
  date: string;
  title: string;
}>();
</script>
<template>
  <FrameCard>
    <div class="frame-text">
      <h1>{{ title }}</h1>
      <p>Effective Date: {{ date }}</p>

      <slot />

      <div class="frame-text-home">
        <router-link :to="{ name: 'open' }">
          Back to Home
        </router-link>
      </div>
    </div>
  </FrameCard>
</template>
<style scoped>
.frame-text {
  & :deep(h2) {
    font-size: var(--font-size-2);
  }

  & :deep(p) {
    margin-block-end: var(--size-3);
  }
}

.frame-text-home {
  text-align: end;
}
</style>