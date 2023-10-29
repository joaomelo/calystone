<script setup lang="ts">
import { useI18n } from "@view/i18n";
import { InputBase, asOptions } from "@view/components";

const i18n = useI18n();
const supported = asOptions(i18n.supported);
const handleUpdate = (locale: string | null) => {
  if (!locale) return;
  i18n.updateLocale(locale);
};
</script>
<template>
  <div class="frame-base">
    <main class="frame-base-content">
      <slot></slot>
    </main>
    <footer class="frame-base-footer">
      <span>calystone</span>
      <span class="frame-base-footer-divider">·</span>
      <input-base
        :options="supported"
        type="select"
        :model-value="i18n.locale"
        inline
        @update:model-value="handleUpdate"
      />
    </footer>
  </div>
</template>
<style scoped>
.frame-base {
  flex-grow: 1;

  max-width: var(--size-90);
  min-height: 100vh;
  margin: auto;

  padding-block: var(--size-10);
  padding-inline: var(--size-20);

  background-color: var(--color-neutral-70);

  display: flex;
  flex-direction: column;
}

.frame-base-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.frame-base-footer {
  text-align: center;
  color: var(--color-neutral-30);
  font-size: var(--font-size-10);
}

.frame-base-footer-divider {
  margin-inline: var(--size-10);
}
</style>
