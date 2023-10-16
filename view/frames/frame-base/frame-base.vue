<script setup lang="ts">
import { useI18n } from "@view/i18n";
import { InputBase } from "@view/components";

const i18n = useI18n();
const handleUpdate = (locale: string) => i18n.updateLocale(locale);
</script>
<template>
  <div class="layout-base">
    <div class="layout-base-content">
      <slot></slot>
    </div>
    <footer class="layout-base-footer">
      <span>calystone</span>
      <span class="layout-base-footer-divider">·</span>
      <input-base
        :options="i18n.supported"
        type="select"
        :modelValue="i18n.locale"
        @update:modelValue="handleUpdate"
        class="layout-base-locale"
        inline
      />
    </footer>
  </div>
</template>
<style scoped>
.layout-base {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
}

.layout-base-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.layout-base-footer {
  text-align: center;
  color: var(--color-neutral-30);
  font-size: var(--font-size-10);
}

.layout-base-locale {
  display: inline;
}

.layout-base-footer-divider {
  margin-inline: var(--size-10);
}
</style>
