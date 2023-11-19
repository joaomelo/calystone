<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import {
  ButtonBase,
  ButtonsPanel,
  FormBase,
  InputBase,
  TextHeading,
  useI18n,
  useTask,
} from "@lib";
import { useBody } from "@body";
import { FrameBase } from "@view/frames";

const router = useRouter();
const { t } = useI18n();
const { gate } = useBody();

const payload = reactive({ email: null, password: null });

const signIn = useTask(async () => {
  await gate.signIn(payload);
  router.push({ name: "page-artifacts-plan" });
});
</script>
<template>
  <frame-base>
    <text-heading class="page-auth-heading">calystone</text-heading>
    <form-base :error="signIn.error">
      <input-base v-model="payload.email" :label="t('page-auth.email')" />
      <input-base
        v-model="payload.password"
        type="password"
        :label="t('page-auth.password')"
      />
      <buttons-panel>
        <button-base
          :busy="signIn.busy"
          :label="t('page-auth.sign-in')"
          @click="signIn.run"
        />
      </buttons-panel>
    </form-base>
  </frame-base>
</template>
<style scoped>
.page-auth-heading {
  margin-bottom: var(--size-20);
}
</style>
