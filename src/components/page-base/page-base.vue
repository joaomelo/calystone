<script setup>
import { inject } from "vue";
import { OverlayBase } from "../../components";

defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
});

const { i18n } = inject("store");
const locale = i18n.map((i18n) => i18n.locale);
</script>
<template>
  <div class="page-base">
    <nav class="page-base-nav">
      <router-link to="/" class="page-base-home">calystone</router-link>
    </nav>
    <overlay-base :show="busy" class="page-base-content-overlay">
      <div class="page-base-content">
        <slot></slot>
      </div>
    </overlay-base>
    <footer class="page-base-footer">{{ locale }}</footer>
  </div>
</template>
<style scoped>
.page-base {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.page-base-nav {
  margin-block-end: var(--size-30);
}

.page-base-home {
  text-decoration: none;
  font-size: var(--font-size-30);
  font-weight: var(--font-weight-30);
}

.page-base-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--size-20);
}

.page-base-content-overlay {
  width: 100%;
  height: 100%;
}

.page-base-footer {
  text-align: center;
  color: var(--color-neutral-30);
  font-size: var(--font-size-10);
}
</style>
