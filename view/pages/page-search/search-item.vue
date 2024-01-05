<script setup>
import { ArtifactItem, MenuEdit, MenuFocus } from "@view/smart";
</script>

<template>
  <artifact-item>
    <template #actions="artifact">
      <menu-focus :artifact="artifact" />
      <menu-edit :artifact="artifact" />
    </template>
  </artifact-item>
</template>
