<script setup lang="ts">
import { Store } from "@/display/store";
import { ButtonBase } from "@/display/widgets/button-base";
import { InputText } from "@/display/widgets/input-text";
import { Node } from "@/domain";
import { throwCritical, throwError } from "@/utils";
import Dialog from "primevue/dialog";
import { reactive, ref } from "vue";
import { z } from "zod";

const { node } = defineProps<{
  node: Node | undefined
}>();
defineExpose({ show });

const { service } = Store.use();
const visible = ref(false);

const data = reactive<{
  name: string | undefined,
  node: Node | undefined
}>({
  name: undefined,
  node
});

const schema = z.object({
  name: z.string().nonempty({ message: "name is required" }),
  node: z.instanceof(Node)
});

const errors = ref({});

async function save() {
  const validation = schema.safeParse(data);
  if (!validation.success) {
    errors.value = validation.error.format();
    console.log({ errors: errors.value });
    return;
  }

  if (!node) throwCritical("NO_ACTIVE_NODE", "no active node to be renamed");
  if (!data.name) throwError("EMPTY_NAME", "the name cannot be empty ir order do rename a node");
  await service.renamer.perform({ name: data.name, node });
  visible.value = false;
}

function show() {
  data.name = node?.name;
  data.node = node;
  visible.value = true;
}
</script>
<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="rename"
    :style="{ 'width': 'min(var(--size-sm), 90%)' }"
  >
    <template #default>
      <InputText
        v-model="data.name"
        label="name"
        name="name"
        autofocus
      />
    </template>
    <template #footer>
      <ButtonBase
        label="cancel"
        severity="secondary"
        @click="visible = false"
      />
      <ButtonBase
        label="save"
        severity="primary"
        @click="save"
      />
    </template>
  </Dialog>
</template>