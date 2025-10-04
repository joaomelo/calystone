<script setup lang="ts">
import Tab from "primevue/tab";
import TabList from "primevue/tablist";
import TabPanel from "primevue/tabpanel";
import TabPanels from "primevue/tabpanels";
import Tabs from "primevue/tabs";

import { kebabCase } from "@/utils/text";

import type { PanelsList } from "../panels-list";

const { panels } = defineProps<{ panels: PanelsList; }>();
</script>
<template>
  <Tabs
    class="tabs-panels"
    :value="panels[0][0]"
  >
    <TabList>
      <Tab
        v-for="panel in panels"
        :key="panel[0]"
        :data-test="kebabCase('tabs-panels-tab', panel[0])"
        :value="panel[0]"
      >
        {{ panel[1] }}
      </Tab>
    </TabList>
    <TabPanels class="tabs-panels__panels">
      <TabPanel
        v-for="panel in panels"
        :key="panel[0]"
        class="tabs-panels__panel"
        :data-test="kebabCase('tabs-panels-panel', panel[0])"
        :value="panel[0]"
      >
        <slot :name="panel[0]" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
