<script setup lang="ts">
import { Store } from "@/display/store";
import { ButtonBase } from "@/display/widgets/button-base";
import { InputText } from "@/display/widgets/input-text";
import { Node } from "@/domain";
import { useSchema } from "@/utils";
import Dialog from "primevue/dialog";
import { reactive, ref } from "vue";

const { node } = defineProps<{
  node?: Node
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

const { dispatch, errors, validate } = useSchema((builder) => {
  return builder.object({
    name: builder.string().nonempty({ message: "name cannot be empty" }),
    node: builder.instanceof(Node, { message: "no active node to be renamed" })
  });
});

async function save() {
  const success = validate(data);
  if (!success) return;
  await dispatch(async () => {
    await service.renamer.perform({ name: data.name, node: data.node });
    visible.value = false;
  });
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
        autofocus
        :error="errors.name ?? errors.form"
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