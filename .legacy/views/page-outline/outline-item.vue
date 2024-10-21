<script setup>
import { MenuDivider } from "@/lib";
import { ItemArtifact, MenuAppend, MenuDelete, MenuEdit, MenuFocus, MenuStatus, MenuTags } from "@/view/smart";
</script>

<template>
  <item-artifact>
    <template #actions="artifact">
      <menu-status :artifact="artifact" />
      <menu-divider />
      <menu-focus :artifact="artifact" />
      <menu-append :artifact="artifact" />
      <menu-edit :artifact="artifact" />
      <menu-tags :artifact="artifact" />
      <menu-divider />
      <menu-delete :artifact="artifact" />
    </template>
  </item-artifact>
</template>
