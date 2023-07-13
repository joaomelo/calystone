<script setup>
import {
  useGlobalStateful,
  useGlobals,
  OverlayBase,
  InputBase,
} from "../../../lib";

defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
});

const locale = useGlobalStateful((i18n) => i18n.locale);
const { i18n } = useGlobals();
const supported = i18n.supported;
const handleUpdateLocale = (value) => (i18n.locale = value);
</script>
<template>
  <div class="page-base">
    <nav class="page-base-nav">
      <h1 class="page-base-title"><slot name="title"></slot></h1>
      <slot name="aside"></slot>
    </nav>
    <overlay-base :show="busy" class="page-base-content-overlay">
      <div class="page-base-content">
        <slot></slot>
      </div>
    </overlay-base>
    <footer class="page-base-footer">
      <span class="page-base-footer-brand">calystone</span>
      <span class="page-base-footer-divider">·</span>
      <input-base
        :options="supported"
        type="select"
        :modelValue="locale"
        @update:modelValue="handleUpdateLocale"
        class="page-base-locale"
      />
    </footer>
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
  display: flex;
  justify-content: space-between;
}

.page-base-title {
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

.page-base-locale {
  display: inline;
}

.page-base-footer-brand,
.page-base-footer-divider {
  margin-right: var(--size-10);
}
</style>
