import type { NodesRepository } from "@/domain";

import { defaultActivity } from "@/display/activities";
import { Store } from "@/display/store";
import { useExceptionToast } from "@/display/widgets";
import { Exception } from "@/utils";
import { useRouter } from "vue-router";

type Connect = () => Promise<NodesRepository>;

export function useOpen(connect: Connect) {
  const router = useRouter();
  const store = Store.use();
  const toast = useExceptionToast();
  return async () => {
    try {
      const repository = await connect();
      store.nodes.connect(repository);
      void router.push({ name: defaultActivity });
    } catch (error) {
      const exception = new Exception("UNABLE_OPEN", error);
      toast(exception);
    }
  };
}
