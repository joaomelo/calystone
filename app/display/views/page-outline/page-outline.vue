<script setup lang="ts">
import { type Artifact } from "@/domain";
import { type Id, type Tree, TreeBase } from "@/lib";
import { type ComputedRef } from "vue";

const { artifacts } = defineProps<{
  artifacts: ComputedRef<Tree<Id, Artifact>>;
}>();
</script>

<template>
  <TreeBase
    :tree="artifacts"
  />
</template>
