<script setup>
import { ItemArtifact, MenuEdit, MenuFocus } from "@/view/smart";
</script>

<template>
  <item-artifact>
    <template #actions="artifact">
      <menu-focus :artifact="artifact" />
      <menu-edit :artifact="artifact" />
    </template>
  </item-artifact>
</template>
