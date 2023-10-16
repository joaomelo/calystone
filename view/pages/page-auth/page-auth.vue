<script setup>
import { useTask } from "@shared";
import { useService } from "@service";
import { useT } from "@view/i18n";
import { ButtonBase } from "@view/components";
import { LayoutBase } from "@view/layouts";

const emit = defineEmits(["load"]);

const t = useT();
const service = useService();

const { task } = useTask(async () => {
  try {
    const [file] = await window.showOpenFilePicker({
      types: [
        {
          description: "calystone file",
          accept: {
            "application/json*": [".calystone"],
          },
        },
      ],
    });
    await service.db.open(file);
    // emit("load");
  } catch {
    console.info("could not open file");
  }
});
</script>
<template>
  <layout-base>
    <div class="page-load">
      <button-base @click="task.run" :busy="task.busy">
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
