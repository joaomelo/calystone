<script setup lang="ts">

import { Store } from "@/display/store";
import { MsalAuthService } from "@/infra";
import { throwCritical } from "@/utils";

import OpenBase from "./open-base.vue";
import { useOpen } from "./use-open";

const { configuration } = Store.use();

const handleOpen = useOpen(async () => {
  const clientId = configuration.get("msalClientId");
  const redirectUri = configuration.get("authRedirectUri");
  if (typeof clientId !== "string") {
    throwCritical("NO_MSAL_CLIENT_ID", "msal client id is not configured");
  }
  if (typeof redirectUri !== "string") {
    throwCritical("NO_REDIRECT_URI", "auth redirect uri is not configured");
  }

  const authService = new MsalAuthService(clientId, redirectUri);
  const accessToken = await authService.signIn();
  console.log("accessToken", accessToken);
  // const repository = new OneDriveNodesRepository(accessToken);
  // state.nodes.connect(repository);
  throw new Error("open from one drive not implemented");
});
</script>
<template>
  <OpenBase
    label="open.one-drive"
    data-test="open-one-drive"
    icon="bx bx-cloud"
    @open="handleOpen"
  />
</template>
