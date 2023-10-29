<script setup lang="ts">
import { ref } from "vue";
import { ButtonBase, InputBase } from "@view/components";
import { useT } from "@view/i18n";

withDefaults(defineProps<Props>(), {
  busy: false,
});
type Props = {
  busy?: boolean;
};

const emit = defineEmits<Emits>();
type Emits = {
  add: [name: string];
};

const t = useT();

const name = ref("");
const handleAdd = () => {
  emit("add", name.value);
  name.value = "";
};
</script>
<template>
  <div class="artifact-add">
    <input-base v-model="name" @submit="handleAdd" />
    <button-base :busy="busy" @click="handleAdd">
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
