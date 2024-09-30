<script setup lang="ts">
// import { computed, ref, watch } from "vue";

// import { ButtonVeil } from "../button-veil";
// import { VisualIcon } from "../visual-icon";

// const props = defineProps({
//   modelValue: {
//     required: true,
//     type: String,
//     validator: value => ["closed", "fixed", "open"].includes(value),
//   },
// });
// const emit = defineEmits(["update:modelValue"]);

// const popover = computed(() => (props.modelValue === "fixed" ? undefined : "auto"));

// const sideBar = ref();
// const handleToggle = ({ newState }) => {
//   if (newState !== props.modelValue) {
//     emit("update:modelValue", newState);
//   }
// };
// watch(
//   () => props.modelValue,
//   (value) => {
//     if (value === "fixed") return;
//     if (value === "open") {
//       sideBar.value.showPopover();
//     }
//     else {
//       sideBar.value.hidePopover();
//     }
//   },
//   {
//     flush: "post",
//   },
// );

// const handleClick = () => { emit("update:modelValue", "closed"); };
</script>
<template>
  <aside class="side-bar">
    <ul class="side-bar-items">
      <slot name="default" />
    </ul>
    <ul class="side-bar-items">
      <slot name="bottom" />
    </ul>
  </aside>
  <!-- <aside
    ref="sideBar"
    :popover="popover"
    class="side-bar"
    @toggle="handleToggle"
  >
    <div class="side-bar-container">
      <button-veil
        v-if="modelValue === 'open'"
        class="side-bar-close"
        @click="handleClick"
      >
        <visual-icon
          name="close"
          size="var(--size-30)"
        />
      </button-veil>
      <slot />
    </div>
  </aside> -->
</template>
<style scoped>
.side-bar {
  border-right: var(--border-size-1) solid var(--p-surface-100);

  padding-block: var(--size-4);
  padding-inline: var(--size-2);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.side-bar-items {
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}
</style>
