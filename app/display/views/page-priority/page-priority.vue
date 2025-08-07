<script setup lang="ts">
import type { ItemData } from "@/display/views/outline-item";
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher } from "@/display/views/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { MasterDetail } from "@/utils";
import {
  computed,
  ref
} from "vue";

import type { Filters } from "./filters";

import PagePriorityFilters from "./page-priority-filters.vue";
import PagePriorityOutline from "./page-priority-outline.vue";

const { services } = Store.use();

const filters = ref<Filters>({});
const selectedNode = ref<Node | undefined>();
const showDetail = computed(() => Boolean(selectedNode.value));

function handleClose() {
  selectedNode.value = undefined;
}

function handleSelected(itemData?: ItemData) {
  const id = itemData?.key;
  const node = id ? services.retrieveNodes.get(id) : undefined;
  selectedNode.value = node;
}
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      v-model="showDetail"
      class="page-priority"
    >
      <template #master>
        <PagePriorityFilters v-model="filters" />
        <PagePriorityOutline
          :filters="filters"
          @selected="handleSelected"
        />
      </template>
      <template #detail>
        <EditorSwitcher
          :node="selectedNode"
          @close="handleClose"
        />
      </template>
    </MasterDetail>
  </FrameDashboard>
</template>
<style scoped>
.page-priority {
  height: 100%;
}
</style>