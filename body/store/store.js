import { reactive } from "vue";
import { createUser } from "../user";
import { createArtifact } from "../artifact";

export function createStore(service) {
  const store = reactive({ users: [], artifacts: [], invites: [] });

  service.select(
    ["invites", "artifacts", "users"],
    ([invitesData, artifactsData, usersData]) => {
      if (!invitesData || !artifactsData || !usersData)
        return resetStore(store);

      store.users = usersData.map(createUser);
      store.artifacts = artifactsData.map((artifactData) =>
        createArtifact({ artifactData, allUsers: store.users })
      );
    }
  );

  return store;
}

function resetStore(store) {
  store.users = [];
  store.artifacts = [];
  store.invites = [];
}
