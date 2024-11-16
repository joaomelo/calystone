<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { TextMessage } from "@/display/widgets";

const { t } = useI18n();
</script>
<template>
  <div class="app-features">
    <TextMessage severity="warn">
      {{ t('features.warning') }}
    </TextMessage>
    <div>
      <h1>{{ t('features.title') }}</h1>
      <p>{{ t('features.description') }}</p>
    </div>
    <div>
      <ul>
        <li>
          <h2>{{ t('features.note-taking') }}</h2>
          <p>{{ t('features.note-taking-description') }}</p>
        </li>
        <li>
          <h2>{{ t('features.data-ownership') }}</h2>
          <p>{{ t('features.data-ownership-description') }}</p>
        </li>
        <li>
          <h2>{{ t('features.open-source') }}</h2>
          <i18n-t
            keypath="features.open-source-description"
            tag="p"
            scope="global"
          >
            <a
              href="https://github.com/joaomelo/calystone"
              target="_blank"
            >GitHub</a>
          </i18n-t>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.app-features {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);

  & ul {
    margin-inline-start: var(--size-3);
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
  }
}
</style>