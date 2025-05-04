<script setup lang="ts">
import { kebabCase } from "@/utils/text";
import Accordion from "primevue/accordion";
import AccordionContent from "primevue/accordioncontent";
import AccordionHeader from "primevue/accordionheader";
import AccordionPanel from "primevue/accordionpanel";

import type { PanelsList } from "../panels-list";

const { multiple = false, panels } = defineProps<{
  multiple?: boolean;
  panels: PanelsList;
}>();
</script>
<template>
  <Accordion
    :multiple="multiple"
    :value="multiple ? [panels[0][0]] : panels[0][0]"
  >
    <AccordionPanel
      v-for="panel in panels"
      :key="panel[0]"
      :value="panel[0]"
      :data-test="kebabCase('accordion-panels-panel', panel[0])"
    >
      <AccordionHeader>{{ panel[1] }}</AccordionHeader>
      <AccordionContent>
        <slot :name="panel[0]" />
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
