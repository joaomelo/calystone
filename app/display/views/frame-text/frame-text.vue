<script setup lang="ts">
import { Frameplain } from "@/display/views/frame-plain";
import { TextMarkdown } from "@/utils";

defineProps<{
  text: string;
}>();
</script>
<template>
  <Frameplain>
    <div class="frame-text">
      <TextMarkdown :markdown="text" />
      <div class="frame-text__home">
        <router-link
          data-test="open-link"
          :to="{ name: 'open' }"
        >
          Back to Home
        </router-link>
      </div>
    </div>
  </Frameplain>
</template>
<style scoped>
.frame-text__home {
  text-align: end;
}
</style>