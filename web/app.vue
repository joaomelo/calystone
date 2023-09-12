<script setup>
import { reactive } from "vue";
import { useAuthState, AUTH_STATUSES } from "@lib";
import {
  PageArtifactsPlan,
  PageUnsolved,
  PageAuth,
  PageArtifactEdit,
} from "./pages";

const authState = useAuthState();

const useCase = reactive({ name: "artifactsPlan", context: null });
const updateCase = (name, context = null) => {
  useCase.name = name;
  useCase.context = context;
};
</script>

<template>
  <main>
    <template v-if="authState.status === AUTH_STATUSES.UNSOLVED">
      <page-unsolved />
    </template>
    <template v-if="authState.status === AUTH_STATUSES.SIGNED_OUT">
      <page-auth />
    </template>
    <template v-if="authState.status === AUTH_STATUSES.SIGNED_IN">
      <template v-if="useCase.name === 'artifactsPlan'">
        <page-artifacts-plan @edit="updateCase('artifactEdit', $event)" />
      </template>
      <template v-if="useCase.name === 'artifactEdit'">
        <page-artifact-edit
          :artifact-id="useCase.context"
          @done="updateCase('artifactsPlan')"
        />
      </template>
    </template>
  </main>
</template>

<style scoped>
main {
  max-width: var(--size-90);
  height: 100%;
  margin: auto;
  padding-block: var(--size-20);
  padding-inline: var(--size-20);
  background-color: var(--color-neutral-70);
}
</style>
