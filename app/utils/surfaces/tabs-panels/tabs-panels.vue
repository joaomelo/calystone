<script setup lang="ts">
import Tab from "primevue/tab";
import TabList from "primevue/tablist";
import TabPanel from "primevue/tabpanel";
import TabPanels from "primevue/tabpanels";
import Tabs from "primevue/tabs";

import type { Panels } from "./panels";

const { panels } = defineProps<{
  panels: Panels;
}>();
</script>
<template>
  <Tabs :value="panels[0][0]">
    <TabList>
      <Tab
        v-for="panel in panels"
        :key="panel[0]"
        :value="panel[0]"
      >
        {{ panel[1] }}
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel
        v-for="panel in panels"
        :key="panel[0]"
        :value="panel[0]"
      >
        <slot :name="panel[0]" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>