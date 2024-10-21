<script setup lang="ts">
import { type Artifact } from "@/domain";
import { type TreeNode } from "@/lib";
import { type MaybeRefOrGetter } from "vue";

const { artifacts } = defineProps<{
  artifacts: MaybeRefOrGetter<TreeNode<Artifact>[]>;
}>();


</script>

<template>
  <div>
    <pre> {{ artifacts }}</pre>
  </div>
</template>
