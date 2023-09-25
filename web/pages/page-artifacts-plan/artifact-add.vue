<script setup>
import { ref } from "vue";
import { ButtonBase, InputBase } from "@web/components";
import { useT } from "@web/i18n";

defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["add"]);

const t = useT();
const name = ref(null);

const handleAdd = () => {
  emit("add", { name: name.value });
  name.value = null;
};
</script>
<template>
  <div class="artifact-add">
    <input-base v-model="name" @submit="handleAdd" />
    <button-base @click="handleAdd" :busy="busy">
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
