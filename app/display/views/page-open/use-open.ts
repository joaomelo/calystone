import type { NodesRepository } from "@/domain";

import { defaultActivity } from "@/display/activities";
import { Store } from "@/display/store";
import { useExceptionToast } from "@/display/widgets";
import { Nodes } from "@/domain";
import { Exception } from "@/utils";
import { reactive } from "vue";
import { useRouter } from "vue-router";

type Connect = () => Promise<NodesRepository>;

export function useOpen(connect: Connect) {
  const router = useRouter();
  const state = Store.use();
  const toast = useExceptionToast();
  return async () => {
    try {
      const repository = await connect();
      const nodes = new Nodes(repository);
      state.nodes = reactive(nodes);
      void router.push({ name: defaultActivity });
    } catch (error) {
      const exception = new Exception("UNABLE_OPEN", error);
      toast(exception);
    }
  };
}
