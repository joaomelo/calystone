<script setup>
import { inject, ref } from "vue";
import { InputBase, ButtonBase } from "../../components";
import { useTask } from "../../utils";

const { projects } = inject("store");
const name = ref(null);
const task = useTask(
  async () => {
    await projects.add({ name: name.value });
    name.value = null;
  },
  { delay: 3 }
);
</script>
<template>
  <div class="project-add">
    <input-base v-model="name" @submit="task.run"></input-base>
    <button-base @click="task.run" :busy="task.busy">add</button-base>
  </div>
</template>
<style scoped>
.project-add {
  display: flex;
  gap: var(--size-00);
}
</style>
