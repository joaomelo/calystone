<script setup lang="ts">
import type { Option, Value } from "../shared";

import { computed, ref } from "vue";
import { useFloating, autoUpdate, offset } from "@floating-ui/vue";
import { ButtonBase } from "../button-base";

type Props = {
  actions: Option[];
};
const props = defineProps<Props>();

type Emits = {
  action: [value: Value];
};
const emit = defineEmits<Emits>();

const isShort = computed(() => props.actions.length <= 1);
const mainAction = computed(() => props.actions[0]);

const handleAction = (value: Value) => emit("action", value);

const isShow = ref(false);
const actionsMenuToggle = ref();
const actionsMenuDropdown = ref<HTMLDivElement>();
const { floatingStyles } = useFloating(actionsMenuToggle, actionsMenuDropdown, {
  placement: "bottom",
  whileElementsMounted: autoUpdate,
  middleware: [offset({ mainAxis: 1, crossAxis: -25 })],
});

const showMenu = () => {
  if (!actionsMenuDropdown.value) return;
  if (isShow.value) {
    actionsMenuDropdown.value.hidePopover();
  } else {
    actionsMenuDropdown.value.showPopover();
  }
  isShow.value = !isShow.value;
};
</script>

<template>
  <div>
    <template v-if="isShort">
      <button-base @click="handleAction(mainAction.value)">
        {{ mainAction.text }}
      </button-base>
    </template>
    <template v-else>
      <button-base ref="actionsMenuToggle" @click="showMenu">...</button-base>
      <div
        ref="actionsMenuDropdown"
        popover
        class="actions-menu-dropdown"
        :style="floatingStyles"
      >
        <div
          v-for="action in actions"
          :key="action.value"
          class="action-menu-dropdown-item"
          @click="handleAction(action.value)"
        >
          {{ action.text }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.actions-menu-dropdown {
  margin: 0;
  padding: 0;
  border: var(--border-size-10) solid var(--color-neutral-40);
}

.action-menu-dropdown-item {
  cursor: pointer;
  padding: var(--size-10);
}

.action-menu-dropdown-item:hover {
  background-color: var(--color-neutral-60);
}
</style>
