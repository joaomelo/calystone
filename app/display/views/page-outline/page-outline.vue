<script setup lang="ts">
import { TreeArtifacts } from "@/display/widgets";
import { type Artifact } from "@/domain";
import { type Tree } from "@/utils";
import { type MaybeRefOrGetter } from "vue";

const { artifacts } = defineProps<{
  artifacts: MaybeRefOrGetter<Tree<Artifact>>;
}>();
</script>

<template>
  <TreeArtifacts
    :artifacts="artifacts"
  />
</template>
