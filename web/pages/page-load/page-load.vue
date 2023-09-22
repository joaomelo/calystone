<script setup>
import { useT } from "@web/i18n";
import { ButtonBase } from "@web/components";
import { LayoutBase } from "@web/layouts";
import { useOpen } from "./use-open";

const emit = defineEmits(["load"]);

const t = useT();
const openTask = useOpen(() => emit("load"));
</script>
<template>
  <layout-base>
    <div class="page-load">
      <button-base @click="openTask.run" :busy="openTask.busy">
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
