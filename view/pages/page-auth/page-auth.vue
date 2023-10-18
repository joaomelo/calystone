<script setup lang="ts">
import { useT } from "@view/i18n";
import { ButtonBase } from "@view/components";
import { useLoad } from "./use-load";

type Emits = {
  load: [];
};
const emit = defineEmits<Emits>();

const t = useT();
const loadTask = useLoad();

const handleClick = async () => {
  await loadTask.run();
  emit("load");
};
</script>
<template>
  <layout-base>
    <div class="page-load">
      <button-base :busy="loadTask.busy" @click="handleClick">
        {{ t("load") }}
      </button-base>
    </div>
  </layout-base>
</template>
<style scoped>
.page-load {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-40);
}
</style>
