<script setup lang="ts">
import { useI18n } from "@/display/i18n";

const { t } = useI18n();
</script>
<template>
  <div class="app-features">
    <div>
      <h1>{{ t('features.header.title') }}</h1>
      <p>{{ t('features.header.description') }}</p>
    </div>
    <ul>
      <li>
        <h2>{{ t('features.note-taking.title') }}</h2>
        <p>{{ t('features.note-taking.description') }}</p>
      </li>
      <li>
        <h2>{{ t('features.data-ownership.title') }}</h2>
        <p>{{ t('features.data-ownership.description') }}</p>
      </li>
      <li>
        <h2>{{ t('features.open-source.title') }}</h2>
        <i18n-t
          keypath="features.open-source.description"
          tag="p"
          scope="global"
        >
          <a
            href="https://github.com/joaomelo/calystone"
            target="_blank"
          >GitHub</a>
        </i18n-t>
      </li>
      <li>
        <h2>{{ t('features.early-development.title') }}</h2>
        <p>{{ t('features.early-development.description') }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.app-features {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);

  & ul {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
  }
}
</style>