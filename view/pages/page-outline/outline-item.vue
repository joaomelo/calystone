<script setup>
import { ArtifactItem, MenuAppend, MenuDelete, MenuEdit, MenuFocus, MenuStatus } from "@view/smart";
import { MenuDivider } from "@lib";
</script>

<template>
  <artifact-item>
    <template #actions="artifact">
      <menu-status :artifact="artifact" />
      <menu-divider />
      <menu-focus :artifact="artifact" />
      <menu-divider />
      <menu-append :artifact="artifact" />
      <menu-edit :artifact="artifact" />
      <menu-delete :artifact="artifact" />
    </template>
  </artifact-item>
</template>
