<script setup>
import { onMounted, ref, inject } from "vue";
import { PageBase } from "../../lib";
import { readMeasurement } from "../../services";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { i18n } = inject("store");

const measurement = ref({});
onMounted(async () => {
  measurement.value = await readMeasurement(props.id);
});
</script>
<template>
  <page-base>
    <p>{{ i18n.d(measurement.created) }}</p>
    <pre>{{ measurement }}</pre>
  </page-base>
</template>
