<script setup>
import { computed } from "vue";
import { ListBase } from "@lib";
import { useDisplay } from "@view/display";

const props = defineProps({
  term: {
    type: String,
    default: null,
  },
});

const display = useDisplay();
const list = computed(() =>
  props.term ? [{ text: props.term, value: props.term }] : []
);

const handleAction = ({ action, item: artifactId }) => {
  switch (action) {
    case "focus":
      return display.pageOutline(artifactId);
    case "edit":
      return display.pageArtifactEdit(artifactId);
  }
};
</script>
<template>
  <list-base :items="list" @action="handleAction" />
</template>
