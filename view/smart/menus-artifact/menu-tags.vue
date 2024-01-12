<script setup>
import { MenuItem, useI18n } from "@lib";
import { ref } from "vue";

import { ModalTags } from "../modal-tags";

defineProps({
  artifact: {
    required: true,
    type: Object,
  },
});

const { t } = useI18n();

const showModal = ref(false);
const handleTags = () => showModal.value = true;
</script>

<template>
  <menu-item
    class="menu-tags"
    @click="handleTags"
  >
    {{ t("tags.tags") }}
  </menu-item>
  <teleport to="body">
    <modal-tags
      v-model="showModal"
      :artifact-id="artifact.id"
    />
  </teleport>
</template>
