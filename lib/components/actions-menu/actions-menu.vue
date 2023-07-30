<script setup>
import { computed, ref } from "vue";
import { ButtonBase } from "../button-base";

const props = defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["action"]);

const isShort = computed(() => props.actions.length <= 1);
const mainAction = computed(() => props.actions[0]);

const handleAction = (name) => emit("action", name);

const actionsMenuDropdown = ref(null);
const actionsMenuToggle = ref(null);
const showMenu = () => {
  actionsMenuDropdown.value.togglePopover();
};
</script>

<template>
  <div>
    <template v-if="isShort">
      <button-base @click="handleAction(mainAction.name)">
        {{ mainAction.label }}
      </button-base>
    </template>
    <template v-else>
      <button-base @click="showMenu" ref="actionsMenuToggle">...</button-base>
      <div popover ref="actionsMenuDropdown">
        <div v-for="action in actions" :key="action.name">
          {{ action.label }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
