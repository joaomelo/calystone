<script setup lang="ts">
import { ref } from "vue";
import { usePilot } from "@pilot";
import { ButtonBase, InputBase, useTask } from "@view/components";
import { useT } from "@view/i18n";

const t = useT();

const name = ref("");
const pilot = usePilot();
const add = useTask(async () => {
  await pilot.addArtifact(name.value);
  name.value = "";
});
</script>
<template>
  <div class="artifact-add">
    <input-base v-model="name" @submit="add.run" />
    <button-base :busy="add.busy" @click="add.run">
      {{ t("add") }}
    </button-base>
  </div>
</template>
<style scoped>
.artifact-add {
  display: flex;
  justify-content: space-between;
  gap: var(--size-00);
}
</style>
