<script setup>
import { useT } from "@web/i18n";
import { ButtonBase, useTask } from "@web/components";
import { useStore } from "@web/store";
import { PageBase } from "../page-base";

const emit = defineEmits(["load"]);

const t = useT();
const { db } = useStore();

const { task } = useTask(async () => {
  await db.load();
  emit("load");
});
</script>
<template>
  <page-base>
    <div class="page-load">
      <button-base @click="task.run" :busy="task.busy">{{
        t("load")
      }}</button-base>
    </div>
  </page-base>
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
