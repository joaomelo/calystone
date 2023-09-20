<script setup>
import { useI18n } from "@web/i18n";
import { InputBase } from "@web/components";

const i18n = useI18n();
const handleUpdate = (locale) => i18n.updateLocale(locale);
</script>
<template>
  <div class="page-base">
    <header>
      <slot name="header"></slot>
    </header>
    <div class="page-base-content">
      <slot></slot>
    </div>
    <footer class="page-base-footer">
      <span>calystone</span>
      <span class="page-base-footer-divider">·</span>
      <input-base
        :options="i18n.supported"
        type="select"
        :modelValue="i18n.locale"
        @update:modelValue="handleUpdate"
        class="page-base-locale"
      />
    </footer>
  </div>
</template>
<style scoped>
.page-base {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
}

.page-base-content {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
}

.page-base-footer {
  text-align: center;
  color: var(--color-neutral-30);
  font-size: var(--font-size-10);
}

.page-base-locale {
  display: inline;
}

.page-base-footer-divider {
  margin-inline: var(--size-10);
}
</style>
