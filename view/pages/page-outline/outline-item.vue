<script setup>
import { MenuDivider } from "@lib";
import { ArtifactItem, MenuAppend, MenuDelete, MenuEdit, MenuFocus, MenuStatus } from "@view/smart";
</script>

<template>
  <artifact-item>
    <template #actions="artifact">
      <menu-status :artifact="artifact" />
      <menu-divider />
      <menu-focus :artifact="artifact" />
      <menu-append :artifact="artifact" />
      <menu-edit :artifact="artifact" />
      <menu-divider />
      <menu-delete :artifact="artifact" />
    </template>
  </artifact-item>
</template>
